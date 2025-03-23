"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodos = void 0;
const getTodos = async (todoRepository) => {
    try {
        const todos = await todoRepository.findAll();
        return todos;
    }
    catch (error) {
        throw new Error('Error retrieving todos: ' + error.message);
    }
};
exports.getTodos = getTodos;
