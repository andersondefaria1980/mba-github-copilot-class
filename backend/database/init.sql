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
    monthly_income NUMERIC(12,2),
    bank_name VARCHAR(100),
    bank_account_number VARCHAR(50),
    bank_account_holder VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for email lookups
CREATE INDEX idx_customers_email ON customers(email);

-- Seed admin user (password: 'pass')
-- Hash generated with bcrypt salt rounds 10
INSERT INTO users (username, password_hash) 
VALUES ('admin', '$2b$10$djnrXZL2cxDNDs/KM4tM4.SuUYMcZpBjI9/qSf6sGpPkWMiepkXdm');

-- Seed sample customers for testing
INSERT INTO customers (name, birth_date, email, phone, profession, country, state, city, street, number, postal_code) VALUES
('Maria Silva', '1985-03-15', 'maria.silva@email.com', '+55 11 98765-4321', 'Software Engineer', 'Brazil', 'SP', 'São Paulo', 'Av. Paulista', '1000', '01310-100'),
('João Santos', '1990-07-22', 'joao.santos@email.com', '+55 21 99876-5432', 'Data Analyst', 'Brazil', 'RJ', 'Rio de Janeiro', 'Av. Atlântica', '500', '22021-001'),
('Ana Costa', '1988-11-30', 'ana.costa@email.com', '+55 31 97654-3210', 'Product Manager', 'Brazil', 'MG', 'Belo Horizonte', 'Av. Afonso Pena', '1500', '30130-002');
