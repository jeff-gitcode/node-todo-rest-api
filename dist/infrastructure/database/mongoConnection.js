"use strict";
// import { MongoClient } from 'mongodb';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoClient = exports.connectToMongo = void 0;
// const uri = 'your_mongodb_connection_string_here';
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// export const connectToMongo = async () => {
//     try {
//         await client.connect();
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error('MongoDB connection error:', error);
//         throw error;
//     }
// };
// export const getMongoClient = () => {
//     return client;
// };
const mongoose_1 = __importDefault(require("mongoose"));
const uri = process.env.MONGODB_URI || 'your_mongodb_connection_string_here';
const connectToMongo = async () => {
    try {
        console.log('Connecting to MongoDB using Mongoose', uri);
        await mongoose_1.default.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB using Mongoose');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};
exports.connectToMongo = connectToMongo;
const getMongoClient = () => {
    return mongoose_1.default.connection;
};
exports.getMongoClient = getMongoClient;
