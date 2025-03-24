import { ITodoRepository } from "@application/interfaces/ITodoRepository";
import { Todo } from "@domain/entities/Todo";
import { TodoModel } from "@infrastructure/model/TodoModel";

export class TodoRepository implements ITodoRepository {
    async create(todo: Todo): Promise<Todo> {
        const createdTodo = new TodoModel({ title: todo.title });
        const savedTodo = await createdTodo.save();
        return { id: savedTodo._id.toString(), title: savedTodo.title };
    }

    async findAll(): Promise<Todo[]> {
        const todos = await TodoModel.find();
        return todos.map(todo => ({ id: todo._id.toString(), title: todo.title }));
    }

    async findById(id: string): Promise<Todo | null> {
        const todo = await TodoModel.findById(id);
        if (!todo) return null;
        return { id: todo._id.toString(), title: todo.title };
    }

    async update(id: string, todo: Partial<Todo>): Promise<Todo | null> {
        const updatedTodo = await TodoModel.findByIdAndUpdate(id, todo, { new: true });
        if (!updatedTodo) return null;
        return { id: updatedTodo._id.toString(), title: updatedTodo.title };
    }

    async delete(id: string): Promise<void> {
        await TodoModel.findByIdAndDelete(id);
    }
}