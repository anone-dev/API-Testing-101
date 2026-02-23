-- UAT Database Setup Script for API Tests
-- Run before API tests to prepare test data

-- Clean up existing test data
DELETE FROM posts WHERE title LIKE 'Test%' OR title LIKE 'UAT%';
DELETE FROM users WHERE email LIKE '%@uat.example.com';

-- Insert test users for API
INSERT INTO users (username, email, name) VALUES
('uatuser1', 'uatuser1@uat.example.com', 'UAT User 1'),
('uatuser2', 'uatuser2@uat.example.com', 'UAT User 2');

-- Insert test posts
INSERT INTO posts (userId, title, body) VALUES
(200, 'UAT Test Post 1', 'UAT test post body 1'),
(200, 'UAT Test Post 2', 'UAT test post body 2');

COMMIT;
