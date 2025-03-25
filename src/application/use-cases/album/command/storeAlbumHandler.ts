import { AlbumModel } from '@infrastructure/model/AlbumModel';

export class StoreAlbumCommand {
    constructor(public readonly userId: number, public readonly title: string) { }
}

export class StoreAlbumHandler {
    async handle(command: StoreAlbumCommand): Promise<void> {
        const { userId, title } = command;

        // Save the album to MongoDB
        const newAlbum = new AlbumModel({ userId, title });
        await newAlbum.save();

        console.log(`Stored album in MongoDB: ${title}`);
    }
}