-- Cleanup Script
-- Run after tests to clean up test data

DELETE FROM orders WHERE user_id IN (SELECT id FROM users WHERE username LIKE 'test_%');
DELETE FROM users WHERE username LIKE 'test_%';
DELETE FROM products WHERE name LIKE 'Test Product%' OR name LIKE 'UAT Product%';

COMMIT;
