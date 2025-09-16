# User Management Dashboard

A full-stack CRUD web application to manage users with a Node.js backend and React frontend.  
This project enables you to create, read, update, and delete user data efficiently through a clean and intuitive interface.

---

### Demo Video

Watch the demo video here: [Google Drive Video]([https://drive.google.com/file/d/YOUR_VIDEO_ID/view](https://drive.google.com/file/d/1Jju28l9FQ8ht_6E8bMU1mzIIpdS6TimM/view?usp=sharing))

---

## Table of Contents

1. [Understanding the Tech Stack](#understanding-the-tech-stack)  
2. [Project Structure](#project-structure)  
3. [Backend Development (Node.js, Express, & SQLite)](#backend-development-nodejs-express--sqlite)  
    - [Setup & Initialization](#setup--initialization)  
    - [Database Configuration (SQLite)](#database-configuration-sqlite)  
    - [Creating the Express Server](#creating-the-express-server)  
    - [Building the RESTful API Endpoints](#building-the-restful-api-endpoints)  
    - [Validation & Error Handling](#validation--error-handling)  
4. [Frontend Development (React)](#frontend-development-react)  
    - [Setup & Initialization](#setup--initialization-1)  
    - [Structuring the React App](#structuring-the-react-app)  
    - [Building Components](#building-components)  
    - [Connecting React to Backend API](#connecting-react-to-backend-api)  
    - [Client-Side Validation](#client-side-validation)  
5. [Running the Application Locally](#running-the-application-locally)  
6. [Submission Guidelines](#submission-guidelines)  
7. [Git & GitHub Workflow](#git--github-workflow)  
8. [License](#license)  

---

## Understanding the Tech Stack

- **Node.js:** JavaScript runtime for server-side development.  
- **Express.js:** Minimalist web framework for Node.js to build APIs.  
- **SQLite:** Lightweight, file-based relational database.  
- **React.js:** Frontend library for building UI components.  
- **React Router:** Handles routing/navigation in the React app.  
- **Axios:** HTTP client for making API requests.  
- **Tailwind CSS (Optional):** Utility-first CSS framework for styling.

---

## Project Structure

user-management-dashboard/
├── backend/
│ ├── database.js # Database connection and setup
│ ├── server.js # Main Express server file
│ └── routes/
│ └── users.js # API routes for users
├── frontend/
│ └── src/
│ ├── assets/ # Images, icons, screenshots
│ ├── components/ # Reusable React components
│ ├── pages/ # Page components (UserList, UserForm, etc.)
│ └── App.js # Main component with routing
└── README.md # Project documentation

yaml
Copy code

---

## Backend Development (Node.js, Express, & SQLite)

### Setup & Initialization

1. Create backend folder and initialize:
   ```bash
   mkdir -p user-management-dashboard/backend
   cd user-management-dashboard/backend
   npm init -y
Install dependencies:

bash
Copy code
npm install express sqlite3 cors
npm install --save-dev nodemon
Add a start script to package.json:

json
Copy code
"scripts": {
  "start": "nodemon server.js"
}
Database Configuration (SQLite)
Create backend/database.js to connect SQLite database and create users table if it doesn’t exist.

js
Copy code
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('users.db', (err) => {
  if (!err) {
    console.log('Connected to SQLite database.');
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        age INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;
    db.run(createTableSql);
  }
});
module.exports = db;
Creating the Express Server
Set up the Express server in backend/server.js:

js
Copy code
const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/users');

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
Building the RESTful API Endpoints
Define routes in backend/routes/users.js:

js
Copy code
const express = require('express');
const router = express.Router();
const db = require('../database');

// GET all users
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'success', data: rows });
  });
});

// Other endpoints (GET by ID, POST, PUT, DELETE) here...

module.exports = router;
Validation & Error Handling
Validate inputs on POST and PUT requests.

Handle database errors gracefully with appropriate status codes.

Frontend Development (React)
Setup & Initialization
Create React app and navigate inside:

bash
Copy code
npx create-react-app frontend
cd frontend
Install dependencies:

bash
Copy code
npm install react-router-dom axios
(Optional) Setup Tailwind CSS.

Structuring the React App
Define routes in frontend/src/App.js:

jsx
Copy code
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add-user" element={<UserForm />} />
        <Route path="/edit-user/:id" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
Building Components
UserList.js: Fetches and displays users in a table with edit/delete buttons.

UserForm.js: Form for adding/editing users with state handling and validation.

Connecting React to Backend API
Use Axios for API calls to the Express backend (e.g., http://localhost:8080/api/users).

Client-Side Validation
Add form validation to prevent invalid submissions before sending requests.

Running the Application Locally
Backend:

bash
Copy code
cd backend
npm install
npm start
Frontend:

bash
Copy code
cd frontend
npm install
npm start
Backend server runs on http://localhost:8080

Frontend runs on http://localhost:3000

Submission Guidelines
Provide a GitHub repository link.

Provide a deployed or published live link.

Include a screen recording demoing your app’s functionality.

Git & GitHub Workflow
Initialize Git in the root folder: git init.

Add .gitignore in frontend and backend folders to exclude node_modules.

Make frequent, meaningful commits.

Push your project to a GitHub repository.
