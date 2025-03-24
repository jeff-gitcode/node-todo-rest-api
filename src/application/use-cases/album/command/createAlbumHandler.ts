import axios from 'axios';
import { Album } from '@domain/entities/Album';

export class CreateAlbumCommand {
    constructor(public readonly userId: number, public readonly title: string) {}
}

export class CreateAlbumHandler {
    private readonly jsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com/albums';

    async handle(command: CreateAlbumCommand): Promise<Album> {
        const response = await axios.post<Album>(this.jsonPlaceholderUrl, {
            userId: command.userId,
            title: command.title,
        });

        const album = response.data;
        return new Album(album.userId, album.id, album.title);
    }
}