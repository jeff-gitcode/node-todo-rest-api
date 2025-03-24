import { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Todo REST API",
            version: "1.0.0",
            description: "A REST API for managing todo items using Node.js, TypeScript, and MongoDB.",
        },
        servers: [
            {
                url: "http://localhost:3000/api",
                description: "Development server",
            },
        ],
    },
    apis: ["./src/presentation/routes/*.ts"], // Path to the API docs
};

export default swaggerOptions;