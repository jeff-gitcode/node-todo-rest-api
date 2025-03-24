import axios from 'axios';
import { Album } from '@domain/entities/Album';
import { GetAlbumsHandler, GetAlbumsQuery } from '@application/use-cases/album/query/getAlbumsHandler';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GetAlbumsHandler', () => {
    it('should fetch all albums', async () => {
        // Arrange
        const handler = new GetAlbumsHandler();
        const query = new GetAlbumsQuery();
        const mockResponse = {
            data: [
                { userId: 1, id: 1, title: 'Album 1' },
                { userId: 2, id: 2, title: 'Album 2' },
            ],
        };
        mockedAxios.get.mockResolvedValue(mockResponse);

        // Act
        const result = await handler.handle(query);

        // Assert
        expect(result).toHaveLength(2);
        expect(result[0]).toBeInstanceOf(Album);
        expect(result[0].title).toBe('Album 1');
        expect(mockedAxios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/albums');
    });
});