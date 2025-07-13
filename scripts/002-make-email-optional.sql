-- Make email field optional in users table
ALTER TABLE users ALTER COLUMN email DROP NOT NULL;