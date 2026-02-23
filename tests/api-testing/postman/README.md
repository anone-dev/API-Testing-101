# Postman Collection & Environment

## Files
- `collection.json` - API test collection
- `environment.sit.json` - SIT environment variables
- `environment.uat.json` - UAT environment variables

## Import to Postman

1. Open Postman
2. Click **Import** button
3. Select files:
   - `collection.json`
   - `environment.sit.json`
   - `environment.uat.json`

## Usage

1. Select environment (SIT or UAT) from dropdown
2. Run collection or individual requests
3. Variables are automatically applied

## Environment Variables

### SIT
- `baseUrl`: https://sit-api.example.com
- `postTitle`: SIT Test Post
- `postBody`: SIT environment test data
- `userId`: 100

### UAT
- `baseUrl`: https://uat-api.example.com
- `postTitle`: UAT Test Post
- `postBody`: UAT environment test data
- `userId`: 200

## Sync with Playwright

Environment variables and test data are aligned with Playwright test fixtures for consistency.
