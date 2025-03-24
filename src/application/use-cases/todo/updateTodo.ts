import { ITodoRepository } from "@application/interfaces/ITodoRepository";
import { Todo } from "@domain/entities/Todo";

export const updateTodo = async (id: string, todoData: Partial<Todo>, todoRepository: ITodoRepository): Promise<Todo | null> => {
    if (!id) {
        throw new Error("Todo ID is required");
    }

    if (!todoData.title) {
        throw new Error("Todo title is required");
    }

    return await todoRepository.update(id, todoData);
};