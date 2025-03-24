"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setTodoRoutes;
const express_1 = require("express");
const TodoController_1 = require("@presentation/controllers/TodoController");
const TodoRepository_1 = require("@infrastructure/repositories/TodoRepository");
const createTodo_1 = require("@application/use-cases/createTodo");
const getTodos_1 = require("@application/use-cases/getTodos");
const deleteTodo_1 = require("@application/use-cases/deleteTodo");
const router = (0, express_1.Router)();
const todoRepository = new TodoRepository_1.TodoRepository(); // No need to pass a database client when using Mongoose
const todoController = new TodoController_1.TodoController((todo) => (0, createTodo_1.createTodo)(todo, todoRepository), () => (0, getTodos_1.getTodos)(todoRepository), (id) => (0, deleteTodo_1.deleteTodo)(id, todoRepository));
router.post('/todos', todoController.create.bind(todoController));
router.get('/todos', todoController.getAll.bind(todoController));
router.delete('/todos/:id', todoController.remove.bind(todoController));
function setTodoRoutes(app) {
    app.use('/api', router);
}
