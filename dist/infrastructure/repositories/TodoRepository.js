"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRepository = void 0;
const mongodb_1 = require("mongodb");
class TodoRepository {
    constructor(db) {
        this.db = db;
    }
    async create(todo) {
        const result = await this.db.collection('todos').insertOne(todo);
        return { ...todo, id: result.insertedId.toString() };
    }
    async findAll() {
        return await this.db.collection('todos').find({}).toArray();
    }
    async delete(id) {
        await this.db.collection('todos').deleteOne({ _id: new mongodb_1.ObjectId(id) });
    }
}
exports.TodoRepository = TodoRepository;
