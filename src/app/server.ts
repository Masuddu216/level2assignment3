import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

let server: Server;

// Use environment variables
const PORT = process.env.PORT || 5000;
const DATABASE_URI = process.env.DATABASE_URI as string;

async function main() {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log('✅ Connected to MongoDB using Mongoose!');

    server = app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
  }
}

main();