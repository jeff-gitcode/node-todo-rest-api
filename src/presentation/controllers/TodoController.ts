export class TodoController {
    constructor(private createTodo: Function, private getTodos: Function, private deleteTodo: Function) { }

    async create(req: any, res: any) {
        try {
            const todo = await this.createTodo(req.body);
            res.status(201).json(todo);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAll(req: any, res: any) {
        try {
            const todos = await this.getTodos();
            res.status(200).json(todos);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async remove(req: any, res: any) {
        try {
            await this.deleteTodo(req.params.id);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}