import axios from 'axios';
import { Album } from '@domain/entities/Album';

export class GetAlbumByIdQuery {
    constructor(public readonly id: number) { }
}

export class GetAlbumByIdHandler {
    private readonly jsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com/albums';

    async handle(query: GetAlbumByIdQuery): Promise<Album | null> {
        try {
            const response = await axios.get<Album>(`${this.jsonPlaceholderUrl}/${query.id}`);
            const album = response.data;
            return new Album(album.userId, album.id, album.title);
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                return null; // Album not found
            }
            throw new Error('Error fetching album: ' + error.message);
        }
    }
}