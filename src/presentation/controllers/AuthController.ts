import { Request, Response } from 'express';
import { SignupHandler, SignupCommand } from '@application/use-cases/auth/command/signupHandler';
import { SigninHandler, SigninCommand } from '@application/use-cases/auth/command/signinHandler';

export class AuthController {
    constructor(
        private readonly signupHandler: SignupHandler,
        private readonly signinHandler: SigninHandler
    ) { }

    async signup(req: Request, res: Response): Promise<void> {
        try {
            const command = new SignupCommand(req.body.username, req.body.password);
            await this.signupHandler.handle(command);
            res.status(201).json({ message: 'User created successfully' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async signin(req: Request, res: Response): Promise<void> {
        try {
            const command = new SigninCommand(req.body.username, req.body.password);
            const token = await this.signinHandler.handle(command);
            res.status(200).json({ token });
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }
}