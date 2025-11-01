# Todo App

A fullstack Todo application built with React, TypeScript, Node.js, Express, and SQLite.

## Features

- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Clean and responsive user interface
- Real-time updates
- Persistent storage using SQLite

## Tech Stack

- **Frontend**: React with TypeScript, Material-UI
- **Backend**: Node.js, Express
- **Database**: SQLite
- **Styling**: Material-UI with custom CSS

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```
   The backend will be available at `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The application will open in your default browser at `http://localhost:3000`

## Project Structure

```
todo-app/
├── backend/
│   ├── node_modules/
│   ├── index.js         # Main backend server file
│   ├── package.json
│   ├── todos.db        # SQLite database file
│   └── view-db.js      # Utility to view database contents
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── services/
    │   │   └── api.ts  # API service for backend communication
    │   ├── types/
    │   │   └── todo.ts # TypeScript interfaces
    │   ├── App.tsx     # Main application component
    │   └── index.tsx   # Application entry point
    ├── package.json
    └── tsconfig.json
```

## Available Scripts

### Backend
- `npm start` - Start the backend server
- `npm run dev` - Start the backend server with nodemon for development
- `node view-db.js` - View the contents of the SQLite database

### Frontend
- `npm start` - Start the development server
- `npm test` - Run tests
- `npm run build` - Build the application for production

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
  - Body: `{ "title": "New Todo" }`
- `PUT /api/todos/:id` - Update a todo
  - Body: `{ "title": "Updated Todo", "completed": true }`
- `DELETE /api/todos/:id` - Delete a todo

## Viewing the Database

To view the contents of the SQLite database, run:

```bash
node view-db.js
```

This will display the structure of all tables and their contents in a readable format.

## License

This project is open source and available under the [MIT License](LICENSE).
