import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/strikeden';
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  console.warn('No MONGODB_URI found in .env file, using default local connection');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Helper function to get the database connection
export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db();
  return { client, db };
}

export default clientPromise; 