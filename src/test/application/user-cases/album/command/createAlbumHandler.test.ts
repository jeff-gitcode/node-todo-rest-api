import axios from 'axios';
import { Album } from '@domain/entities/Album';
import { CreateAlbumCommand, CreateAlbumHandler } from '@application/use-cases/album/command/createAlbumHandler';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CreateAlbumHandler', () => {
    it('should create a new album', async () => {
        // Arrange
        const command = new CreateAlbumCommand(1, 'New Album');
        const handler = new CreateAlbumHandler();
        const mockResponse = {
            data: { userId: 1, id: 101, title: 'New Album' },
        };
        mockedAxios.post.mockResolvedValue(mockResponse);

        // Act
        const result = await handler.handle(command);

        // Assert
        expect(result).toBeInstanceOf(Album);
        expect(result.userId).toBe(1);
        expect(result.title).toBe('New Album');
        expect(result.id).toBe(101);
        expect(mockedAxios.post).toHaveBeenCalledWith(
            'https://jsonplaceholder.typicode.com/albums',
            { userId: 1, title: 'New Album' }
        );
    });
});