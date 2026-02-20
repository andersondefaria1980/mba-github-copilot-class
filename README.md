# Customer Registration System

Full-stack customer management system with JWT authentication, built with Node.js + Express, PostgreSQL, React and Docker.

## 📋 Prerequisites

- Docker (version 20.10+)
- Docker Compose (version 2.0+)

## 🚀 Quick Start

```bash
# Start application
./start.sh

# Stop application
./stop.sh
```

After starting, access: **http://localhost**

## 🔐 Default Credentials

- **Username:** admin
- **Password:** pass

## 📁 Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── customers.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── customersController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── utils/
│   │       └── validators.js
│   ├── tests/
│   ├── database/
│   │   └── init.sql
│   ├── Dockerfile
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── CustomerList.jsx
│   │   │   ├── CustomerForm.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│   ├── nginx.conf
│   ├── Dockerfile
│   ├── .env.example
│   └── package.json
├── docker-compose.yml
├── start.sh
├── stop.sh
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /auth/login` - Authenticate user

### Customers
- `GET /api/customers` - List all customers
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update existing customer

## 🤖 AI Development Prompts

Execute the prompts below **sequentially** to build the complete project:

---

### **Prompt 1 - Initial Structure and Scripts:**
```
Create monorepo structure: /backend and /frontend folders. Create .gitignore at root including node_modules, .env, dist, .DS_Store. Create start.sh script that: checks if Docker is installed (command -v docker), runs 'docker-compose down -v', 'docker-compose up --build -d', waits 10 seconds (sleep 10), displays 'Application started! Access http://localhost'. Create stop.sh script that runs 'docker-compose down -v' and displays 'Application stopped and volumes removed'. Make both executable with chmod +x start.sh stop.sh.
```

---

### **Prompt 2 - Backend Setup:**
```
Create /backend/package.json with dependencies: express@^4.18.0, pg@^8.11.0, bcrypt@^5.1.0, jsonwebtoken@^9.0.0, dotenv@^16.0.0, cors@^2.8.5. DevDependencies: nodemon@^3.0.0, jest@^29.0.0, supertest@^6.3.0. Scripts: 'start': 'node src/server.js', 'dev': 'nodemon src/server.js', 'test': 'jest --coverage'. Create structure: /src/server.js, /src/config/database.js, /src/routes/, /src/controllers/, /src/middleware/, /src/utils/. Create /backend/.env.example with DATABASE_URL=postgresql://admin:admin123@postgres:5432/customersdb, JWT_SECRET=change-this-secret-key, PORT=3001.
```

---

### **Prompt 3 - Database and Schema:**
```
Create /backend/database/init.sql. CREATE TABLE users (id SERIAL PRIMARY KEY, username VARCHAR(50) UNIQUE NOT NULL, password_hash VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP). CREATE TABLE customers (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, birth_date DATE, email VARCHAR(100) UNIQUE NOT NULL, phone VARCHAR(20) NOT NULL, profession VARCHAR(100), country VARCHAR(50), state VARCHAR(50), city VARCHAR(100), street VARCHAR(150), number VARCHAR(10), postal_code VARCHAR(20), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP). CREATE INDEX idx_customers_email ON customers(email). Seed: INSERT INTO users (username, password_hash) VALUES ('admin', '$2b$10$salted.hash.for.pass') - use real bcrypt with salt 10 for password 'pass'.
```

---

### **Prompt 4 - Backend Dockerfile:**
```
Create /backend/Dockerfile multi-stage. FROM node:18-alpine AS build, WORKDIR /app, COPY package*.json ./, RUN npm ci --only=production, COPY src ./src. FROM node:18-alpine, WORKDIR /app, COPY --from=build /app/node_modules ./node_modules, COPY --from=build /app/src ./src, COPY package*.json ./, EXPOSE 3001, USER node, CMD ['node', 'src/server.js']. Create /backend/.dockerignore with node_modules, .env, npm-debug.log, .git, tests, coverage, *.md.
```

---

### **Prompt 5 - JWT Authentication:**
```
Implement /backend/src/routes/auth.js with router.post('/login', authController.login). Controller /src/controllers/authController.js: async function login(req, res) that receives {username, password}, queries SELECT * FROM users WHERE username=$1, validates with bcrypt.compare(password, user.password_hash), generates JWT token with jwt.sign({userId: user.id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '24h'}), returns res.json({token, username}). Errors: 400 missing fields, 401 invalid credentials. Middleware /src/middleware/auth.js: extracts token from req.headers.authorization (Bearer token), verifies with jwt.verify, attaches decoded to req.user, next(). Errors: 401 token missing, 403 invalid token.
```

---

### **Prompt 6 - CRUD Customers API:**
```
Implement /backend/src/routes/customers.js with auth middleware protection. GET / lists all, POST / creates, PUT /:id updates. Controller /src/controllers/customersController.js with pg pool: getAll executes SELECT * FROM customers ORDER BY name ASC, create validates fields (name, email, phone required), executes INSERT RETURNING *, returns 201. update executes UPDATE WHERE id=$1 RETURNING *, returns 404 if rowCount=0. Validators /src/utils/validators.js: validateEmail(email) regex /^[^\s@]+@[^\s@]+\.[^\s@]+$/, validateCustomer(data) checks required fields exist. Error handling try/catch returns res.status(500).json({error: message}).
```

---

### **Prompt 7 - Backend Tests with Jest:**
```
Configure Jest /backend/jest.config.js: module.exports = {testEnvironment: 'node', coverageThreshold: {global: {branches: 70, functions: 70, lines: 70, statements: 70}}, testMatch: ['**/tests/**/*.test.js']}. Create /backend/tests/auth.test.js: mock bcrypt and jwt, test authController.login with valid credentials (returns token), invalid (401), missing fields (400). Create /backend/tests/customers.test.js: mock pool pg, test getAll returns array, create with valid data (201), invalid email (400), update existing (200) and non-existing (404). Create /backend/tests/validators.test.js: test validateEmail with valid/invalid emails. Use jest.mock for dependencies.
```

---

### **Prompt 8 - Complete Docker Compose:**
```
Create /docker-compose.yml version '3.8'. Networks: app-network. Volumes: pgdata. Services: (1) postgres: image postgres:15-alpine, container_name customerdb, restart always, environment POSTGRES_DB=customersdb POSTGRES_USER=admin POSTGRES_PASSWORD=admin123, volumes ['./backend/database/init.sql:/docker-entrypoint-initdb.d/init.sql', 'pgdata:/var/lib/postgresql/data'], networks [app-network], healthcheck test pg_isready interval 10s timeout 5s retries 5. (2) api: build ./backend, container_name customer-api, restart always, ports ['3001:3001'], environment DATABASE_URL JWT_SECRET=your-secret-key-here PORT=3001, depends_on postgres condition service_healthy, networks [app-network]. (3) frontend: build ./frontend, container_name customer-frontend, restart always, ports ['80:80'], depends_on [api], networks [app-network].
```

---

### **Prompt 9 - Frontend React Setup:**
```
Create React app in /frontend by running 'npm create vite@latest . -- --template react'. Install dependencies: axios@^1.6.0, react-router-dom@^6.20.0. Structure: /src/components/Login.jsx, /src/components/CustomerList.jsx, /src/components/CustomerForm.jsx, /src/components/ProtectedRoute.jsx, /src/contexts/AuthContext.jsx, /src/services/api.js, /src/App.jsx. Create /frontend/.env.example with VITE_API_URL=http://localhost:3001. AuthContext: createContext, provider with state [token, user], functions login(token, username) saves to localStorage, logout clears localStorage, useEffect loads token on mount. api.js: axios.create with baseURL process.env.VITE_API_URL, interceptor request adds Authorization Bearer token from localStorage.
```

---

### **Prompt 10 - Complete React Components:**
```
Implement Login.jsx: useState [username, password], handleSubmit calls POST /auth/login via api.js, success calls AuthContext.login and navigate('/'), error displays message. CustomerList.jsx: useEffect fetches GET /api/customers, useState [customers, loading, error], renders table with columns name, email, phone, birth_date, profession, address (formatted), button 'New Customer' (navigate '/customers/new'), button 'Edit' per row (navigate '/customers/edit/:id'). CustomerForm.jsx: useState for all fields, receives via useParams if edit mode, useEffect fetches data if id exists, handleSubmit validates email regex frontend, sends POST /api/customers (create) or PUT /api/customers/:id (edit), navigate('/') after success. ProtectedRoute: checks AuthContext.token, if token exists renders {children}, else <Navigate to='/login' />.
```

---

### **Prompt 11 - Frontend Docker and Nginx:**
```
Create /frontend/Dockerfile multi-stage. Stage 1: FROM node:18-alpine AS build, WORKDIR /app, COPY package*.json ./, RUN npm install, COPY . ., ARG VITE_API_URL=http://localhost:3001, ENV VITE_API_URL=$VITE_API_URL, RUN npm run build. Stage 2: FROM nginx:alpine, COPY --from=build /app/dist /usr/share/nginx/html, COPY nginx.conf /etc/nginx/conf.d/default.conf, EXPOSE 80, CMD ['nginx', '-g', 'daemon off;']. Create /frontend/nginx.conf: server {listen 80; location / {root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html;} location /api/ {proxy_pass http://api:3001/api/; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr;}}. Create /frontend/.dockerignore with node_modules, dist, .env, .git.
```

---

## 📝 Customer Data

The system manages the following fields:

- Name
- Birth Date
- Email (with validation)
- Phone
- Profession
- Complete Address:
  - Country
  - State
  - City
  - Street
  - Number
  - Postal Code

## 🧪 Run Tests

```bash
cd backend
npm test
```

## 📦 Technologies Used

**Backend:**
- Node.js 18
- Express.js 4
- PostgreSQL 15
- JWT (jsonwebtoken)
- bcrypt
- Jest + Supertest

**Frontend:**
- React 18
- Vite
- React Router DOM
- Axios
- Nginx

**DevOps:**
- Docker
- Docker Compose

## 📄 License

This project was developed for educational purposes in the MBA GitHub Copilot class.

