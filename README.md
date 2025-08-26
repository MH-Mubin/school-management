# School Management API

A comprehensive School Management System API built with Express.js, TypeScript, PostgreSQL, and Drizzle ORM.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Admin, Teacher, and Student roles
- **Student Management**: CRUD operations with pagination
- **Class Management**: Create and manage classes with student enrollment
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Request validation using class-validator
- **Security**: Helmet, CORS, and bcrypt for password hashing
- **Docker Support**: Complete containerization setup

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT (Access & Refresh tokens)
- **Validation**: class-validator, class-transformer
- **Security**: bcryptjs, helmet, cors
- **Development**: ts-node-dev, ESLint
- **Testing**: Jest
- **Containerization**: Docker & Docker Compose

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

### Database Setup

#### Option 1: Local PostgreSQL Installation

1. **Install PostgreSQL**
   - Download from https://www.postgresql.org/download/
   - Install with default settings
   - Remember the password you set for the `postgres` user

2. **Create Database**
   ```sql
   -- Connect to PostgreSQL as postgres user
   CREATE DATABASE school_management;
   ```

#### Option 2: Using Docker

```bash
# Run PostgreSQL in Docker
docker run --name postgres-school \
  -e POSTGRES_PASSWORD=password123 \
  -e POSTGRES_DB=school_management \
  -p 5432:5432 \
  -d postgres:13
```

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd school-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   **Update the `.env` file with your database credentials:**
   ```env
   # For local PostgreSQL installation
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/school_management
   
   # For Docker PostgreSQL
   DATABASE_URL=postgresql://postgres:password123@localhost:5432/school_management
   
   # JWT Secrets (change these!)
   JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
   JWT_REFRESH_SECRET=your-super-secret-refresh-key-here-change-this-in-production
   ```

4. **Database Setup**
   ```bash
   # Generate and run migrations
   npm run db:generate
   npm run db:push
   
   # Seed the database with sample data
   npm run db:seed
   
   # Or run setup (push + seed) in one command
   npm run db:setup
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:4000`

## Docker Setup

1. **Using Docker Compose**
   ```bash
   docker-compose up -d
   ```

This will start both the API server and PostgreSQL database.

## Troubleshooting

### Database Connection Issues

If you get `password authentication failed` error:

1. **Check your PostgreSQL credentials**
   ```bash
   # Test connection
   psql -h localhost -U postgres -d school_management
   ```

2. **Update .env file with correct credentials**
   ```env
   DATABASE_URL=postgresql://postgres:your_actual_password@localhost:5432/school_management
   ```

3. **Ensure PostgreSQL is running**
   ```bash
   # Windows
   net start postgresql-x64-13
   
   # macOS
   brew services start postgresql
   
   # Linux
   sudo systemctl start postgresql
   ```

### Common Issues

- **Port 5432 already in use**: Change PostgreSQL port or stop other PostgreSQL instances
- **Database doesn't exist**: Create the database manually using `CREATE DATABASE school_management;`
- **Permission denied**: Ensure your PostgreSQL user has proper permissions

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token

### Students
- `GET /api/students` - List students (Admin/Teacher)
- `POST /api/students` - Create student (Admin)
- `GET /api/students/:id` - Get student details (Admin/Teacher)
- `PUT /api/students/:id` - Update student (Admin)
- `DELETE /api/students/:id` - Delete student (Admin)

### Classes
- `GET /api/classes` - List classes (Admin/Teacher)
- `POST /api/classes` - Create class (Admin)
- `GET /api/classes/:id` - Get class details (Admin/Teacher)
- `PUT /api/classes/:id` - Update class (Admin)
- `DELETE /api/classes/:id` - Delete class (Admin)
- `POST /api/classes/:id/enroll` - Enroll student (Admin/Teacher)
- `GET /api/classes/:id/students` - Get class students (Admin/Teacher)

### Health Check
- `GET /api/health` - API health status

## Default Users (After Seeding)

| Email | Password | Role |
|-------|----------|------|
| admin@school.com | password123 | Admin |
| teacher@school.com | password123 | Teacher |
| jane.teacher@school.com | password123 | Teacher |
| student@school.com | password123 | Student |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Push schema changes to database (alias for db:push)
- `npm run db:seed` - Seed database with sample data
- `npm run db:setup` - Run db:push and db:seed in sequence
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Project Structure

```
src/
├── controllers/          # Route controllers
├── db/                  # Database configuration and schema
├── dto/                 # Data Transfer Objects
├── middleware/          # Custom middleware
├── routes/              # API routes
├── scripts/             # Database scripts
└── __tests__/           # Test files
```

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://postgres:password123@localhost:5432/school_management

# JWT
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here-change-this-in-production
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Server
PORT=4000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:4000
```

## Testing

Run the test suite:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
