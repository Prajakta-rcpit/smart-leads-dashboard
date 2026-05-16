# Smart Leads Dashboard

A full-stack Lead Management Dashboard built with the MERN stack (MongoDB, Express.js, React.js, Node.js) using TypeScript throughout.

## Tech Stack

### Frontend
- React.js with TypeScript
- TailwindCSS
- React Query (@tanstack/react-query)
- React Router DOM
- Axios
- Vite

### Backend
- Node.js with TypeScript
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Zod Validation
- json2csv

## Features

- **JWT Authentication** — Register, Login, Protected Routes, bcrypt password hashing
- **Lead Management (CRUD)** — Create, Read, Update, Delete leads
- **Advanced Filtering** — Filter by Status, Source, Search by Name/Email, Sort by Latest/Oldest (all combinable)
- **Backend Pagination** — 10 records per page with skip/limit and metadata
- **Debounced Search** — 300ms debounce on search input
- **CSV Export** — Export filtered leads to CSV file
- **Role-Based Access Control** — Admin (full access) and Sales User (read + create only)
- **Dark Mode** — Toggle with localStorage persistence
- **Responsive Design** — Mobile-friendly with collapsible sidebar
- **Docker Setup** — Multi-stage Dockerfiles + docker-compose

## Folder Structure

```
smart-leads-dashboard/
├── client/                    # React frontend
│   ├── src/
│   │   ├── api/               # Axios instance and API calls
│   │   ├── components/
│   │   │   ├── layout/        # DashboardLayout, Header, Sidebar, ProtectedRoute
│   │   │   ├── leads/         # LeadTable, LeadForm, LeadFilters, LeadDetail
│   │   │   └── ui/            # Button, Input, Select, Modal, Pagination, Badge, ThemeToggle
│   │   ├── context/           # AuthContext, ThemeContext
│   │   ├── hooks/             # useLeads, useDebounce
│   │   ├── pages/             # Login, Register, Dashboard, LeadDetails
│   │   └── types/             # TypeScript interfaces and type constants
│   ├── Dockerfile
│   └── nginx.conf
├── server/                    # Express backend
│   ├── src/
│   │   ├── config/            # Database connection, environment variables
│   │   ├── controllers/       # Route handlers
│   │   ├── middleware/        # Auth, error handler, validation
│   │   ├── models/            # Mongoose schemas (User, Lead)
│   │   ├── routes/            # Express route definitions
│   │   ├── services/          # Business logic layer
│   │   ├── types/             # TypeScript interfaces and enums
│   │   ├── utils/             # AppError, API response helper
│   │   └── validators/        # Zod validation schemas
│   └── Dockerfile
├── docker-compose.yml
└── .env.example
```

## Setup Instructions

### Prerequisites
- Node.js >= 18
- MongoDB Atlas account (or local MongoDB)
- npm

### Environment Variables

Create a `.env` file in the `server/` directory:

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/smart-leads` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key_here` |
| `JWT_EXPIRES_IN` | Token expiration time | `24h` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:5173` |

Create a `.env` file in the `client/` directory (optional):

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | API base URL | `/api` |

### Run Without Docker

**Server:**
```bash
cd server
cp .env.example .env    # Edit with your values
npm install
npm run dev
```

**Client:**
```bash
cd client
npm install
npm run dev
```

The client runs at `http://localhost:5173` and the server at `http://localhost:5000`.

### Run With Docker

```bash
# Set environment variables
cp .env.example .env    # Edit MONGO_URI, JWT_SECRET

# Build and start
docker-compose up --build
```

The client will be available at `http://localhost` and the API at `http://localhost:5000`.

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Response Format
All endpoints return a consistent JSON format:
```json
{
  "success": true,
  "message": "Description",
  "data": {},
  "pagination": { "page": 1, "limit": 10, "total": 50, "totalPages": 5 }
}
```

---

### Auth Endpoints

#### POST `/api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "admin"
}
```
| Field | Type | Required | Notes |
|---|---|---|---|
| name | string | Yes | Min 2 characters |
| email | string | Yes | Valid email |
| password | string | Yes | Min 6 characters |
| role | string | No | `admin` or `sales` (default: `sales`) |

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": { "id": "...", "name": "John Doe", "email": "john@example.com", "role": "admin" }
  }
}
```

#### POST `/api/auth/login`
Login with existing credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": { "id": "...", "name": "John Doe", "email": "john@example.com", "role": "admin" }
  }
}
```

#### GET `/api/auth/me`
Get current authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "User profile retrieved",
  "data": { "_id": "...", "name": "John Doe", "email": "john@example.com", "role": "admin" }
}
```

---

### Lead Endpoints

All lead endpoints require `Authorization: Bearer <token>` header.

#### GET `/api/leads`
List leads with filters, search, sorting, and pagination.

**Query Parameters:**
| Param | Type | Default | Description |
|---|---|---|---|
| status | string | — | Filter: `New`, `Contacted`, `Qualified`, `Lost` |
| source | string | — | Filter: `Website`, `Instagram`, `Referral` |
| search | string | — | Search name or email (case-insensitive) |
| sortBy | string | `createdAt` | Field to sort by |
| sortOrder | string | `desc` | `asc` or `desc` |
| page | number | `1` | Page number |
| limit | number | `10` | Records per page |

**Example:** `GET /api/leads?status=Qualified&source=Instagram&search=Rahul&page=1`

**Response (200):**
```json
{
  "success": true,
  "message": "Leads retrieved successfully",
  "data": [
    {
      "_id": "...",
      "name": "Rahul Sharma",
      "email": "rahul@example.com",
      "status": "Qualified",
      "source": "Instagram",
      "createdAt": "2026-05-15T10:30:00.000Z"
    }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 1, "totalPages": 1 }
}
```

#### GET `/api/leads/:id`
Get a single lead by ID.

**Response (200):**
```json
{
  "success": true,
  "message": "Lead retrieved successfully",
  "data": { "_id": "...", "name": "...", "email": "...", "status": "...", "source": "...", "createdAt": "..." }
}
```

#### POST `/api/leads`
Create a new lead. Accessible by Admin and Sales users.

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "status": "New",
  "source": "Website"
}
```
| Field | Type | Required | Notes |
|---|---|---|---|
| name | string | Yes | Min 2 characters |
| email | string | Yes | Valid email |
| status | string | No | Default: `New` |
| source | string | Yes | `Website`, `Instagram`, or `Referral` |

**Response (201):**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": { "_id": "...", "name": "Jane Smith", ... }
}
```

#### PUT `/api/leads/:id`
Update a lead. **Admin only.**

**Request Body:** (all fields optional)
```json
{
  "status": "Contacted"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Lead updated successfully",
  "data": { "_id": "...", ... }
}
```

#### DELETE `/api/leads/:id`
Delete a lead. **Admin only.**

**Response (200):**
```json
{
  "success": true,
  "message": "Lead deleted successfully"
}
```

#### GET `/api/leads/export/csv`
Export leads as CSV. Supports the same filter query parameters as `GET /api/leads` (except pagination).

**Response:** CSV file download (`Content-Type: text/csv`)

---

### Health Check

#### GET `/api/health`
**Response (200):**
```json
{
  "success": true,
  "message": "Server is running"
}
```

## Role-Based Access Control

| Action | Admin | Sales User |
|---|---|---|
| View Leads | ✅ | ✅ |
| View Lead Details | ✅ | ✅ |
| Create Lead | ✅ | ✅ |
| Update Lead | ✅ | ❌ |
| Delete Lead | ✅ | ❌ |
| Export CSV | ✅ | ✅ |
