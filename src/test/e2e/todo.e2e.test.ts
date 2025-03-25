import request from 'supertest';
import app from '../../app';
// Import the Express app
import { TodoModel } from '@infrastructure/model/TodoModel';

describe('Todo Endpoints (E2E)', () => {
    beforeEach(async () => {
        // Clear the database before each test
        await TodoModel.deleteMany({});
    });

    it('should create a new todo', async () => {
        const response = await request(app)
            .post('/api/todos')
            .send({ title: 'Sample Todo' })
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Sample Todo');
    });

    it('should get all todos', async () => {
        // Seed the database
        await TodoModel.create({ title: 'Todo 1' });
        await TodoModel.create({ title: 'Todo 2' });

        const response = await request(app).get('/api/todos').expect(200);

        expect(response.body).toHaveLength(2);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0].title).toBe('Todo 1');
    });

    it('should get a todo by ID', async () => {
        const todo = await TodoModel.create({ title: 'Sample Todo' });

        const response = await request(app).get(`/api/todos/${todo._id}`).expect(200);

        expect(response.body).toHaveProperty('id', todo._id.toString());
        expect(response.body.title).toBe('Sample Todo');
    });

    it('should update a todo', async () => {
        const todo = await TodoModel.create({ title: 'Old Title' });

        const response = await request(app)
            .put(`/api/todos/${todo._id}`)
            .send({ title: 'Updated Title' })
            .expect(200);

        expect(response.body).toHaveProperty('id', todo._id.toString());
        expect(response.body.title).toBe('Updated Title');
    });

    it('should delete a todo', async () => {
        const todo = await TodoModel.create({ title: 'Sample Todo' });

        await request(app).delete(`/api/todos/${todo._id}`).expect(204);

        const deletedTodo = await TodoModel.findById(todo._id);
        expect(deletedTodo).toBeNull();
    });

    it('should return 404 for a non-existent todo', async () => {
        const nonExistentId = '67e1f12f40c84d748819a64b';
        await request(app).get(`/api/todos/${nonExistentId}`).expect(404);
    });
});