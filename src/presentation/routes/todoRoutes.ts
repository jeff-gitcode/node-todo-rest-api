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
 */
router.get('/todos', authenticateJWT, todoController.getAll.bind(todoController)); // Secure this route

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a Todo by ID
 */
router.get('/todos/:id', authenticateJWT, todoController.getById.bind(todoController)); // Secure this route

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a Todo
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
 */
router.delete('/todos/:id', authenticateJWT, todoController.remove.bind(todoController)); // Secure this route

export default function setTodoRoutes(app: Application): void { // Explicitly type 'app'
    app.use('/api', router);
}