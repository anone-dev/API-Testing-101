import { test, expect } from '@playwright/test';

test.describe('[PBI-12559] FR-05: Stock Management', () => {
  test.describe.configure({ mode: 'serial' });

  let token: string;

  test.beforeAll(async ({ request }) => {
    const response = await request.post('/api-clients', {
      data: { clientEmail: `stock_${Date.now()}@example.com`, clientName: 'Stock Test' }
    });
    const body = await response.json();
    token = body.accessToken;
  });

  // @Important: High
  // @Scenario: Success
  test('[TC-12592] POST /reset resets all stock', async ({ request }) => {
    const headers = { Authorization: `Bearer ${token}` };

    // Create an order to reduce stock
    await request.post('/orders', { headers, data: { bookId: 1, customerName: 'Stock Test' } });

    const url = '/reset';

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'POST');
    console.log('URL:', url);

    const response = await request.post(url);
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body:', responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody.message).toBe('Stock reset successfully');

    const bookResponse = await request.get('/books/1');
    const bookBody = await bookResponse.json();
    expect(bookBody['current-stock']).toBe(3);
  });

  // @Important: High
  // @Scenario: Alternative
  test('[TC-12593] BUG-01: bookId=3 bypasses stock check', async ({ request }) => {
    const headers = { Authorization: `Bearer ${token}` };

    // Reset stock first
    await request.post('/reset');

    // Exhaust stock of bookId=3 (initial stock=5)
    for (let i = 0; i < 5; i++) {
      await request.post('/orders', { headers, data: { bookId: 3, customerName: `Exhaust ${i}` } });
    }

    const url = '/orders';
    const requestBody = { bookId: 3, customerName: 'Bug Test' };

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'POST');
    console.log('URL:', url);
    console.log('Headers:', headers);
    console.log('Body:', requestBody);

    const response = await request.post(url, { headers, data: requestBody });
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body:', responseBody);

    // BUG-01: bookId=3 bypasses stock check — actual returns 201 instead of 404
    expect(response.status()).toBe(201);
    expect(responseBody.created).toBe(true);
  });
});
