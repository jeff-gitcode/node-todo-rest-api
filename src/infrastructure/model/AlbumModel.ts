import mongoose, { Schema, Document } from 'mongoose';

export interface IAlbumDocument extends Document {
    userId: number;
    title: string;
}

const AlbumSchema = new Schema<IAlbumDocument>({
    userId: { type: Number, required: true },
    title: { type: String, required: true },
});

export const AlbumModel = mongoose.model<IAlbumDocument>('Album', AlbumSchema);