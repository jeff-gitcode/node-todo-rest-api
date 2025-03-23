import { ITodoRepository } from "@application/interfaces/ITodoRepository";
import { Todo } from "@domain/entities/Todo";
import { ObjectId } from "mongodb";

export class TodoRepository implements ITodoRepository {
    private readonly db: any;

    constructor(db: any) {
        this.db = db;
    }

    async create(todo: Todo): Promise<Todo> {
        const result = await this.db.collection('todos').insertOne(todo);
        return { ...todo, id: result.insertedId.toString() };
    }

    async findAll(): Promise<Todo[]> {
        return await this.db.collection('todos').find({}).toArray();
    }

    async delete(id: string): Promise<void> {
        await this.db.collection('todos').deleteOne({ _id: new ObjectId(id) });
    }
}