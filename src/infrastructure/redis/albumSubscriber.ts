import { redisClient } from '@infrastructure/redis/redisClient';
import { StoreAlbumCommand, StoreAlbumHandler } from '@application/use-cases/album/command/storeAlbumHandler';

export const subscribeToAlbumChannel = async (): Promise<void> => {
    const redisChannel = 'albumChannel';
    const storeAlbumHandler = new StoreAlbumHandler();

    redisClient.subscribe(redisChannel, (err, count) => {
        if (err) {
            console.error('Failed to subscribe to Redis channel:', err);
            return;
        }
        console.log(`Subscribed to ${redisChannel}. Currently subscribed to ${count} channel(s).`);
    });

    redisClient.on('message', async (channel, message) => {
        if (channel === redisChannel) {
            const albumData = JSON.parse(message);
            const command = new StoreAlbumCommand(albumData.userId, albumData.title);
            await storeAlbumHandler.handle(command);
        }
    });
};