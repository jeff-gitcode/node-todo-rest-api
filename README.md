# Node Todo REST API

This project is a Todo REST API built using Node.js, TypeScript, and MongoDB, following the Clean Architecture principles. It provides a simple interface for managing todo items.

## Project Structure

```
node-todo-rest-api
├── src
│   ├── application
│   │   ├── use-cases
│   │   ├── interfaces
│   ├── domain
│   │   └── entities
│   ├── infrastructure
│   │   ├── database
│   │   └── repositories
│   ├── presentation
│   │   ├── controllers
│   │   └── routes
│   └── server.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd node-todo-rest-api
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up MongoDB:**
   Ensure you have a MongoDB instance running. You can use a local instance or a cloud service like MongoDB Atlas.
   ```
   docker-compose up -d
   ```

4. **Configure environment variables:**
   Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://admin:admin@localhost:27017/todoDB?authSource=admin
   ```

5. **Run the application:**
   ```
   npm start
   ```
6. Development mode: To run the application in development mode with hot-reloading:
   ```
   npm run dev
   ```
## API Endpoints

- **Create Todo**
  - **POST** `/todos`
  - Request Body: `{ "title": "Todo Title", "completed": false }`

- **Get Todos**
  - **GET** `/todos`
  - Response: Array of todos

- **Delete Todo**
  - **DELETE** `/todos/:id`
  - URL Parameter: `id` of the todo to delete

- **Get Todo by ID**
  - **GET** `/todos/:id`
  - URL Parameter: `id` of the todo to retrieve
  
- **Update Todo**
  - **PUT** `/todos/:id`
  - URL Parameter: `id` of the todo to update
  - Request Body: `{ "title": "Updated Todo Title"}`
