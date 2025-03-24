"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoConnection_1 = require("./infrastructure/database/mongoConnection");
const todoRoutes_1 = __importDefault(require("@presentation/routes/todoRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
const startServer = async () => {
    try {
        await (0, mongoConnection_1.connectToMongo)();
        console.log('Connected to MongoDB');
        (0, todoRoutes_1.default)(app);
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error('MongoDB connection error:', err);
    }
};
startServer();
