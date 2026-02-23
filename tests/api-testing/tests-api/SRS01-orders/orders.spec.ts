import { test, expect } from '@playwright/test';

test.describe('[PBI-12558] FR-04: Orders Management', () => {
  test.describe.configure({ mode: 'serial' });

  let token: string;
  let orderId: string;

  test.beforeAll(async ({ request }) => {
    const response = await request.post('/api-clients', {
      data: { clientEmail: `orders_${Date.now()}@example.com`, clientName: 'Orders Test' }
    });
    const body = await response.json();
    token = body.accessToken;
  });

  // @Important: Critical
  // @Scenario: Success
  test('[TC-12582] POST /orders create order success', async ({ request }) => {
    const url = '/orders';
    const headers = { Authorization: `Bearer ${token}` };
    const requestBody = { bookId: 1, customerName: 'Test Customer' };

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

    expect(response.status()).toBe(201);
    expect(responseBody.created).toBe(true);
    expect(typeof responseBody.orderId).toBe('string');
    expect(responseBody.orderId.length).toBe(21);
    orderId = responseBody.orderId;
  });

  // @Important: Critical
  // @Scenario: Alternative
  test('[TC-12583] POST /orders out of stock returns 404', async ({ request }) => {
    const url = '/orders';
    const headers = { Authorization: `Bearer ${token}` };
    const requestBody = { bookId: 2, customerName: 'Test Customer' };

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

    expect(response.status()).toBe(404);
    expect(responseBody.error).toBe('This book is not in stock. Try again later.');
  });

  // @Important: Critical
  // @Scenario: Alternative
  test('[TC-12584] POST /orders without token returns 401', async ({ request }) => {
    const url = '/orders';
    const requestBody = { bookId: 1, customerName: 'Test' };

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'POST');
    console.log('URL:', url);
    console.log('Headers:', '(no Authorization)');
    console.log('Body:', requestBody);

    const response = await request.post(url, { data: requestBody });
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body:', responseBody);

    expect(response.status()).toBe(401);
    expect(responseBody.error).toBe('Missing Authorization header.');
  });

  // @Important: High
  // @Scenario: Success
  test('[TC-12585] GET /orders returns order list', async ({ request }) => {
    const url = '/orders';
    const headers = { Authorization: `Bearer ${token}` };

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'GET');
    console.log('URL:', url);
    console.log('Headers:', headers);

    const response = await request.get(url, { headers });
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body:', responseBody);

    expect(response.status()).toBe(200);
    expect(Array.isArray(responseBody)).toBe(true);
    responseBody.forEach((item: any) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('bookId');
      expect(item).toHaveProperty('customerName');
      expect(item).toHaveProperty('quantity');
      expect(item).toHaveProperty('createdBy');
      expect(item).toHaveProperty('timestamp');
    });
  });

  // @Important: High
  // @Scenario: Success
  test('[TC-12586] GET /orders/{orderId} returns order detail', async ({ request }) => {
    const url = `/orders/${orderId}`;
    const headers = { Authorization: `Bearer ${token}` };

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'GET');
    console.log('URL:', url);
    console.log('Headers:', headers);

    const response = await request.get(url, { headers });
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body:', responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody.id).toBe(orderId);
    expect(responseBody.bookId).toBe(1);
    expect(responseBody.customerName).toBe('Test Customer');
    expect(responseBody.quantity).toBe(1);
    expect(responseBody).toHaveProperty('createdBy');
    expect(responseBody).toHaveProperty('timestamp');
  });

  // @Important: High
  // @Scenario: Alternative
  test('[TC-12587] GET /orders/{orderId} not found returns 404', async ({ request }) => {
    const url = '/orders/nonexistent-order-id';
    const headers = { Authorization: `Bearer ${token}` };

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'GET');
    console.log('URL:', url);
    console.log('Headers:', headers);

    const response = await request.get(url, { headers });
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body:', responseBody);

    expect(response.status()).toBe(404);
    expect(responseBody.error).toBe('No order with id nonexistent-order-id.');
  });

  // @Important: High
  // @Scenario: Success
  test('[TC-12588] PATCH /orders/{orderId} update customerName success', async ({ request }) => {
    const url = `/orders/${orderId}`;
    const headers = { Authorization: `Bearer ${token}` };
    const requestBody = { customerName: 'Updated Name' };

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'PATCH');
    console.log('URL:', url);
    console.log('Headers:', headers);
    console.log('Body:', requestBody);

    const response = await request.patch(url, { headers, data: requestBody });

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());

    expect(response.status()).toBe(204);

    const getResponse = await request.get(url, { headers });
    const getBody = await getResponse.json();
    expect(getBody.customerName).toBe('Updated Name');
  });

  // @Important: High
  // @Scenario: Alternative
  test('[TC-12589] PATCH /orders/{orderId} not found returns 404', async ({ request }) => {
    const url = '/orders/nonexistent-id';
    const headers = { Authorization: `Bearer ${token}` };
    const requestBody = { customerName: 'New Name' };

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'PATCH');
    console.log('URL:', url);
    console.log('Headers:', headers);
    console.log('Body:', requestBody);

    const response = await request.patch(url, { headers, data: requestBody });
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body:', responseBody);

    expect(response.status()).toBe(404);
    expect(responseBody.error).toBe('No order with id nonexistent-id.');
  });

  // @Important: High
  // @Scenario: Success
  test('[TC-12590] DELETE /orders/{orderId} success', async ({ request }) => {
    const url = `/orders/${orderId}`;
    const headers = { Authorization: `Bearer ${token}` };

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'DELETE');
    console.log('URL:', url);
    console.log('Headers:', headers);

    const response = await request.delete(url, { headers });

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());

    expect(response.status()).toBe(204);

    const getResponse = await request.get(url, { headers });
    expect(getResponse.status()).toBe(404);
  });

  // @Important: High
  // @Scenario: Alternative
  test('[TC-12591] DELETE /orders/{orderId} not found returns 404', async ({ request }) => {
    const url = '/orders/nonexistent-id';
    const headers = { Authorization: `Bearer ${token}` };

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'DELETE');
    console.log('URL:', url);
    console.log('Headers:', headers);

    const response = await request.delete(url, { headers });
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body:', responseBody);

    expect(response.status()).toBe(404);
    expect(responseBody.error).toBe('No order with id nonexistent-id.');
  });
});
