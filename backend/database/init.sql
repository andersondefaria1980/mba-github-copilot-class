-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create customers table
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birth_date DATE,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    profession VARCHAR(100),
    country VARCHAR(50),
    state VARCHAR(50),
    city VARCHAR(100),
    street VARCHAR(150),
    number VARCHAR(10),
    postal_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for email lookups
CREATE INDEX idx_customers_email ON customers(email);

-- Seed admin user (password: 'pass')
-- Hash generated with bcrypt salt rounds 10
INSERT INTO users (username, password_hash) 
VALUES ('admin', '$2b$10$djnrXZL2cxDNDs/KM4tM4.SuUYMcZpBjI9/qSf6sGpPkWMiepkXdm');
