import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) throw new Error("MONGODB_URI is not configured!");

let globalMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
  _mongoDbInstance?: Db;
};

const MAX_RETRIES = 5;

export default async function connectToDb(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  if (globalMongo._mongoClientPromise && globalMongo._mongoDbInstance)
    return {
      client: await globalMongo._mongoClientPromise,
      db: globalMongo._mongoDbInstance,
    };

  let attempts = 0;
  let delay = 1000;

  while (attempts < MAX_RETRIES) {
    try {
      const client = new MongoClient(MONGODB_URI);
      const clientPromise = client.connect();
      const db = (await clientPromise).db();

      globalMongo._mongoClientPromise = clientPromise;
      globalMongo._mongoDbInstance = db;

      return { client, db };
    } catch (error) {
      attempts++;
      console.error(`MongoDB connection failed. Retrying in ${delay}ms...`);

      if (attempts >= MAX_RETRIES) throw error;

      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
    }
  }

  throw new Error("MongoDB connection failed after multiple attempts.");
}
