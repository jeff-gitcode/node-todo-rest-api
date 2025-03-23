"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
class TodoController {
    constructor(createTodo, getTodos, deleteTodo) {
        this.createTodo = createTodo;
        this.getTodos = getTodos;
        this.deleteTodo = deleteTodo;
    }
    async create(req, res) {
        try {
            const todo = await this.createTodo(req.body);
            res.status(201).json(todo);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getAll(req, res) {
        try {
            const todos = await this.getTodos();
            res.status(200).json(todos);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async remove(req, res) {
        try {
            await this.deleteTodo(req.params.id);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.TodoController = TodoController;
