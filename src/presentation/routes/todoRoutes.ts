import { Router, Application } from 'express';
import { TodoController } from '@presentation/controllers/TodoController';

import { TodoRepository } from '@infrastructure/repositories/TodoRepository';
import { Todo } from '@domain/entities/Todo';
import { createTodo } from '@application/use-cases/createTodo';
import { getTodos } from '@application/use-cases/getTodos';
import { deleteTodo } from '@application/use-cases/deleteTodo';
import { getTodoById } from '@application/use-cases/getTodoById';
import { updateTodo } from '@application/use-cases/updateTodo';

const router = Router();
const todoRepository = new TodoRepository(); // No need to pass a database client when using Mongoose

const todoController = new TodoController(
    (todo: { title: string }): Promise<Todo> => createTodo(todo, todoRepository),
    (): Promise<Todo[]> => getTodos(todoRepository),
    (id: string): Promise<void> => deleteTodo(id, todoRepository),
    (id: string): Promise<Todo | null> => getTodoById(id, todoRepository), // New method
    (id: string, todo: Partial<Todo>): Promise<Todo | null> => updateTodo(id, todo, todoRepository) // New method
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

export default function setTodoRoutes(app: Application): void { // Explicitly type 'app'
    app.use('/api', router);
}