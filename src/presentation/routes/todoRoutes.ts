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

router.post('/todos', todoController.create.bind(todoController));
router.get('/todos', todoController.getAll.bind(todoController));
router.get('/todos/:id', todoController.getById.bind(todoController)); // New route
router.put('/todos/:id', todoController.update.bind(todoController)); // New route
router.delete('/todos/:id', todoController.remove.bind(todoController));

export default function setTodoRoutes(app: Application): void { // Explicitly type 'app'
    app.use('/api', router);
}