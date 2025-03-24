import { Todo } from "@domain/entities/Todo";

export interface ITodoRepository {
    create(todo: Todo): Promise<Todo>;
    findAll(): Promise<Todo[]>;
    findById(id: string): Promise<Todo | null>; // New method
    update(id: string, todo: Partial<Todo>): Promise<Todo | null>; // New method
    delete(id: string): Promise<void>;
}