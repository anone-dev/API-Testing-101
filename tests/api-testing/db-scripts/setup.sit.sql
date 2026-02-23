-- SIT Database Setup Script for API Tests
-- Run before API tests to prepare test data

-- Clean up existing test data
DELETE FROM posts WHERE title LIKE 'Test%' OR title LIKE 'SIT%';
DELETE FROM users WHERE email LIKE '%@sit.example.com';

-- Insert test users for API
INSERT INTO users (username, email, name) VALUES
('situser1', 'situser1@sit.example.com', 'SIT User 1'),
('situser2', 'situser2@sit.example.com', 'SIT User 2');

-- Insert test posts
INSERT INTO posts (userId, title, body) VALUES
(100, 'SIT Test Post 1', 'SIT test post body 1'),
(100, 'SIT Test Post 2', 'SIT test post body 2');

COMMIT;
