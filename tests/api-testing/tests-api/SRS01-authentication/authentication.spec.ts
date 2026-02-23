import { test, expect } from '@playwright/test';

test.describe('[PBI-12556] FR-02: Authentication', () => {
  // @Important: Critical
  // @Scenario: Success
  test('[TC-12571] POST /api-clients register success', async ({ request }) => {
    const url = '/api-clients';
    const requestBody = { clientEmail: `reg_${Date.now()}@example.com`, clientName: 'Test User' };

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'POST');
    console.log('URL:', url);
    console.log('Body:', requestBody);

    const response = await request.post(url, { data: requestBody });
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body:', responseBody);

    expect(response.status()).toBe(201);
    expect(typeof responseBody.accessToken).toBe('string');
    expect(responseBody.accessToken.length).toBe(64);
    expect(responseBody.accessToken).not.toBe('');
  });

  // @Important: High
  // @Scenario: Alternative
  test('[TC-12572] POST /api-clients duplicate email returns 409', async ({ request }) => {
    const url = '/api-clients';
    const requestBody = { clientEmail: 'dup@example.com', clientName: 'Dup User' };

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'POST');
    console.log('URL:', url);
    console.log('Body:', requestBody);

    await request.post(url, { data: requestBody });
    const response = await request.post(url, { data: requestBody });
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body:', responseBody);

    expect(response.status()).toBe(409);
    expect(responseBody.error).toBe('API client already registered. Try a different email.');
  });

  // @Important: Critical
  // @Scenario: Alternative
  test('[TC-12573] Protected endpoint without token returns 401', async ({ request }) => {
    const url = '/orders';

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'GET');
    console.log('URL:', url);
    console.log('Headers:', '(no Authorization)');

    const response = await request.get(url);
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body:', responseBody);

    expect(response.status()).toBe(401);
    expect(responseBody.error).toBe('Missing Authorization header.');
  });

  // @Important: High
  // @Scenario: Alternative
  test('[TC-12574] Protected endpoint with invalid token returns 401', async ({ request }) => {
    const url = '/orders';
    const headers = { Authorization: 'Bearer invalid_token_xyz' };

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'GET');
    console.log('URL:', url);
    console.log('Headers:', headers);

    const response = await request.get(url, { headers });
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body:', responseBody);

    expect(response.status()).toBe(401);
    expect(responseBody).toHaveProperty('error');
  });
});
