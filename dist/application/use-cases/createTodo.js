"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodo = void 0;
const Todo_1 = require("@domain/entities/Todo");
const createTodo = async (todoData, todoRepository) => {
    if (!todoData.title) {
        throw new Error("Todo title is required");
    }
    const newTodo = new Todo_1.Todo(new Date().toISOString(), // Generate a unique ID (you can replace this with a better ID generator)
    todoData.title);
    return await todoRepository.create(newTodo);
};
exports.createTodo = createTodo;
