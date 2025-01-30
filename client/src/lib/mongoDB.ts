import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) throw new Error("MONGODB_URI is not configured!");

const client = new MongoClient(MONGODB_URI);

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDb(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) return { client: cachedClient, db: cachedDb };

  await client.connect();
  cachedClient = client;
  cachedDb = client.db();

  return { client: cachedClient, db: cachedDb };
}
