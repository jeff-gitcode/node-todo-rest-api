import axios from 'axios';
import { Album } from '@domain/entities/Album';

export class GetAlbumsQuery { }

export class GetAlbumsHandler {
    private readonly jsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com/albums';

    async handle(query: GetAlbumsQuery): Promise<Album[]> {
        const response = await axios.get<Album[]>(this.jsonPlaceholderUrl);
        return response.data.map(album => new Album(album.userId, album.id, album.title));
    }
}