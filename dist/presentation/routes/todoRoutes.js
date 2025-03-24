"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setTodoRoutes;
const express_1 = require("express");
const TodoController_1 = require("@presentation/controllers/TodoController");
const TodoRepository_1 = require("@infrastructure/repositories/TodoRepository");
const createTodo_1 = require("@application/use-cases/createTodo");
const getTodos_1 = require("@application/use-cases/getTodos");
const deleteTodo_1 = require("@application/use-cases/deleteTodo");
const getTodoById_1 = require("@application/use-cases/getTodoById");
const updateTodo_1 = require("@application/use-cases/updateTodo");
const router = (0, express_1.Router)();
const todoRepository = new TodoRepository_1.TodoRepository(); // No need to pass a database client when using Mongoose
const todoController = new TodoController_1.TodoController((todo) => (0, createTodo_1.createTodo)(todo, todoRepository), () => (0, getTodos_1.getTodos)(todoRepository), (id) => (0, deleteTodo_1.deleteTodo)(id, todoRepository), (id) => (0, getTodoById_1.getTodoById)(id, todoRepository), // New method
(id, todo) => (0, updateTodo_1.updateTodo)(id, todo, todoRepository) // New method
);
/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new Todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Sample Todo
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/todos', todoController.create.bind(todoController));
/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all Todos
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get('/todos', todoController.getAll.bind(todoController));
/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a Todo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Todo
 *     responses:
 *       200:
 *         description: Todo retrieved successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */
router.get('/todos/:id', todoController.getById.bind(todoController));
/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a Todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Todo Title
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */
router.put('/todos/:id', todoController.update.bind(todoController));
/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a Todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Todo
 *     responses:
 *       204:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */
router.delete('/todos/:id', todoController.remove.bind(todoController));
function setTodoRoutes(app) {
    app.use('/api', router);
}
