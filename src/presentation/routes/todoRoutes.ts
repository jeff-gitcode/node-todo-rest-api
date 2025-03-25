import { Router, Application } from 'express';
import { TodoController } from '@presentation/controllers/TodoController';

import { TodoRepository } from '@infrastructure/repositories/TodoRepository';
import { Todo } from '@domain/entities/Todo';
import { createTodo } from '@application/use-cases/todo/createTodo';
import { getTodos } from '@application/use-cases/todo/getTodos';
import { deleteTodo } from '@application/use-cases/todo/deleteTodo';
import { getTodoById } from '@application/use-cases/todo/getTodoById';
import { updateTodo } from '@application/use-cases/todo/updateTodo';
import { createTodoSchema, updateTodoSchema } from '@presentation/middleware/todoValidation';
import { validateRequest } from '@presentation/middleware/validationMiddleware';
import { authenticateJWT } from '@presentation/middleware/authMiddleware'; // Import the JWT middleware

const router = Router();
const todoRepository = new TodoRepository();

const todoController = new TodoController(
    (todo: { title: string }): Promise<Todo> => createTodo(todo, todoRepository),
    (): Promise<Todo[]> => getTodos(todoRepository),
    (id: string): Promise<void> => deleteTodo(id, todoRepository),
    (id: string): Promise<Todo | null> => getTodoById(id, todoRepository),
    (id: string, todo: Partial<Todo>): Promise<Todo | null> => updateTodo(id, todo, todoRepository)
);

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new Todo
 *     tags:
 *       - Todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Sample Todo"
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "unique-id"
 *                 title:
 *                   type: string
 *                   example: "Sample Todo"
 *       400:
 *         description: Bad request
 */
router.post(
    '/todos',
    authenticateJWT, // Secure this route
    validateRequest(createTodoSchema),
    todoController.create.bind(todoController)
);

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all Todos
 *     tags:
 *       - Todo
 *     responses:
 *       200:
 *         description: List of all Todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "unique-id"
 *                   title:
 *                     type: string
 *                     example: "Sample Todo"
 *       401:
 *         description: Unauthorized
 */
router.get('/todos', authenticateJWT, todoController.getAll.bind(todoController));

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a Todo by ID
 *     tags:
 *       - Todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Todo to retrieve
 *     responses:
 *       200:
 *         description: Todo retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "unique-id"
 *                 title:
 *                   type: string
 *                   example: "Sample Todo"
 *       404:
 *         description: Todo not found
 *       401:
 *         description: Unauthorized
 */
router.get('/todos/:id', authenticateJWT, todoController.getById.bind(todoController));

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a Todo
 *     tags:
 *       - Todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Todo to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Todo Title"
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "unique-id"
 *                 title:
 *                   type: string
 *                   example: "Updated Todo Title"
 *       404:
 *         description: Todo not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put(
    '/todos/:id',
    authenticateJWT, // Secure this route
    validateRequest(updateTodoSchema),
    todoController.update.bind(todoController)
);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a Todo
 *     tags:
 *       - Todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Todo to delete
 *     responses:
 *       204:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/todos/:id', authenticateJWT, todoController.remove.bind(todoController));

export default function setTodoRoutes(app: Application): void {
    app.use('/api', router);
}