import { Request, Response } from 'express';
import { GetAlbumByIdHandler, GetAlbumByIdQuery } from '@application/use-cases/album/query/getAlbumByIdHandler';
import { GetAlbumsHandler, GetAlbumsQuery } from '@application/use-cases/album/query/getAlbumsHandler';
import { CreateAlbumHandler, CreateAlbumCommand } from '@application/use-cases/album/command/createAlbumHandler';
import { UpdateAlbumHandler, UpdateAlbumCommand } from '@application/use-cases/album/command/updateAlbumHandler';
import { DeleteAlbumHandler, DeleteAlbumCommand } from '@application/use-cases/album/command/deleteAlbumHandler';

export class AlbumController {
    constructor(
        private readonly getAlbumsHandler: GetAlbumsHandler,
        private readonly getAlbumByIdHandler: GetAlbumByIdHandler,
        private readonly createAlbumHandler: CreateAlbumHandler,
        private readonly updateAlbumHandler: UpdateAlbumHandler,
        private readonly deleteAlbumHandler: DeleteAlbumHandler
    ) { }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const query = new GetAlbumsQuery();
            const albums = await this.getAlbumsHandler.handle(query);
            res.status(200).json(albums);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching albums', error: error.message });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            const query = new GetAlbumByIdQuery(id);
            const album = await this.getAlbumByIdHandler.handle(query);
            if (!album) {
                res.status(404).json({ message: 'Album not found' });
                return;
            }
            res.status(200).json(album);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching album', error: error.message });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const command = new CreateAlbumCommand(req.body.userId, req.body.title);
            const album = await this.createAlbumHandler.handle(command);
            res.status(201).json(album);
        } catch (error: any) {
            res.status(500).json({ message: 'Error creating album', error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            const command = new UpdateAlbumCommand(id, req.body.title);
            const album = await this.updateAlbumHandler.handle(command);
            res.status(200).json(album);
        } catch (error: any) {
            res.status(500).json({ message: 'Error updating album', error: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            const command = new DeleteAlbumCommand(id);
            await this.deleteAlbumHandler.handle(command);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: 'Error deleting album', error: error.message });
        }
    }
}