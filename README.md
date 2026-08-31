# HaBitNote — Notes App

A full-stack Notes application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) as part of 10PShine Cohort 9 internship.

## 🚀 Features

- User authentication (signup, login, logout) with JWT
- Create, edit, and delete notes with rich text editing
- Real-time search and filter notes
- Application logging using Pino Logger
- Global error handling middleware
- Toast notifications and confirmation dialogs
- Protected routes for authenticated users
- 39 unit tests (19 backend, 20 frontend)
- SonarQube code quality integration

## 🛠️ Tech Stack

**Backend:**
- Node.js, Express.js
- MongoDB, Mongoose
- bcryptjs, jsonwebtoken
- Pino Logger
- Mocha, Chai, Supertest

**Frontend:**
- React 19, Vite
- React Router DOM
- Axios
- Quill.js (rich text editor)
- Jest, React Testing Library

## 📋 Prerequisites

- Node.js installed
- MongoDB Atlas account
- Git installed

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Aanchal-Kukreja/cohort-9-mern-16264-aanchal.git
cd cohort-9-mern-16264-aanchal
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file in frontend folder:
```
VITE_API_URL=http://localhost:5000/api
```

## ▶️ Running the Application

### Start Backend
```bash
cd backend
node index.js
```

### Start Frontend
```bash
cd frontend
npm run dev
```

Open `http://localhost:5173` in your browser.

## 🧪 Running Tests

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📊 API Endpoints

### Auth Routes
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/auth/signup` | Public |
| POST | `/api/auth/login` | Public |
| POST | `/api/auth/logout` | Protected |

### Notes Routes
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/notes` | Protected |
| GET | `/api/notes/:id` | Protected |
| POST | `/api/notes` | Protected |
| PUT | `/api/notes/:id` | Protected |
| DELETE | `/api/notes/:id` | Protected |

## 📈 SonarQube Results

- **Quality Gate:** Passed ✅
- **Maintainability:** A
- **Duplications:** 1.4%

Screenshots available in `SonarCubeReport/` folder.

## 👩‍💻 Author

Aanchal Kukreja — 10PShine Cohort 9


