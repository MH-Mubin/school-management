# School Management API

> A production-ready RESTful API for school management with JWT authentication, role-based access control, and comprehensive student and class management features.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18-green.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18-green.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
  - [Docker Deployment](#docker-deployment)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Students](#students)
  - [Classes](#classes)
- [Database Schema](#database-schema)
- [Seeded Data](#seeded-data)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

The School Management API is a robust backend system designed for educational institutions to manage users, students, and classes efficiently. Built with modern technologies and best practices, it provides secure authentication, role-based authorization, and comprehensive CRUD operations.

**Live Demo:** [Deploy on Railway/Render](#deployment)

## Key Features

### Authentication & Security
- JWT-based authentication with access and refresh tokens
- Role-based access control (Admin, Teacher, Student)
- Password hashing with bcrypt (12 salt rounds)
- Secure HTTP headers with Helmet
- CORS configuration

### Student Management
- Create, read, update, and delete students
- Pagination support for student listings
- Class enrollment tracking
- Age validation (5-25 years)

### Class Management
- Complete CRUD operations for classes
- Student enrollment system
- Class-student relationship tracking
- View all students in a specific class

### Technical Features
- TypeScript for type safety
- Drizzle ORM for database operations
- Database indexing for optimized queries
- DTO validation with class-validator
- Comprehensive error handling
- Docker support for containerization
- Database seeding with sample data

---

---

## Tech Stack

### Backend
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js 4.18
- **Language:** TypeScript 5.3
- **ORM:** Drizzle ORM 0.44

### Database
- **Database:** PostgreSQL 15
- **Driver:** postgres 3.4

### Authentication & Security
- **JWT:** jsonwebtoken 9.0
- **Password Hashing:** bcryptjs 2.4
- **Security Headers:** helmet 7.1
- **CORS:** cors 2.8

### Validation
- **DTOs:** class-validator 0.14
- **Transformers:** class-transformer 0.5

### Development Tools
- **Hot Reload:** ts-node-dev 2.0
- **Linting:** ESLint 8.56
- **Type Checking:** @typescript-eslint

### DevOps
- **Containerization:** Docker & Docker Compose
- **CI/CD Ready:** Multi-stage Dockerfile included

---

## Project Structure

```
school-management/
├── src/
│   ├── controllers/          # Route controllers (auth, student, class)
│   ├── db/
│   │   ├── index.ts         # Database connection
│   │   └── schema.ts        # Drizzle ORM schema definitions
│   ├── dto/                  # Data Transfer Objects with validation
│   │   ├── auth.dto.ts
│   │   ├── student.dto.ts
│   │   └── class.dto.ts
│   ├── middleware/
│   │   ├── auth.ts          # JWT authentication & authorization
│   │   ├── errorHandler.ts # Global error handling
│   │   └── validation.ts   # DTO validation middleware
│   ├── routes/              # API route definitions
│   │   ├── authRoutes.ts
│   │   ├── studentRoutes.ts
│   │   ├── classRoutes.ts
│   │   └── index.ts
│   ├── scripts/
│   │   └── seed.ts          # Database seeding script
│   ├── app.ts               # Express app configuration
│   └── index.ts             # Application entry point
├── .dockerignore
├── .env.example             # Environment variables template
├── .gitignore
├── docker-compose.yml       # Docker orchestration
├── Dockerfile               # Multi-stage Docker build
├── drizzle.config.ts        # Drizzle ORM configuration
├── package.json
├── tsconfig.json
└── README.md
```

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v15 recommended) - [Download](https://www.postgresql.org/download/)
- **Docker Desktop** (optional, for containerized deployment) - [Download](https://www.docker.com/products/docker-desktop/)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/school-management-api.git
cd school-management-api
```

2. **Install dependencies**

```bash
npm install
```

### Environment Configuration

1. **Create environment file**

```bash
cp .env.example .env
```

2. **Configure environment variables**

Open `.env` and update the following:

```env
# Database Connection
DATABASE_URL=postgresql://postgres:password123@localhost:5432/school_management

# JWT Secrets (CHANGE THESE IN PRODUCTION!)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_REFRESH_SECRET=your-super-secret-refresh-key-minimum-32-characters
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Server Configuration
PORT=4000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:4000
```

> **Security Warning:** Always use strong, unique secrets in production environments!

### Database Setup

#### Option 1: Using Docker (Recommended)

```bash
# Start PostgreSQL container
docker-compose up -d postgres

# Wait for PostgreSQL to be ready (10 seconds)
# Then push schema and seed data
npm run db:setup
```

#### Option 2: Local PostgreSQL

1. **Create database**

```bash
psql -U postgres
CREATE DATABASE school_management;
\q
```

2. **Push schema and seed data**

```bash
npm run db:setup
```

This command will:
- Create all database tables with proper relations
- Add indexes for optimized queries
- Seed the database with sample users, classes, and students

---

## Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

The API will be available at: **http://localhost:4000/api**

### Production Mode

1. **Build the application**

```bash
npm run build
```

2. **Start production server**

```bash
npm start
```

### Docker Deployment

#### Full Stack (PostgreSQL + API)

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

#### API Only (Connect to existing PostgreSQL)

```bash
# Build image
docker build -t school-management-api .

# Run container
docker run -d \
  -p 4000:4000 \
  -e DATABASE_URL=postgresql://postgres:password123@host.docker.internal:5432/school_management \
  --name school-api \
  school-management-api
```

**Access the API:** http://localhost:4000/api

---

---

## API Documentation

### Base URL

```
http://localhost:4000/api
```

### Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

#### Endpoints

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| POST | `/auth/signup` | Register new user | No | - |
| POST | `/auth/login` | User login | No | - |
| POST | `/auth/refresh` | Refresh access token | No | - |

**Signup Request:**
```json
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "student"
}
```

**Login Request:**
```json
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@school.com",
  "password": "password123"
}
```

**Login Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "Admin User",
      "email": "admin@school.com",
      "role": "admin"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Students

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/students` | List all students (with pagination) | Admin, Teacher |
| POST | `/students` | Create new student | Admin |
| GET | `/students/:id` | Get student by ID | Admin, Teacher |
| PUT | `/students/:id` | Update student | Admin |
| DELETE | `/students/:id` | Delete student | Admin |

**List Students (with pagination):**
```http
GET /api/students?page=1&limit=10
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Students retrieved successfully",
  "data": {
    "students": [
      {
        "id": 1,
        "name": "Alice Johnson",
        "age": 15,
        "classId": 1,
        "className": "Class A",
        "classSection": "Section A"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 5,
      "totalPages": 1
    }
  }
}
```

**Create Student:**
```json
POST /api/students
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Student",
  "age": 14,
  "classId": 1
}
```

### Classes

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/classes` | List all classes | Admin, Teacher |
| POST | `/classes` | Create new class | Admin |
| GET | `/classes/:id` | Get class by ID | Admin, Teacher |
| PUT | `/classes/:id` | Update class | Admin |
| DELETE | `/classes/:id` | Delete class | Admin |
| POST | `/classes/:id/enroll` | Enroll student in class | Admin, Teacher |
| GET | `/classes/:id/students` | Get all students in class | Admin, Teacher |

**Create Class:**
```json
POST /api/classes
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Mathematics",
  "section": "Grade 10A"
}
```

**Enroll Student:**
```json
POST /api/classes/1/enroll
Authorization: Bearer <token>
Content-Type: application/json

{
  "studentId": 5
}
```

**Get Class Students:**
```http
GET /api/classes/1/students
Authorization: Bearer <token>
```

### Health Check

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/health` | API health status | No |

```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "API is running",
  "data": {
    "status": "healthy",
    "timestamp": "2026-01-20T00:00:00.000Z"
  }
}
```

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role user_role NOT NULL,  -- ENUM: 'admin', 'teacher', 'student'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexed for faster login queries
CREATE INDEX users_email_idx ON users(email);
```

### Classes Table
```sql
CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  section VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Students Table
```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL,
  class_id INTEGER REFERENCES classes(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexed for faster class lookups
CREATE INDEX students_class_id_idx ON students(class_id);
```

### Entity Relationships

```
users (1) ──────────── (N) [User has role]
                            
classes (1) ──────── (N) students
```

---

## Seeded Data

After running `npm run db:seed`, the following data will be available:

### Default Users

| Name | Email | Password | Role |
|------|-------|----------|------|
| Admin User | admin@school.com | password123 | admin |
| John Teacher | teacher@school.com | password123 | teacher |
| Student User | student@school.com | password123 | student |

### Sample Classes

- Class A - Section A
- Class B - Section B  
- Class C - Section C

### Sample Students

5 students distributed across the classes with ages between 10-18 years.

---

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run dev` | Start dev server with hot-reload |
| **Build** | `npm run build` | Compile TypeScript to JavaScript |
| **Start** | `npm start` | Run production server |
| **Database** | `npm run db:push` | Push schema changes to database |
| | `npm run db:generate` | Generate migration files |
| | `npm run db:seed` | Seed database with sample data |
| | `npm run db:setup` | Push schema + seed (complete setup) |
| **Code Quality** | `npm run lint` | Run ESLint |
| | `npm run lint:fix` | Fix ESLint issues automatically |

---

## Deployment

### Deploy to Railway

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

2. **Deploy on Railway**
   - Go to [Railway.app](https://railway.app)
   - Sign in with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Add PostgreSQL database from Railway
   - Set environment variables:
     - `DATABASE_URL` (auto-set by Railway PostgreSQL)
     - `JWT_SECRET`
     - `JWT_REFRESH_SECRET`
     - `NODE_ENV=production`
   - Deploy!

3. **Run database setup**
```bash
# In Railway dashboard, go to Settings → Service → Run command
npm run db:setup
```

Your API will be live at: `https://your-app.railway.app/api`

### Deploy to Render

1. **Push to GitHub** (same as above)

2. **Create Web Service**
   - Go to [Render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Configure:
     - **Build Command:** `npm install && npm run build`
     - **Start Command:** `npm start`
     - **Environment:** Node

3. **Add PostgreSQL**
   - Click "New +" → "PostgreSQL"
   - Copy connection string

4. **Set Environment Variables**
   - Add all variables from `.env.example`
   - Use PostgreSQL connection string for `DATABASE_URL`

5. **Deploy & Setup**
```bash
# After first deploy, run in Render shell:
npm run db:setup
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support

For issues, questions, or contributions, please open an issue on GitHub.

**Built with ❤️ using Express.js, TypeScript, and PostgreSQL**
