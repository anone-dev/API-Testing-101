-- UAT Database Setup Script
-- Run before tests to prepare test data

-- Clean up existing test data
DELETE FROM users WHERE username LIKE 'test_%';
DELETE FROM orders WHERE user_id IN (SELECT id FROM users WHERE username LIKE 'test_%');

-- Insert test users
INSERT INTO users (username, password, email, role) VALUES
('test_user1', 'password123', 'testuser1@uat.example.com', 'user'),
('test_admin', 'admin123', 'testadmin@uat.example.com', 'admin');

-- Insert test data
INSERT INTO products (name, price, stock) VALUES
('UAT Product 1', 150.00, 40),
('UAT Product 2', 250.00, 25);

COMMIT;
