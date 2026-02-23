import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import {
  bookListSchema,
  bookDetailSchema,
  createOrderResponseSchema,
  orderSchema,
  orderListSchema
} from '../../schemas/api.schema';

const ajv = new Ajv();

test.describe('[PBI-12555][PBI-12556][PBI-12557][PBI-12558][PBI-12559] SRS-03: Schema Validation', () => {
  test.describe.configure({ mode: 'serial' });

  let token: string;
  let orderId: string;

  test.beforeAll(async ({ request }) => {
    const response = await request.post('/api-clients', {
      data: { clientEmail: `schema_${Date.now()}@example.com`, clientName: 'Schema Test' }
    });
    const body = await response.json();
    token = body.accessToken;
  });

  // @Important: Critical
  // @Scenario: Success
  test('[TC-12623] GET /status response schema is valid', async ({ request }) => {
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
    expect(typeof responseBody.status).toBe('string');
    expect(typeof responseBody.startTime).toBe('string');
    expect(Object.keys(responseBody)).toEqual(expect.arrayContaining(['status', 'startTime']));
  });

  // @Important: Critical
  // @Scenario: Success
  test('[TC-12624] POST /api-clients response schema is valid', async ({ request }) => {
    const url = '/api-clients';
    const requestBody = { clientEmail: `schema_test_${Date.now()}@example.com`, clientName: 'Schema Test' };

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
    expect(Object.keys(responseBody)).toEqual(['accessToken']);
  });

  // @Important: High
  // @Scenario: Alternative
  test('[TC-12625] POST /api-clients 409 error schema is valid', async ({ request }) => {
    const url = '/api-clients';
    const requestBody = { clientEmail: 'dup_schema@example.com', clientName: 'Dup Schema' };

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
    expect(typeof responseBody.error).toBe('string');
    expect(responseBody.error).toBe('API client already registered. Try a different email.');
  });

  // @Important: High
  // @Scenario: Success
  test('[TC-12626] GET /books list schema is valid', async ({ request }) => {
    const url = '/books';

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'GET');
    console.log('URL:', url);

    const response = await request.get(url);
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body count:', responseBody.length);

    expect(response.status()).toBe(200);
    const valid = ajv.validate(bookListSchema, responseBody);
    expect(valid).toBe(true);
    responseBody.forEach((item: any) => {
      expect(item).not.toHaveProperty('author');
      expect(item).not.toHaveProperty('price');
      expect(item).not.toHaveProperty('current-stock');
    });
  });

  // @Important: High
  // @Scenario: Success
  test('[TC-12627] GET /books/{bookId} detail schema is valid', async ({ request }) => {
    const url = '/books/1';

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'GET');
    console.log('URL:', url);

    const response = await request.get(url);
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body:', responseBody);

    expect(response.status()).toBe(200);
    const valid = ajv.validate(bookDetailSchema, responseBody);
    expect(valid).toBe(true);
    expect(typeof responseBody.author).toBe('string');
    expect(typeof responseBody.price).toBe('number');
    expect(typeof responseBody['current-stock']).toBe('number');
  });

  // @Important: High
  // @Scenario: Alternative
  test('[TC-12628] GET /books/{bookId} 404 error schema is valid', async ({ request }) => {
    const url = '/books/9999';

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'GET');
    console.log('URL:', url);

    const response = await request.get(url);
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body:', responseBody);

    expect(response.status()).toBe(404);
    expect(typeof responseBody.error).toBe('string');
    expect(responseBody.error).toBe('No book with id 9999');
  });

  // @Important: Medium
  // @Scenario: Success
  test('[TC-12629] GET /books limit boundary min=1', async ({ request }) => {
    const url = '/books?limit=1';

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'GET');
    console.log('URL:', url);

    const response = await request.get(url);
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body count:', responseBody.length);

    expect(response.status()).toBe(200);
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBe(1);
  });

  // @Important: Medium
  // @Scenario: Success
  test('[TC-12630] GET /books limit boundary max=20', async ({ request }) => {
    const url = '/books?limit=20';

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'GET');
    console.log('URL:', url);

    const response = await request.get(url);
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body count:', responseBody.length);

    expect(response.status()).toBe(200);
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeLessThanOrEqual(20);
  });

  // @Important: Medium
  // @Scenario: Success
  test('[TC-12631] GET /books combined type and limit filter', async ({ request }) => {
    const url = '/books?type=fiction&limit=3';

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'GET');
    console.log('URL:', url);

    const response = await request.get(url);
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body count:', responseBody.length);

    expect(response.status()).toBe(200);
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeLessThanOrEqual(3);
    responseBody.forEach((item: any) => {
      expect(item.type).toBe('fiction');
    });
  });

  // @Important: Critical
  // @Scenario: Success
  test('[TC-12632] POST /orders 201 response schema is valid', async ({ request }) => {
    const url = '/orders';
    const headers = { Authorization: `Bearer ${token}` };
    const requestBody = { bookId: 4, customerName: 'Schema Test' };

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
    const valid = ajv.validate(createOrderResponseSchema, responseBody);
    expect(valid).toBe(true);
    expect(responseBody.created).toBe(true);
    expect(responseBody.orderId.length).toBe(21);
    orderId = responseBody.orderId;
  });

  // @Important: Critical
  // @Scenario: Alternative
  test('[TC-12633] POST /orders 401 error schema is valid', async ({ request }) => {
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
    expect(typeof responseBody.error).toBe('string');
    expect(responseBody.error).toBe('Missing Authorization header.');
  });

  // @Important: Critical
  // @Scenario: Alternative
  test('[TC-12634] POST /orders 404 out-of-stock schema is valid', async ({ request }) => {
    const url = '/orders';
    const headers = { Authorization: `Bearer ${token}` };
    const requestBody = { bookId: 2, customerName: 'Test' };

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
    expect(typeof responseBody.error).toBe('string');
    expect(responseBody.error).toBe('This book is not in stock. Try again later.');
  });

  // @Important: High
  // @Scenario: Success
  test('[TC-12635] GET /orders list schema is valid', async ({ request }) => {
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
    const valid = ajv.validate(orderListSchema, responseBody);
    expect(valid).toBe(true);
    // GET /orders uses key "id" not "orderId"
    responseBody.forEach((item: any) => {
      expect(item).toHaveProperty('id');
      expect(item).not.toHaveProperty('orderId');
    });
  });

  // @Important: High
  // @Scenario: Success
  test('[TC-12636] GET /orders/{orderId} detail schema is valid', async ({ request }) => {
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
    const valid = ajv.validate(orderSchema, responseBody);
    expect(valid).toBe(true);
    expect(responseBody.id).toBe(orderId);
    expect(responseBody.quantity).toBe(1);
    expect(responseBody.createdBy.length).toBe(64);
  });

  // @Important: High
  // @Scenario: Alternative
  test('[TC-12637] GET /orders/{orderId} 404 error schema is valid', async ({ request }) => {
    const url = '/orders/nonexistent-id';
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
    expect(typeof responseBody.error).toBe('string');
    expect(responseBody.error).toBe('No order with id nonexistent-id.');
  });

  // @Important: High
  // @Scenario: Success
  test('[TC-12638] PATCH /orders/{orderId} 204 no content', async ({ request }) => {
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
    const responseText = await response.text();
    expect(responseText).toBe('');
  });

  // @Important: High
  // @Scenario: Success
  test('[TC-12639] DELETE /orders/{orderId} 204 no content', async ({ request }) => {
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
    const responseText = await response.text();
    expect(responseText).toBe('');
  });

  // @Important: High
  // @Scenario: Success
  test('[TC-12640] POST /reset response schema is valid', async ({ request }) => {
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
    expect(typeof responseBody.message).toBe('string');
    expect(responseBody.message).toBe('Stock reset successfully');
  });
});
