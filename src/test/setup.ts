import { connectToMongo, disconnectFromMongo } from '@infrastructure/database/mongoConnection';
import mongoose from 'mongoose';

beforeAll(async () => {
    process.env.NODE_ENV = 'test'; // Ensure the environment is set to 'test'
    await connectToMongo();
});

afterAll(async () => {
    await disconnectFromMongo();
    await mongoose.connection.close();
});