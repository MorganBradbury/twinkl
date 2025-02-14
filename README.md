# My Application

This application is built with TypeScript, Node.js, SQLite3, Prisma, Zod, and Jest. It provides a simple backend API for user sign up and retrieval.

## Example Endpoints

### POST `/signup`

- Description: This endpoint creates a new user record in the database
- Parameters: user information as a json object, specified as part of the request body e.g. `{
    "fullName":"John Doe",
    "email": "john.doe@google.com",
    "password": "Password1234!",
    "userType": "STUDENT"
}`.
- Password must meet the criteria:
        1. Between 8 and 64 characters
        2. Must contain at least one digit (0-9)
        2. Must contain at least one lowercase letter (a-z)
        4. Must contain at least one uppercase letter (A-Z)

- userType must be of value:   "STUDENT" | "TEACHER" | "PARENT" | "PRIVATE_TUTOR"

### GET `/user/{userId}`

- Description: This endpoint retrieves a specific user record.
- Parameters: The ID of the user, specified as part of the request endpoint.

## Technologies Used

- **TypeScript**: Provides type safety for both application logic and API endpoints.
- **Node.js**: The runtime environment for the backend server.
- **SQLite3**: A lightweight database for local development and testing.
- **Prisma**: ORM for interacting with the database.
- **Zod**: Schema validation and data parsing.
- **Jest**: Testing framework for running unit and integration tests.

## Setup and Installation

Follow these steps to run the application locally.

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/): Ensure that Node.js, preferably version 16 or higher, is installed on your system, as this project utilizes the latest versions of TypeScript and Nodemon.
- [npm](https://www.npmjs.com/): npm is the package manager for Node.js and comes with the Node.js installation.

### Installation

Install the dependencies:

```
npm i
```

Ensure you setup Prisma on the latest migration:

```
npx prisma migrate deploy
```

### Usage

In development the following command will start the server and use `nodemon` to auto-reload the server based on file changes

```
npm run dev
```

The server will start at `http://localhost:3000` by default. You can change the port in `src/index.ts`

To run the project tests, run the command:

```
npm run test
```

There are also commands to build and start a server without nodemon:

```
npm run build
npm start
```