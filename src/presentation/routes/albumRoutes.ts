import { Router, Application } from 'express';
import { AlbumController } from '@presentation/controllers/AlbumController';
import { GetAlbumByIdHandler } from '@application/use-cases/album/query/getAlbumByIdHandler';
import { GetAlbumsHandler } from '@application/use-cases/album/query/getAlbumsHandler';
import { CreateAlbumHandler } from '@application/use-cases/album/command/createAlbumHandler';
import { UpdateAlbumHandler } from '@application/use-cases/album/command/updateAlbumHandler';
import { DeleteAlbumHandler } from '@application/use-cases/album/command/deleteAlbumHandler';

const router = Router();

const albumController = new AlbumController(
    new GetAlbumsHandler(),
    new GetAlbumByIdHandler(),
    new CreateAlbumHandler(),
    new UpdateAlbumHandler(),
    new DeleteAlbumHandler()
);

/**
 * @swagger
 * /albums:
 *   get:
 *     summary: Get all albums
 *     tags:
 *       - Album
 */
router.get('/albums', albumController.getAll.bind(albumController));

/**
 * @swagger
 * /albums/{id}:
 *   get:
 *     summary: Get an album by ID
 *     tags:
 *       - Album
 */
router.get('/albums/:id', albumController.getById.bind(albumController));

/**
 * @swagger
 * /albums:
 *   post:
 *     summary: Create a new album
 *     tags:
 *       - Album
 */
router.post('/albums', albumController.create.bind(albumController));

/**
 * @swagger
 * /albums/{id}:
 *   put:
 *     summary: Update an album
 *     tags:
 *       - Album
 */
router.put('/albums/:id', albumController.update.bind(albumController));

/**
 * @swagger
 * /albums/{id}:
 *   delete:
 *     summary: Delete an album
 *     tags:
 *       - Album
 */
router.delete('/albums/:id', albumController.delete.bind(albumController));

export default function setAlbumRoutes(app: Application): void {
    app.use('/api', router);
}