// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'LocalEats';

if (!uri) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the connection
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      retryWrites: true,
      w: 'majority',
      maxPoolSize: 10,
      minPoolSize: 1,
      connectTimeoutMS: 10000,
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new connection
  client = new MongoClient(uri, {
    retryWrites: true,
    w: 'majority',
    maxPoolSize: 10,
    minPoolSize: 1,
    connectTimeoutMS: 10000,
  });
  clientPromise = client.connect();
}

export async function getDB() {
  const client = await clientPromise;
  return client.db(dbName);
}