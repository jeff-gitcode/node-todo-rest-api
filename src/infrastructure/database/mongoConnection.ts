import { MongoClient } from 'mongodb';

const uri = 'your_mongodb_connection_string_here';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export const connectToMongo = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

export const getMongoClient = () => {
    return client;
};