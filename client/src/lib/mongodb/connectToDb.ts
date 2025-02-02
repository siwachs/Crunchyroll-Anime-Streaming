import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) throw new Error("MONGODB_URI is not configured!");

let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
  _mongoDbInstance?: Db;
};

let client: MongoClient;
let db: Db;

if (globalWithMongo._mongoClientPromise) {
  client = await globalWithMongo._mongoClientPromise;
  db = globalWithMongo._mongoDbInstance!;
} else {
  client = new MongoClient(MONGODB_URI);
  const clientPromise = client.connect();
  db = (await clientPromise).db();

  globalWithMongo._mongoClientPromise = clientPromise;
  globalWithMongo._mongoDbInstance = db;
}

export default async function connectToDb(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  return { client, db };
}
