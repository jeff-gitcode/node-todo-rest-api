// use in-memory MongoDB for testing

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer | null = null;

export const connectToMongo = async (): Promise<void> => {
    const isTestEnvironment = process.env.NODE_ENV === 'test';

    try {
        if (isTestEnvironment) {
            // Use in-memory MongoDB for testing
            mongoServer = await MongoMemoryServer.create();
            const uri = mongoServer.getUri();
            console.log('Connecting to in-memory MongoDB:', uri);
            await mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false, // Add this option
            });
            console.log('Connected to in-memory MongoDB');
        } else {
            // Use real MongoDB for non-test environments
            const uri = process.env.MONGODB_URI || 'your_mongodb_connection_string_here';
            console.log('Connecting to MongoDB:', uri);
            await mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false, // Add this option
            });
        }
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

export const disconnectFromMongo = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
        if (mongoServer) {
            await mongoServer.stop();
            console.log('In-memory MongoDB stopped');
        }
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
        throw error;
    }
};