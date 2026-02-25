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

