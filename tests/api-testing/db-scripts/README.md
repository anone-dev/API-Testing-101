# Database Scripts for API Tests

SQL scripts for setting up and cleaning test data for API testing.

## Files

- `setup.sit.sql` - SIT environment setup script
- `setup.uat.sql` - UAT environment setup script
- `cleanup.sql` - Cleanup script (environment-agnostic)

## Usage

### Manual Execution

```bash
# SIT
mysql -h localhost -u root -p testdb < db-scripts/setup.sit.sql

# UAT
mysql -h localhost -u root -p testdb < db-scripts/setup.uat.sql

# Cleanup
mysql -h localhost -u root -p testdb < db-scripts/cleanup.sql
```

### Programmatic Execution

```typescript
import { DatabaseHelper } from '../helpers/databaseHelper';

test.beforeAll(async () => {
  const db = new DatabaseHelper();
  await db.setupDatabase('sit'); // or 'uat'
});

test.afterAll(async () => {
  const db = new DatabaseHelper();
  await db.cleanupDatabase();
});
```

## Environment Variables

Add to `.env` or `.env.uat`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=testdb
```

## Best Practices

1. Always clean up before inserting test data
2. Use prefixes for test data (e.g., `Test`, `SIT`, `UAT`)
3. Keep scripts idempotent (can run multiple times)
4. Commit transactions explicitly
5. Align test data with fixtures/test-data files
