import Queue from 'bull';
import { redisClient } from '@infrastructure/redis/redisClient';

// Create a Bull queue for album data
export const albumQueue = new Queue('albumQueue', {
    redis: { host: 'localhost', port: 6379 }, // Update with your Redis configuration
});

// Publisher: Add album data to the queue
export const publishAlbumToQueue = async (album: { userId: number; title: string }) => {
    await albumQueue.add(album, { attempts: 3, backoff: 5000 }); // Retry up to 3 times with a 5-second delay
};

// Subscriber: Process album data from the queue
albumQueue.process(async (job) => {
    const { userId, title } = job.data;
    console.log(`Processing album: ${title} for user ${userId}`);
    // This will be handled by the StoreAlbumHandler
});