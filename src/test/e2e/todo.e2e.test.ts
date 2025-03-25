import request from 'supertest';
import app from '../../app'; // Import the Express app
import { TodoModel } from '@infrastructure/model/TodoModel';
import { UserModel } from '@infrastructure/model/UserModel';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

describe('Todo Endpoints (E2E)', () => {
    let token: string;

    beforeAll(async () => {
        // Clear the database and create a test user
        await UserModel.deleteMany({});
        await TodoModel.deleteMany({});

        const user = await UserModel.create({ username: 'testuser', password: 'password123' });

        // Generate a JWT token for the test user
        token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    });

    afterAll(async () => {
        // Clean up the database after all tests
        await UserModel.deleteMany({});
        await TodoModel.deleteMany({});
    });

    beforeEach(async () => {
        await TodoModel.deleteMany({});
    });

    it('should create a new todo', async () => {
        const response = await request(app)
            .post('/api/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Sample Todo' })
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Sample Todo');
    });

    it('should get all todos', async () => {
        // Seed the database with test todos
        const todo1 = await TodoModel.create({ title: 'Todo 1' });
        const todo2 = await TodoModel.create({ title: 'Todo 2' });

        const response = await request(app)
            .get('/api/todos')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveLength(2);
        expect(response.body[0]).toHaveProperty('id', todo1._id.toString());
        expect(response.body[0].title).toBe('Todo 1');
        expect(response.body[1]).toHaveProperty('id', todo2._id.toString());
        expect(response.body[1].title).toBe('Todo 2');
    });

    it('should get a todo by ID', async () => {
        const todo = await TodoModel.create({ title: 'Sample Todo' });

        const response = await request(app)
            .get(`/api/todos/${todo._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('id', todo._id.toString());
        expect(response.body.title).toBe('Sample Todo');
    });

    it('should update a todo', async () => {
        const todo = await TodoModel.create({ title: 'Old Title' });

        const response = await request(app)
            .put(`/api/todos/${todo._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Updated Title' })
            .expect(200);

        expect(response.body).toHaveProperty('id', todo._id.toString());
        expect(response.body.title).toBe('Updated Title');
    });

    it('should delete a todo', async () => {
        const todo = await TodoModel.create({ title: 'Sample Todo' });

        await request(app)
            .delete(`/api/todos/${todo._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204);

        const deletedTodo = await TodoModel.findById(todo._id);
        expect(deletedTodo).toBeNull();
    });

    it('should return 401 for unauthorized access', async () => {
        await request(app)
            .get('/api/todos')
            .expect(401);
    });

    it('should return 404 for a non-existent todo', async () => {
        const nonExistentId = '67e1f12f40c84d748819a64b';
        await request(app)
            .get(`/api/todos/${nonExistentId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
    });
});