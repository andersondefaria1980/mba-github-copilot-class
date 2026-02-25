# Copilot Instructions

## Project Overview

This is a **Customer Registration System** — a full-stack web application for managing customer data with JWT-based authentication. It is built as a monorepo with separate `backend` and `frontend` directories, orchestrated via Docker Compose.

## Architecture

- **Backend**: Node.js 18 + Express.js 4, REST API, running on port 3001
- **Frontend**: React 18 + Vite, served via Nginx on port 80
- **Database**: PostgreSQL 15 (container `customerdb`)
- **Auth**: JWT tokens (24h expiry), passwords hashed with bcrypt (salt rounds: 10)
- **Infrastructure**: Docker + Docker Compose (see `docker-compose.yml`)

## Repository Structure

```
.
├── backend/
│   ├── src/
│   │   ├── server.js            # Express app entry point
│   │   ├── config/database.js   # pg Pool configuration
│   │   ├── routes/              # auth.js, customers.js
│   │   ├── controllers/         # authController.js, customersController.js
│   │   ├── middleware/auth.js   # JWT verification middleware
│   │   └── utils/validators.js  # Email and field validators
│   ├── tests/                   # Jest tests
│   ├── database/init.sql        # DB schema + seed data
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/          # Login, CustomerList, CustomerForm, ProtectedRoute
│   │   ├── contexts/AuthContext.jsx
│   │   ├── services/api.js      # Axios instance with auth interceptor
│   │   └── App.jsx
│   └── package.json
├── docker-compose.yml
├── start.sh / stop.sh
└── .prompts/                    # AI development prompt sequences
```

## Running the Application

```bash
# Start all services (Docker required)
./start.sh

# Stop all services and remove volumes
./stop.sh
```

Access the app at **http://localhost** after starting. Default credentials: `admin` / `pass`.

## Development

```bash
# Backend (requires PostgreSQL running)
cd backend
npm install
npm run dev      # nodemon watch mode

# Frontend
cd frontend
npm install
npm run dev      # Vite dev server
```

## Testing

```bash
# Backend unit tests (Jest + Supertest)
cd backend
npm test         # runs jest --coverage

# Coverage thresholds: 70% branches, functions, lines, statements
```

Tests are located in `backend/tests/`. Mock `bcrypt`, `jsonwebtoken`, and the `pg` pool when writing unit tests. Use `jest.mock()` for dependencies.

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/login` | No | Authenticate, returns JWT |
| GET | `/api/customers` | JWT | List all customers |
| POST | `/api/customers` | JWT | Create customer |
| PUT | `/api/customers/:id` | JWT | Update customer |

## Coding Conventions

- **Backend**: CommonJS (`require`/`module.exports`), async/await with try/catch, `pool.query()` with parameterized queries (never string interpolation)
- **Frontend**: ES Modules, React functional components with hooks, Vite environment variables prefixed with `VITE_`
- **Error handling**: Return `400` for validation errors, `401`/`403` for auth errors, `404` for not found, `500` for server errors with `{ error: message }` JSON body
- **Validation**: Always validate `name`, `email` (regex), and `phone` before DB operations; use `validators.js`
- **Security**: Never log or expose JWT secrets; use parameterized SQL queries; JWT attached as `Authorization: Bearer <token>` header

## Environment Variables

Copy `.env.example` to `.env` in each service directory before running locally:

- `backend/.env.example` → `DATABASE_URL`, `JWT_SECRET`, `PORT=3001`
- `frontend/.env.example` → `VITE_API_URL=http://localhost:3001`

## Docker

Each service has a multi-stage `Dockerfile`. The `docker-compose.yml` defines:
- `postgres` service with health check
- `api` service depending on healthy `postgres`
- `frontend` service depending on `api`

Nginx proxies `/api/` requests to the backend container (`http://api:3001/api/`).
