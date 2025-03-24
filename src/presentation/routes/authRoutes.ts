import { Router, Application } from 'express';
import { AuthController } from '@presentation/controllers/AuthController';
import { SignupHandler } from '@application/use-cases/auth/command/signupHandler';
import { SigninHandler } from '@application/use-cases/auth/command/signinHandler';

const router = Router();

const authController = new AuthController(
    new SignupHandler(),
    new SigninHandler()
);

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Sign up a new user
 */
router.post('/auth/signup', authController.signup.bind(authController));

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Sign in a user
 */
router.post('/auth/signin', authController.signin.bind(authController));

export default function setAuthRoutes(app: Application): void {
    app.use('/api', router);
}