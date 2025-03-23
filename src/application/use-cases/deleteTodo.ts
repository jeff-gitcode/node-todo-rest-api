import { ITodoRepository } from "@application/interfaces/ITodoRepository";

export const deleteTodo = async (id: string, todoRepository: ITodoRepository): Promise<void> => {
    if (!id) {
        throw new Error("Todo ID is required");
    }

    await todoRepository.delete(id);
};