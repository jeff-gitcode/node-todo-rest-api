export class TodoController {
    constructor(
        private readonly createTodo: Function,
        private readonly getTodos: Function,
        private readonly deleteTodo: Function,
        private readonly getTodoById: Function, // New method
        private readonly updateTodo: Function // New method
    ) { }

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

    async getById(req: any, res: any) {
        try {
            const todo = await this.getTodoById(req.params.id);
            if (!todo) {
                return res.status(404).json({ message: "Todo not found" });
            }
            res.status(200).json(todo);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req: any, res: any) {
        try {
            const todo = await this.updateTodo(req.params.id, req.body);
            if (!todo) {
                return res.status(404).json({ message: "Todo not found" });
            }
            res.status(200).json(todo);
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