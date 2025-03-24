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
    validateRequest(createTodoSchema),
    todoController.create.bind(todoController)
);

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all Todos
 */
router.get('/todos', todoController.getAll.bind(todoController));

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a Todo by ID
 */
router.get('/todos/:id', todoController.getById.bind(todoController));

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a Todo
 */
router.put(
    '/todos/:id',
    validateRequest(updateTodoSchema),
    todoController.update.bind(todoController)
);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a Todo
 */
router.delete('/todos/:id', todoController.remove.bind(todoController));

export default function setTodoRoutes(app: Application): void { // Explicitly type 'app'
    app.use('/api', router);
}