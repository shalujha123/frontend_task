# MERN Task Manager App

A full-stack **MERN application** for managing tasks with authentication, CRUD, search & filter.  
Built with **MongoDB, Express, React, Node.js**, and styled using custom CSS (responsive & neat UI).  

---

## Features

- **User Authentication**
  - Register new user
  - Login user (JWT token based)
  - Update profile (name, email, password)

- **Tasks Management**
  - Add new task
  - Edit task title/description
  - Mark task as completed/undo
  - Delete task
  - Search tasks
  - Filter tasks (All / Completed / Pending)

- **Secure Backend**
  - JWT auth
  - Bcrypt password hashing
  - Validation with `express-validator`
  - Error handling middleware

- **Frontend**
  - React + Vite
  - Context API for auth state
  - Axios for API requests
  - Responsive UI with custom CSS

---

## Tech Stack

- **Frontend:** React (Vite), Context API, Axios, CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Auth:** JWT + Bcrypt
- **Other:** dotenv, express-validator, cors, helmet, morgan

---

## Project Structure

project-root/
├── backend/
│ ├── server.js
│ ├── package.json
│ ├── .env
│ ├── /config
│ ├── /models
│ ├── /controllers
│ ├── /routes
│ ├── /middleware
│ └── postman_collection.json
└── frontend/
├── src/
│ ├── App.jsx
│ ├── main.jsx
│ ├── index.css
│ ├── /pages
│ ├── /components
│ ├── /context
│ └── /services
└── package.json


---

## Setup Instructions

### 1. Clone repo
```bash
git clone https://github.com/shalujha123/frontend_task.git
```


cd project-root

2. Backend Setup
cd backend
npm install


Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
NODE_ENV=development


Run backend:

npm run dev


API will run on → http://localhost:5000

3. Frontend Setup
cd frontend
npm install


Start frontend:

npm run dev


App will run on → http://localhost:5173

API Endpoints
Auth Routes

POST /api/auth/register → Register

POST /api/auth/login → Login

GET /api/auth/me → Get profile

PUT /api/auth/me → Update profile

Task Routes (Protected)

GET /api/tasks → List tasks

POST /api/tasks → Create task

GET /api/tasks/:id → Get single task

PUT /api/tasks/:id → Update task

DELETE /api/tasks/:id → Delete task

Postman Collection

File: backend/postman_collection.json

Import into Postman and test all endpoints quickly.

Scalability Notes

JWT Refresh Tokens can be added for better session management.

Pagination for tasks if data grows large.

Search indexes on MongoDB for faster queries.

Rate limiting & security (helmet, sanitize inputs).

Dockerization for easy deployment.

Deployment Guide
Backend Deployment (Render / Railway / Cyclic)

Push backend folder to GitHub.

Connect repo to Render/Railway.

Add environment variables from .env.

Deploy → copy the deployed API base URL.

Frontend Deployment (Vercel / Netlify)

Push frontend folder to GitHub.

Connect repo to Vercel/Netlify.

In frontend/src/services/api.js, update:

const api = axios.create({
  baseURL: "https://your-deployed-backend-url/api",
});


Deploy → your app will be live 

Author:- shalu kumari

Built using MERN stack.

