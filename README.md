# Task Manager

A full-stack Task Manager application built with **React, TypeScript, Node.js, Express, PostgreSQL, and Prisma**.

The project provides a simple interface for creating, managing, searching, filtering, and paginating tasks through a REST API.

## 🚀 Live Demo

**Frontend:**
https://task-manager-frontend-chi-eight.vercel.app/

**Backend API:**
https://task-manager-two-lake-40.vercel.app/

## ✨ Features

- Create new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed or pending
- Search tasks by title or description
- Filter tasks by status
- Server-side pagination
- RESTful API
- Request validation with Zod
- Centralized error handling
- PostgreSQL database
- Prisma ORM
- Responsive React interface
- Loading and error states
- Frontend and backend deployed on Vercel

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router
- Lucide React

### Backend

- Node.js
- Express 5
- TypeScript
- PostgreSQL
- Prisma ORM
- Zod
- Vitest
- Supertest

### Deployment

- Vercel

## 📁 Project Structure

```text
task-manager/
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── schemas/
│   │   └── ...
│   ├── prisma/
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   ├── layout/
│   │   │   └── tasks/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── ...
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| GET    | `/api/tasks`     | Get tasks        |
| GET    | `/api/tasks/:id` | Get a task by ID |
| POST   | `/api/tasks`     | Create a task    |
| PATCH  | `/api/tasks/:id` | Update a task    |
| DELETE | `/api/tasks/:id` | Delete a task    |

### Query Parameters

The `GET /api/tasks` endpoint supports:

```text
?page=1
&limit=10
&search=backend
&status=pending
```

Supported status values:

```text
all
pending
completed
```

## 🔎 Search & Filtering

Task searching is handled on the server side and supports searching through:

- Task title
- Task description

The frontend uses a debounce before sending search requests to reduce unnecessary API calls.

Tasks can also be filtered by:

- All
- Pending
- Completed

## 📄 Pagination

The API uses server-side pagination.

Example response:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalTasks": 11,
    "totalPages": 2,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

## ✅ Validation & Error Handling

The backend uses **Zod** to validate incoming request data.

Validation is applied to:

- Request body
- Route parameters
- Task data

The application also includes centralized error handling for API errors.

## 🗄️ Database

The application uses **PostgreSQL** with **Prisma ORM**.

### Task Model

```prisma
model Task {
  id          String   @id @default(uuid()) @db.Uuid
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🧪 Testing

The backend includes integration tests using:

- Vitest
- Supertest

Tests cover API behavior such as creating, retrieving, updating, and deleting tasks.

## ⚙️ Environment Variables

### Backend

Create a `.env` file inside the `Backend` directory:

```env
DATABASE_URL="your_postgresql_connection_string"
```

Add any other environment variables required by your local backend configuration.

### Frontend

Create a `.env` file inside the `Frontend` directory:

```env
VITE_API_URL="your_backend_url"
```

For the deployed version:

```env
VITE_API_URL="https://task-manager-two-lake-40.vercel.app"
```

## 💻 Running Locally

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd task-manager
```

### 2. Run the Backend

```bash
cd Backend
npm install
```

Configure your environment variables, then run:

```bash
npm run dev
```

### 3. Run the Frontend

Open another terminal:

```bash
cd Frontend
npm install
npm run dev
```

The frontend will be available through the Vite development server.

## 🔄 Application Flow

```text
User
  ↓
React Frontend
  ↓
Axios
  ↓
Express REST API
  ↓
Validation with Zod
  ↓
Prisma ORM
  ↓
PostgreSQL
```

## 📌 Future Improvements

- User authentication
- User-specific tasks
- Task priorities
- Due dates
- Sorting options
- Better task statistics
- Improved mobile experience
- Additional automated tests

## 👨‍💻 Author

**Omar Salama**

Software Developer | React.js | Next.js | Node.js | TypeScript

LinkedIn: https://www.linkedin.com/

---

⭐ If you find this project useful, feel free to explore the repository and the live demo.
