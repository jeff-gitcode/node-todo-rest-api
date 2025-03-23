import { Todo } from "@domain/entities/Todo";

export interface ITodoRepository {
    create(todo: Todo): Promise<Todo>;
    findAll(): Promise<Todo[]>;
    delete(id: string): Promise<void>;
}