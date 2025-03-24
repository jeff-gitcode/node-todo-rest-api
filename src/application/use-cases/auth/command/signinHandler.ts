import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '@infrastructure/model/UserModel';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export class SigninCommand {
    constructor(public readonly username: string, public readonly password: string) { }
}

export class SigninHandler {
    async handle(command: SigninCommand): Promise<string> {
        const { username, password } = command;

        // Find the user by username
        const user = await UserModel.findOne({ username });
        if (!user) {
            throw new Error('Invalid username or password');
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid username or password');
        }

        // Generate a JWT token
        return jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
            expiresIn: '24h',
        });
    }
}