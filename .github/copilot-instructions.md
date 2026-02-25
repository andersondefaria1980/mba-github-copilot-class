# GitHub Copilot Instructions for Customer Registration System

This is a full-stack customer management system with JWT authentication built with Node.js, Express, PostgreSQL, React, and Docker. Please follow these guidelines when contributing to this project.

## Project Overview

A monorepo containing:
- **Backend**: Node.js + Express REST API with JWT authentication
- **Frontend**: React 18 + Vite SPA with routing and auth context
- **Database**: PostgreSQL 15 with initialization scripts
- **DevOps**: Docker Compose orchestration for local development

## Technology Stack

### Backend
- Node.js 18 (Alpine)
- Express.js 4
- PostgreSQL client (pg)
- bcrypt for password hashing
- jsonwebtoken for JWT authentication
- Jest + Supertest for testing

### Frontend
- React 18
- Vite as build tool
- React Router DOM for navigation
- Axios for API calls
- Nginx for production serving

### Infrastructure
- Docker & Docker Compose
- Multi-stage Docker builds for optimization
- Persistent volumes for database data

## Development Scripts

### Starting the Application
```bash
./start.sh  # Builds and starts all containers
```

### Stopping the Application
```bash
./stop.sh   # Stops containers (preserves volumes)
```

### Running Tests
```bash
cd backend
npm test              # Run tests with coverage
npm run test:watch    # Run tests in watch mode
```

## Code Standards

### Backend Standards

#### Required Before Each Commit
- Ensure all tests pass with `npm test`
- Maintain Jest coverage thresholds (70% minimum)
- Follow existing code structure and patterns

#### API Conventions
- Use async/await for all database operations
- Wrap database operations in try/catch blocks
- Return appropriate HTTP status codes (200, 201, 400, 401, 404, 500)
- Use middleware for authentication on protected routes
- Validate all user inputs before processing

#### Error Handling
- Always return JSON responses with error messages
- Use appropriate HTTP status codes
- Log errors for debugging but don't expose internal details to clients

#### Database Best Practices
- Use parameterized queries to prevent SQL injection
- Return RETURNING * on INSERT/UPDATE operations
- Handle connection pool errors gracefully
- Use transactions for multi-step operations

### Frontend Standards

#### Component Structure
- Use functional components with hooks
- Keep components focused on single responsibility
- Extract reusable logic into custom hooks
- Use Context API for global state (auth)

#### Styling
- Use CSS modules or component-specific CSS files
- Follow existing naming conventions
- Maintain responsive design principles

#### API Integration
- Use axios interceptors for auth token injection
- Handle loading and error states
- Provide user feedback for all async operations
- Store tokens in localStorage

### Testing Standards

#### Unit Tests (Backend)
- Mock external dependencies (pg pool, bcrypt, jwt)
- Use describe/test blocks for organization
- Test both success and error scenarios
- Maintain 70% coverage threshold
- Test files should mirror source structure

#### Test Naming
- Use descriptive test names explaining what is being tested
- Follow pattern: `should [expected behavior] when [condition]`

## Repository Structure

```
├── backend/
│   ├── src/
│   │   ├── server.js           # Express app entry point
│   │   ├── config/
│   │   │   └── database.js     # PostgreSQL connection pool
│   │   ├── routes/
│   │   │   ├── auth.js         # Authentication endpoints
│   │   │   └── customers.js    # Customer CRUD endpoints
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── customersController.js
│   │   ├── middleware/
│   │   │   └── auth.js         # JWT verification middleware
│   │   └── utils/
│   │       └── validators.js   # Input validation functions
│   ├── tests/                  # Jest unit tests
│   ├── database/
│   │   └── init.sql            # Database schema and seed data
│   ├── Dockerfile              # Multi-stage backend build
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx             # Main app component with routing
│   │   ├── components/         # React components
│   │   ├── contexts/           # React contexts (AuthContext)
│   │   └── services/           # API service layer
│   ├── nginx.conf              # Nginx configuration for SPA
│   ├── Dockerfile              # Multi-stage frontend build
│   └── package.json
├── docker-compose.yml          # Container orchestration
├── start.sh                    # Startup script
├── stop.sh                     # Shutdown script
└── .prompts/                   # AI prompts for building project
```

## Key Guidelines

### When Working on Backend Tasks
1. Ensure database connection pool is properly used
2. Add appropriate middleware to routes (auth, validation)
3. Write corresponding unit tests with mocks
4. Update API endpoints documentation if needed
5. Maintain RESTful conventions

### When Working on Frontend Tasks
1. Use the AuthContext for authentication state
2. Implement error boundaries for error handling
3. Maintain consistent component structure
4. Update routing in App.jsx if adding new pages
5. Ensure responsive design works on mobile

### When Working on Database Tasks
1. Update init.sql for schema changes
2. Consider migration strategy for existing data
3. Add indexes for frequently queried fields
4. Seed sample data for testing

### When Working on Docker/Infrastructure
1. Optimize Docker images for size
2. Use multi-stage builds
3. Ensure health checks are configured
4. Test locally with docker-compose before committing

## Environment Variables

### Backend (.env)
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT signing
- `PORT`: Server port (default: 3001)

### Frontend (.env)
- `VITE_API_URL`: Backend API URL (default: http://localhost:3001)

## Default Credentials for Testing
- Username: `admin`
- Password: `pass`

## Pre-seeded Test Data
The database initializes with 3 sample customers:
- Maria Silva (São Paulo)
- João Santos (Rio de Janeiro)
- Ana Costa (Belo Horizonte)

## Common Tasks

### Adding a New API Endpoint
1. Create route in `backend/src/routes/`
2. Implement controller in `backend/src/controllers/`
3. Add authentication middleware if needed
4. Write unit tests in `backend/tests/`
5. Update API documentation in README

### Adding a New React Component
1. Create component in `frontend/src/components/`
2. Create accompanying CSS file
3. Export from appropriate location
4. Update routing in App.jsx if it's a page
5. Consider adding to ProtectedRoute if authentication required

### Modifying Database Schema
1. Update `backend/database/init.sql`
2. Update corresponding controller logic
3. Update validators if needed
4. Add/update tests
5. Consider data migration needs

## Security Considerations
- Never commit .env files
- Always validate and sanitize user inputs
- Use parameterized queries to prevent SQL injection
- Implement rate limiting for production
- Keep dependencies updated
- Use HTTPS in production
- Implement proper CORS configuration

## Performance Considerations
- Use connection pooling for database
- Implement pagination for large datasets
- Optimize Docker image sizes
- Use indexes for database queries
- Minimize bundle sizes in frontend

## Notes for AI Agents
- This is an educational project for MBA GitHub Copilot class
- Focus on code clarity and learning over optimization
- Follow established patterns in the codebase
- When in doubt, prioritize security and best practices
- Test thoroughly before creating pull requests
