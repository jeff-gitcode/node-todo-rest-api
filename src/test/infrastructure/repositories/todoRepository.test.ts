// import mockingoose from 'mockingoose';
// import { TodoRepository } from '@infrastructure/repositories/TodoRepository';
// import { Todo } from '@domain/entities/Todo';
// import * as MockTodoModel from './MockTodoModel';
// describe('TodoRepository', () => {
//     let repository: TodoRepository;

//     beforeEach(() => {
//         repository = new TodoRepository();
//     });

//     it('should create a new todo', async () => {
//         // Arrange
//         const mockTodo = { _id: '123', title: 'New Todo' };
//         mockingoose(MockTodoModel).toReturn(mockTodo, 'save');

//         // Act
//         const result = await repository.create(new Todo(new Date().toISOString(), 'New Todo'));

//         // Assert
//         expect(result).not.toBeNull();
//         expect(result.id).toBe('123');
//         expect(result.title).toBe('New Todo');
//     });

//     it('should find all todos', async () => {
//         // Arrange
//         const mockTodos = [
//             { _id: '123', title: 'Test Todo 1' },
//             { _id: '456', title: 'Test Todo 2' },
//         ];
//         mockingoose(TodoModel).toReturn(mockTodos, 'find');

//         // Act
//         const result = await repository.findAll();

//         // Assert
//         expect(result).toHaveLength(2);
//         expect(result[0].id).toBe('123');
//         expect(result[0].title).toBe('Test Todo 1');
//     });

//     it('should find a todo by ID', async () => {
//         // Arrange
//         const mockTodo = { _id: '123', title: 'Test Todo' };
//         mockingoose(TodoModel).toReturn(mockTodo, 'findOne');

//         // Act
//         const result = await repository.findById('123');

//         // Assert
//         expect(result).not.toBeNull();
//         expect(result?.id).toBe('123');
//         expect(result?.title).toBe('Test Todo');
//     });

//     it('should update a todo', async () => {
//         // Arrange
//         const mockUpdatedTodo = { _id: '123', title: 'Updated Todo' };
//         mockingoose(TodoModel).toReturn(mockUpdatedTodo, 'findOneAndUpdate');

//         // Act
//         const result = await repository.update('123', { title: 'Updated Todo' });

//         // Assert
//         expect(result).not.toBeNull();
//         expect(result?.id).toBe('123');
//         expect(result?.title).toBe('Updated Todo');
//     });

//     it('should delete a todo', async () => {
//         // Arrange
//         mockingoose(TodoModel).toReturn(null, 'findOneAndDelete');

//         // Act
//         await repository.delete('123');

//         // Assert
//         // No specific assertions needed for void methods, but ensure no errors are thrown
//     });
// });