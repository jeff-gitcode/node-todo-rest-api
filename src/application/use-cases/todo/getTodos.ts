import { ITodoRepository } from "@application/interfaces/ITodoRepository";

export const getTodos = async (todoRepository: ITodoRepository) => {
    try {
        const todos = await todoRepository.findAll();
        return todos;
    } catch (error: any) {
        throw new Error('Error retrieving todos: ' + error.message);
    }
};