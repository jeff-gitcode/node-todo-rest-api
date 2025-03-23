import { Todo } from "@domain/entities/Todo";
import { ITodoRepository } from "@application/interfaces/ITodoRepository";

export const createTodo = async (todoData: { title: string }, todoRepository: ITodoRepository): Promise<Todo> => {
    if (!todoData.title) {
        throw new Error("Todo title is required");
    }

    const newTodo = new Todo(
        new Date().toISOString(), // Generate a unique ID (you can replace this with a better ID generator)
        todoData.title
    );

    return await todoRepository.create(newTodo);
};