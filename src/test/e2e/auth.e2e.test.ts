import request from 'supertest';
import app from '../../app';
// Import the Express app
import { UserModel } from '@infrastructure/model/UserModel';

describe('Auth Endpoints (E2E)', () => {
    beforeEach(async () => {
        // Clear the database before each test
        await UserModel.deleteMany({});
    });

    it('should sign up a new user', async () => {
        const response = await request(app)
            .post('/api/auth/signup')
            .send({ username: 'testuser', password: 'password123' })
            .expect(201);

        expect(response.body).toHaveProperty('message', 'User created successfully');
    });

    it('should sign in an existing user', async () => {
        // Sign up a user first
        await request(app)
            .post('/api/auth/signup')
            .send({ username: 'testuser', password: 'password123' })
            .expect(201);

        // Sign in the user
        const response = await request(app)
            .post('/api/auth/signin')
            .send({ username: 'testuser', password: 'password123' })
            .expect(200);

        expect(response.body).toHaveProperty('token');
    });

    it('should return 401 for invalid credentials', async () => {
        await request(app)
            .post('/api/auth/signin')
            .send({ username: 'invaliduser', password: 'wrongpassword' })
            .expect(401);
    });

    it('should return 400 for duplicate signup', async () => {
        // Sign up a user
        await request(app)
            .post('/api/auth/signup')
            .send({ username: 'testuser', password: 'password123' })
            .expect(201);

        // Try signing up the same user again
        await request(app)
            .post('/api/auth/signup')
            .send({ username: 'testuser', password: 'password123' })
            .expect(400);
    });
});