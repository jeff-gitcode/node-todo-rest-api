import mongoose, { Schema, Document } from "mongoose";

// Define the Mongoose schema for the Todo entity
export interface ITodoDocument extends Document {
    title: string;
}

export const TodoSchema = new Schema<ITodoDocument>({
    title: { type: String, required: true }
});

// Create the Mongoose model
export const TodoModel = mongoose.model<ITodoDocument>('Todo', TodoSchema);

// import mongoose, { Schema } from "mongoose";

// const schema = new Schema({
//     title: { type: String, required: true }
// });

// module.exports = mongoose.model('Todo', schema);
