import axios from 'axios';

export class DeleteAlbumCommand {
    constructor(public readonly id: number) { }
}

export class DeleteAlbumHandler {
    private readonly jsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com/albums';

    async handle(command: DeleteAlbumCommand): Promise<void> {
        await axios.delete(`${this.jsonPlaceholderUrl}/${command.id}`);
    }
}