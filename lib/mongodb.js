import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
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

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise.catch(e => {
  console.error('MongoDB connection error:', e);
  throw e;
});

// Helper function to get the database connection
export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db();
  return { client, db };
} 