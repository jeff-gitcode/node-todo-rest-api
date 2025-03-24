import { ITodoRepository } from "@application/interfaces/ITodoRepository";
import { Todo } from "@domain/entities/Todo";

export const getTodoById = async (id: string, todoRepository: ITodoRepository): Promise<Todo | null> => {
    if (!id) {
        throw new Error("Todo ID is required");
    }

    return await todoRepository.findById(id);
};