"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoClient = exports.connectToMongo = void 0;
const mongodb_1 = require("mongodb");
const uri = 'your_mongodb_connection_string_here';
const client = new mongodb_1.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connectToMongo = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};
exports.connectToMongo = connectToMongo;
const getMongoClient = () => {
    return client;
};
exports.getMongoClient = getMongoClient;
