import { createTodo } from '@application/use-cases/todo/createTodo';
import { getTodos } from '@application/use-cases/todo/getTodos';
import { getTodoById } from '@application/use-cases/todo/getTodoById';
import { updateTodo } from '@application/use-cases/todo/updateTodo';
import { deleteTodo } from '@application/use-cases/todo/deleteTodo';
import { TodoRepository } from '@infrastructure/repositories/TodoRepository';
import { Todo } from '@domain/entities/Todo';

jest.mock('@infrastructure/repositories/TodoRepository');

describe('Todo Use Cases', () => {
    let todoRepository: jest.Mocked<TodoRepository>;

    beforeEach(() => {
        todoRepository = new TodoRepository() as jest.Mocked<TodoRepository>;
    });

    it('should create a new todo', async () => {
        // Arrange
        const todoData = { title: 'New Todo' };
        const mockTodo = new Todo('123', 'New Todo');
        todoRepository.create.mockResolvedValue(mockTodo);

        // Act
        const result = await createTodo(todoData, todoRepository);

        // Assert
        expect(result).toEqual(mockTodo);
        expect(todoRepository.create).toHaveBeenCalledWith(expect.objectContaining({ title: 'New Todo' }));
    });

    it('should get all todos', async () => {
        // Arrange
        const mockTodos = [
            new Todo('123', 'Test Todo 1'),
            new Todo('456', 'Test Todo 2'),
        ];
        todoRepository.findAll.mockResolvedValue(mockTodos);

        // Act
        const result = await getTodos(todoRepository);

        // Assert
        expect(result).toEqual(mockTodos);
        expect(todoRepository.findAll).toHaveBeenCalled();
    });

    it('should get a todo by ID', async () => {
        // Arrange
        const mockTodo = new Todo('123', 'Test Todo');
        todoRepository.findById.mockResolvedValue(mockTodo);

        // Act
        const result = await getTodoById('123', todoRepository);

        // Assert
        expect(result).toEqual(mockTodo);
        expect(todoRepository.findById).toHaveBeenCalledWith('123');
    });

    it('should update a todo', async () => {
        // Arrange
        const mockUpdatedTodo = new Todo('123', 'Updated Todo');
        todoRepository.update.mockResolvedValue(mockUpdatedTodo);

        // Act
        const result = await updateTodo('123', { title: 'Updated Todo' }, todoRepository);

        // Assert
        expect(result).toEqual(mockUpdatedTodo);
        expect(todoRepository.update).toHaveBeenCalledWith('123', { title: 'Updated Todo' });
    });

    it('should delete a todo', async () => {
        // Arrange
        todoRepository.delete.mockResolvedValue();

        // Act
        await deleteTodo('123', todoRepository);

        // Assert
        expect(todoRepository.delete).toHaveBeenCalledWith('123');
    });
});