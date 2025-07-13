-- Create the database schema for Sky Insurance

-- Users table to store customer information
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cars table to store vehicle information
CREATE TABLE IF NOT EXISTS cars (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    market_price DECIMAL(12,2) NOT NULL,
    condition VARCHAR(10) NOT NULL CHECK (condition IN ('new', 'used')),
    fuel_type VARCHAR(20) NOT NULL CHECK (fuel_type IN ('fuel', 'electric')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Documents table to store uploaded files
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insurance quotes table to store generated quotes
CREATE TABLE IF NOT EXISTS insurance_quotes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    car_id INTEGER REFERENCES cars(id) ON DELETE CASCADE,
    company_name VARCHAR(100) NOT NULL,
    policy_type VARCHAR(100),
    premium_rate DECIMAL(5,4) NOT NULL,
    annual_premium DECIMAL(12,2) NOT NULL,
    features TEXT,
    conditions TEXT,
    selected BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_cars_user_id ON cars(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_quotes_user_id ON insurance_quotes(user_id);
