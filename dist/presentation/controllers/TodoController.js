"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
class TodoController {
    constructor(createTodo, getTodos, deleteTodo, getTodoById, // New method
    updateTodo // New method
    ) {
        this.createTodo = createTodo;
        this.getTodos = getTodos;
        this.deleteTodo = deleteTodo;
        this.getTodoById = getTodoById;
        this.updateTodo = updateTodo;
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
    async getById(req, res) {
        try {
            const todo = await this.getTodoById(req.params.id);
            if (!todo) {
                return res.status(404).json({ message: "Todo not found" });
            }
            res.status(200).json(todo);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async update(req, res) {
        try {
            const todo = await this.updateTodo(req.params.id, req.body);
            if (!todo) {
                return res.status(404).json({ message: "Todo not found" });
            }
            res.status(200).json(todo);
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
