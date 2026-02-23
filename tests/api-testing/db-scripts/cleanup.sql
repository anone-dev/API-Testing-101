-- Cleanup Script for API Tests
-- Run after tests to clean up test data

DELETE FROM posts WHERE title LIKE 'Test%' OR title LIKE 'SIT%' OR title LIKE 'UAT%';
DELETE FROM users WHERE email LIKE '%@sit.example.com' OR email LIKE '%@uat.example.com';

COMMIT;
