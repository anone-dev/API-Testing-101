import { test, expect } from '@playwright/test';

test.describe('[PBI-12555] FR-01: Health Check', () => {
  // @Important: Critical
  // @Scenario: Success
  test('[TC-12569] GET /status returns OK', async ({ request }) => {
    const url = '/status';

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'GET');
    console.log('URL:', url);

    const response = await request.get(url);
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body:', responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody.status).toBe('OK');
    expect(typeof responseBody.startTime).toBe('string');
  });

  // @Important: Medium
  // @Scenario: Success
  test('[TC-12570] GET /status has no-cache header', async ({ request }) => {
    const url = '/status';

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'GET');
    console.log('URL:', url);

    const response = await request.get(url);

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Headers Cache-Control:', response.headers()['cache-control']);

    expect(response.status()).toBe(200);
    expect(response.headers()['cache-control']).toContain('no-cache');
    expect(response.headers()['pragma']).toBe('no-cache');
    expect(response.headers()['expires']).toBe('0');
  });
});
