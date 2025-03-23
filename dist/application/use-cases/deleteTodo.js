"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = void 0;
const deleteTodo = async (id, todoRepository) => {
    if (!id) {
        throw new Error("Todo ID is required");
    }
    await todoRepository.delete(id);
};
exports.deleteTodo = deleteTodo;
