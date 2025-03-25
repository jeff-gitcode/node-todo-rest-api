import request from 'supertest';
import app from '../../app';
import nock from 'nock';

describe('Album Endpoints (E2E)', () => {
    const jsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com';

    afterEach(() => {
        // Clean up all nock interceptors after each test
        nock.cleanAll();
    });

    it('should create a new album', async () => {
        // Mock the external API response
        nock(jsonPlaceholderUrl)
            .post('/albums', { userId: 1, title: 'New Album' })
            .reply(201, { userId: 1, id: 101, title: 'New Album' });

        const response = await request(app)
            .post('/api/albums')
            .send({ userId: 1, title: 'New Album' })
            .expect(201);

        expect(response.body).toHaveProperty('id', 101);
        expect(response.body.userId).toBe(1);
        expect(response.body.title).toBe('New Album');
    });

    it('should get all albums', async () => {
        // Mock the external API response
        nock(jsonPlaceholderUrl)
            .get('/albums')
            .reply(200, [
                { userId: 1, id: 1, title: 'Album 1' },
                { userId: 2, id: 2, title: 'Album 2' },
            ]);

        const response = await request(app).get('/api/albums').expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(2);
        expect(response.body[0]).toHaveProperty('id', 1);
        expect(response.body[0].title).toBe('Album 1');
    });

    it('should get an album by ID', async () => {
        // Mock the external API response
        nock(jsonPlaceholderUrl)
            .get('/albums/1')
            .reply(200, { userId: 1, id: 1, title: 'Sample Album' });

        const response = await request(app).get('/api/albums/1').expect(200);

        expect(response.body).toHaveProperty('id', 1);
        expect(response.body.title).toBe('Sample Album');
    });

    it('should update an album', async () => {
        // Mock the external API response
        nock(jsonPlaceholderUrl)
            .put('/albums/1', { title: 'Updated Title' })
            .reply(200, { userId: 1, id: 1, title: 'Updated Title' });

        const response = await request(app)
            .put('/api/albums/1')
            .send({ title: 'Updated Title' })
            .expect(200);

        expect(response.body).toHaveProperty('id', 1);
        expect(response.body.title).toBe('Updated Title');
    });

    it('should delete an album', async () => {
        // Mock the external API response
        nock(jsonPlaceholderUrl)
            .delete('/albums/1')
            .reply(204);

        await request(app).delete('/api/albums/1').expect(204);
    });
});