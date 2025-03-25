# Node Todo REST API

This project is a Todo REST API built using Node.js, TypeScript, and MongoDB, following the Clean Architecture principles. It provides a simple interface for managing todo items, interacting with albums from JSONPlaceholder, and user authentication with JWT.

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
   Ensure you have a MongoDB instance running. You can use a local instance in memory mongodb by setting NODE_ENV=test or a cloud service like MongoDB Atlas.
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
## Required Packages
Below is a list of all the required packages for this project:

### Dependencies
- axios: For making HTTP requests to external APIs.
- bcrypt: For hashing passwords.
- dotenv: For managing environment variables.
- express: Web framework for building REST APIs.
- joi: For request validation.
- jsonwebtoken: For generating and verifying JWT tokens.
- mongoose: For interacting with MongoDB.
- swagger-jsdoc: For generating Swagger documentation.
- swagger-ui-express: For serving Swagger UI.

### Dev Dependencies
- @eslint/js: ESLint configuration for JavaScript.
- @types/bcrypt: TypeScript types for bcrypt.
- @types/express: TypeScript types for Express.
- @types/jest: TypeScript types for Jest.
- @types/jsonwebtoken: TypeScript types for JWT.
- @types/supertest: TypeScript types for Supertest.
- @types/swagger-jsdoc: TypeScript types for Swagger JSDoc.
- @types/swagger-ui-express: TypeScript types for Swagger UI Express.
- eslint: For linting the codebase.
- globals: Provides global variables for ESLint.
- husky: For managing Git hooks.
- jest: Testing framework.
- mockingoose: For mocking Mongoose models in tests.
- nock: For mocking HTTP requests in tests.
- mongodb-memory-server: For in-memory MongoDB during tests.
- ts-jest: Jest preset for TypeScript.
- ts-node: For running TypeScript files directly.
- ts-node-dev: For hot-reloading during development.
- tsconfig-paths: For resolving TypeScript path aliases.
- typescript: TypeScript compiler.

## API Endpoints

### Todo Endpoints (Secured with JWT)

All `Todo` endpoints require a valid JWT token in the `Authorization` header. You can obtain the token by signing in through the `/auth/signin` endpoint.

#### Example Authorization Header:
```
Authorization: Bearer <jwt_token_here>
```

- **Create Todo**
  - **POST** `/todos`
  - **Headers**:
    - `Authorization`: Bearer `<your_jwt_token>`
  - Request Body: `{ "title": "Todo Title", "completed": false }`

- **Get Todos**
  - **GET** `/todos`
  - **Headers**:
    - `Authorization`: Bearer `<your_jwt_token>`
  - Response: Array of todos

- **Delete Todo**
  - **DELETE** `/todos/:id`
  - **Headers**:
    - `Authorization`: Bearer `<your_jwt_token>`
  - URL Parameter: `id` of the todo to delete

- **Get Todo by ID**
  - **GET** `/todos/:id`
  - **Headers**:
    - `Authorization`: Bearer `<your_jwt_token>`
  - URL Parameter: `id` of the todo to retrieve
  
- **Update Todo**
  - **PUT** `/todos/:id`
  - **Headers**:
    - `Authorization`: Bearer `<your_jwt_token>`
  - URL Parameter: `id` of the todo to update
  - Request Body: `{ "title": "Updated Todo Title"}`

### Album Endpoints

- **Create Album**
  - **POST** `/albums`
  - Request Body: `{ "title": "Album Title" }`

- **Get Albums**
  - **GET** `/albums`
  - Response: Array of albums

- **Delete Album**
  - **DELETE** `/albums/:id`
  - URL Parameter: `id` of the album to delete

- **Get Album by ID**
  - **GET** `/albums/:id`
  - URL Parameter: `id` of the album to retrieve

- **Update Album**
  - **PUT** `/albums/:id`
  - URL Parameter: `id` of the album to update
  - Request Body: `{ "title": "Updated Album Title"}`
      
### Authentication Endpoints

- **Sign Up**
  - **POST** `/auth/signup`
  - Request Body:
    ```json
    {
      "username": "testuser",
      "password": "password123"
    }
    ```
  - Response: `{ "message": "User created successfully" }`

- **Sign In**
  - **POST** `/auth/signin`
  - Request Body:
    ```json
    {
      "username": "testuser",
      "password": "password123"
    }
    ```
  - Response: `{ "token": "jwt_token_here" }`

## Request Validation

This API uses `Joi` for request validation. Below are the validation rules for each endpoint:

- **Create Todo** (`POST /todos`):
  - `title`: Required, must not be empty.

- **Update Todo** (`PUT /todos/:id`):
  - `title`: Required, must not be empty.

If a request fails validation, the API will return a `400 Bad Request` response with details about the validation errors.

### Example Error Response:
```json
{
  "errors": [
    {
      "message": "Title is required",
      "path": ["title"]
    }
  ]
}
```

## API Documentation
The API is documented using Swagger. You can access the interactive Swagger UI at:
http://localhost:3000/api-docs

## Swagger UI Screenshot
Below is a screenshot of the Swagger UI for this API:

![Swagger UI Preview](doc/node-todo-api-swagger.png)

## Git to remove local cache
```
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
git push -u origin master

