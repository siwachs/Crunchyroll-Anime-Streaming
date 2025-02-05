import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) throw new Error("MONGODB_URI is not configured!");

let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
  _mongoDbInstance?: Db;
};

let client: MongoClient;
let db: Db;

const MAX_RETRIES = 5;

export default async function connectToDb(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  if (globalWithMongo._mongoClientPromise) {
    client = await globalWithMongo._mongoClientPromise;
    db = globalWithMongo._mongoDbInstance!;
  } else {
    let attempts = 0;
    let delay = 1000;

    while (attempts < MAX_RETRIES) {
      try {
        client = new MongoClient(MONGODB_URI);
        const clientPromise = client.connect();
        db = (await clientPromise).db();

        globalWithMongo._mongoClientPromise = clientPromise;
        globalWithMongo._mongoDbInstance = db;
      } catch (error) {
        attempts++;
        console.log(
          `Failed to connect to the database. Retrying in ${delay}ms.`,
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;

        if (attempts >= MAX_RETRIES) throw error;
      }
    }
  }

  return { client, db };
}
