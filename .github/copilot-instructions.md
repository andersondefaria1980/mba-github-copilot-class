# Copilot Instructions

## Project Overview

This is a full-stack **Customer Registration System** built for educational purposes in the MBA GitHub Copilot class. It provides JWT-authenticated CRUD operations for managing customer records.

## Tech Stack

**Backend:**
- Node.js 18 with Express.js 4
- PostgreSQL 15 (via `pg` driver)
- JWT authentication (`jsonwebtoken`) with password hashing (`bcrypt`)
- Jest + Supertest for testing

**Frontend:**
- React 18 with Vite
- React Router DOM for navigation
- Axios for HTTP requests
- Nginx as the production web server

**Infrastructure:**
- Docker + Docker Compose

## Project Structure

```
backend/
  src/
    server.js               # Express app entry point
    config/database.js      # PostgreSQL connection pool
    routes/auth.js          # POST /auth/login
    routes/customers.js     # GET|POST|PUT /api/customers
    controllers/authController.js
    controllers/customersController.js
    middleware/auth.js      # JWT verification middleware
    utils/validators.js     # Input validation helpers
  tests/                    # Jest unit tests (auth, customers, validators)
  database/init.sql         # DB schema + seed data
frontend/
  src/
    components/             # Login, CustomerList, CustomerForm, ProtectedRoute
    contexts/AuthContext.jsx
    services/api.js         # Axios instance + API calls
    App.jsx
```

## Running the Application

```bash
# Start all services (backend, frontend, PostgreSQL) via Docker Compose
./start.sh

# Stop all services
./stop.sh
```

After starting, the app is available at **http://localhost**.  
Default credentials: `admin` / `pass`

## Running Tests

```bash
cd backend
npm test          # runs Jest with coverage
```

Tests mock the database (`pg` pool) and external modules (bcrypt, jsonwebtoken) — no live database connection is required for unit tests.

## API Endpoints

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| POST | `/auth/login` | Authenticate and receive JWT | No |
| GET | `/api/customers` | List all customers | Yes |
| POST | `/api/customers` | Create a customer | Yes |
| PUT | `/api/customers/:id` | Update a customer | Yes |

## Coding Conventions

- Use **CommonJS** (`require`/`module.exports`) in the backend; **ES Modules** (`import`/`export`) in the frontend.
- Keep controllers thin — validation logic belongs in `utils/validators.js`.
- JWT tokens expire in **24 hours**; the secret is read from `process.env.JWT_SECRET`.
- Environment variables are managed via `.env` files (see `.env.example` in each service directory). Never commit real secrets.
- Write Jest unit tests for new backend controller/utility logic, mocking the database pool and external libraries.
- Frontend components live in `frontend/src/components/`; shared state is managed through React Context (`frontend/src/contexts/`).
