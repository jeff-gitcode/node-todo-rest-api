import axios from 'axios';
import { Album } from '@domain/entities/Album';

export class UpdateAlbumCommand {
    constructor(public readonly id: number, public readonly title: string) {}
}

export class UpdateAlbumHandler {
    private readonly jsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com/albums';

    async handle(command: UpdateAlbumCommand): Promise<Album> {
        const response = await axios.put<Album>(`${this.jsonPlaceholderUrl}/${command.id}`, {
            title: command.title,
        });

        const album = response.data;
        return new Album(album.userId, album.id, album.title);
    }
}