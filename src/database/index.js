import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

let cachedDb = null;

// A function for connecting to MongoDB,
// taking a single parameter of the connection string
export async function connectToDatabase(uri = process.env.MONGODB_URI) {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb;
  }

  try {
    // If no connection is cached, create a new one
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
    return;
  }

  // Select the database through the connection,
  // using the database path of the connection string
  const db = mongoose.connection;

  // Cache the database connection and return the connection
  cachedDb = db;
  return db;
}
