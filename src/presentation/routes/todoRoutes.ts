import { Router } from 'express';
import { Application } from 'express'; // Import the type for Express.Application
import { TodoController } from '@presentation/controllers/TodoController';

import { TodoRepository } from '@infrastructure/repositories/TodoRepository';
import { getMongoClient } from '@infrastructure/database/mongoConnection';
import { Todo } from '@domain/entities/Todo';
import { createTodo } from '@application/use-cases/createTodo';
import { getTodos } from '@application/use-cases/getTodos';
import { deleteTodo } from '@application/use-cases/deleteTodo';

const router = Router();
const todoRepository = new TodoRepository(getMongoClient().db('todoDB'));

const todoController = new TodoController(
    (todo: { title: string }): Promise<Todo> => createTodo(todo, todoRepository),
    (): Promise<Todo[]> => getTodos(todoRepository),
    (id: string): Promise<void> => deleteTodo(id, todoRepository)
);

router.post('/todos', todoController.create.bind(todoController));
router.get('/todos', todoController.getAll.bind(todoController));
router.delete('/todos/:id', todoController.remove.bind(todoController));

export default function setTodoRoutes(app: Application): void { // Explicitly type 'app'
    app.use('/api', router);
}