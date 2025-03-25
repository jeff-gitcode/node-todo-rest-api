import { redisClient } from '@infrastructure/redis/redisClient';

export class PublishAlbumCommand {
    constructor(public readonly userId: number, public readonly title: string) {}
}

export class PublishAlbumHandler {
    private readonly redisChannel = 'albumChannel';

    async handle(command: PublishAlbumCommand): Promise<void> {
        const { userId, title } = command;

        // Publish album data to Redis
        const albumData = JSON.stringify({ userId, title });
        await redisClient.publish(this.redisChannel, albumData);

        console.log(`Published album to Redis: ${title}`);
    }
}