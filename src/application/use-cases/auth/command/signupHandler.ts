import bcrypt from 'bcrypt';
import { UserModel } from '@infrastructure/model/UserModel';

export class SignupCommand {
    constructor(public readonly username: string, public readonly password: string) { }
}

export class SignupHandler {
    async handle(command: SignupCommand): Promise<void> {
        const { username, password } = command;

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            throw new Error('Username already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new UserModel({ username, password: hashedPassword });
        await newUser.save();
    }
}