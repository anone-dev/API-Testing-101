import { test, expect } from '@playwright/test';

test.describe('[PBI-12568] Failure Flows: F1-F4', () => {
  test.describe.configure({ mode: 'serial' });

  // @Important: Critical
  // @Scenario: Alternative
  test('[TC-12646] F1 - Order out-of-stock book returns 404 (full flow)', async ({ request }) => {
    // Step 1: Register
    const regBody = { clientEmail: `f1_${Date.now()}@example.com`, clientName: 'F1 Test' };
    const regResponse = await request.post('/api-clients', { data: regBody });
    const regData = await regResponse.json();
    expect(regResponse.status()).toBe(201);
    const token = regData.accessToken;
    const headers = { Authorization: `Bearer ${token}` };

    // Step 2: GET /status
    expect((await request.get('/status')).status()).toBe(200);

    // Step 3: GET /books?limit=5
    const booksResponse = await request.get('/books?limit=5');
    expect(booksResponse.status()).toBe(200);
    expect((await booksResponse.json()).length).toBe(5);

    // Step 4: GET /books/2 — verify available=false
    const bookResponse = await request.get('/books/2');
    expect(bookResponse.status()).toBe(200);
    const bookBody = await bookResponse.json();
    expect(bookBody.available).toBe(false);
    expect(bookBody['current-stock']).toBe(0);

    // Step 5: POST /orders — expect 404
    const url = '/orders';
    const requestBody = { bookId: 2, customerName: 'F1 Test' };

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
  test('[TC-12647] F2 - PATCH deleted order returns 404 (full flow)', async ({ request }) => {
    // Register
    const regBody = { clientEmail: `f2_${Date.now()}@example.com`, clientName: 'F2 Test' };
    const token = (await (await request.post('/api-clients', { data: regBody })).json()).accessToken;
    const headers = { Authorization: `Bearer ${token}` };

    // Step 2: GET /status
    expect((await request.get('/status')).status()).toBe(200);

    // Steps 3-4: GET books
    expect((await request.get('/books?type=fiction&limit=1')).status()).toBe(200);
    expect((await request.get('/books/4')).status()).toBe(200);

    // Step 5: POST /orders (target)
    const orderResponse = await request.post('/orders', { headers, data: { bookId: 4, customerName: 'F2 Target' } });
    expect(orderResponse.status()).toBe(201);
    const orderId = (await orderResponse.json()).orderId;

    // Step 6: POST /orders (extra)
    await request.post('/orders', { headers, data: { bookId: 4, customerName: 'F2 Extra' } });

    // Step 7: GET /orders — verify in list
    const list1Body = await (await request.get('/orders', { headers })).json();
    expect(list1Body.map((o: any) => o.id)).toContain(orderId);

    // Step 8: GET /orders/{orderId}
    expect((await request.get(`/orders/${orderId}`, { headers })).status()).toBe(200);

    // Step 9: DELETE
    expect((await request.delete(`/orders/${orderId}`, { headers })).status()).toBe(204);

    // Step 10: GET /orders — verify NOT in list
    const list2Body = await (await request.get('/orders', { headers })).json();
    expect(list2Body.map((o: any) => o.id)).not.toContain(orderId);

    // Step 11: GET /orders/{orderId} — 404
    expect((await request.get(`/orders/${orderId}`, { headers })).status()).toBe(404);

    // Step 12: PATCH deleted order — expect 404
    const url = `/orders/${orderId}`;
    const requestBody = { customerName: 'F2 Test' };

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
    expect(responseBody.error).toBe(`No order with id ${orderId}.`);
  });

  // @Important: Critical
  // @Scenario: Alternative
  test('[TC-12648] F3 - DELETE deleted order returns 404 (full flow)', async ({ request }) => {
    // Register
    const regBody = { clientEmail: `f3_${Date.now()}@example.com`, clientName: 'F3 Test' };
    const token = (await (await request.post('/api-clients', { data: regBody })).json()).accessToken;
    const headers = { Authorization: `Bearer ${token}` };

    // Steps 2-4
    expect((await request.get('/status')).status()).toBe(200);
    expect((await request.get('/books?type=fiction&limit=1')).status()).toBe(200);
    expect((await request.get('/books/4')).status()).toBe(200);

    // Step 5: POST /orders (target)
    const orderResponse = await request.post('/orders', { headers, data: { bookId: 4, customerName: 'F3 Target' } });
    expect(orderResponse.status()).toBe(201);
    const orderId = (await orderResponse.json()).orderId;

    // Step 6: POST /orders (extra)
    await request.post('/orders', { headers, data: { bookId: 4, customerName: 'F3 Extra' } });

    // Step 7: GET /orders — verify in list
    expect((await (await request.get('/orders', { headers })).json()).map((o: any) => o.id)).toContain(orderId);

    // Step 8: GET /orders/{orderId}
    expect((await request.get(`/orders/${orderId}`, { headers })).status()).toBe(200);

    // Step 9: DELETE (first)
    expect((await request.delete(`/orders/${orderId}`, { headers })).status()).toBe(204);

    // Step 10: GET /orders — verify NOT in list
    expect((await (await request.get('/orders', { headers })).json()).map((o: any) => o.id)).not.toContain(orderId);

    // Step 11: GET /orders/{orderId} — 404
    expect((await request.get(`/orders/${orderId}`, { headers })).status()).toBe(404);

    // Step 12: DELETE again — expect 404
    const url = `/orders/${orderId}`;

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
    expect(responseBody.error).toBe(`No order with id ${orderId}.`);
  });

  // @Important: Critical
  // @Scenario: Alternative
  test('[TC-12649] F4 - Register duplicate email returns 409 (full flow)', async ({ request }) => {
    // Step 1: GET /status
    expect((await request.get('/status')).status()).toBe(200);

    const url = '/api-clients';
    const requestBody = { clientName: 'F4 Test', clientEmail: `f4_${Date.now()}@example.com` };

    // Step 2: First register
    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'POST');
    console.log('URL:', url);
    console.log('Body:', requestBody);

    const reg1Response = await request.post(url, { data: requestBody });
    const reg1Body = await reg1Response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', reg1Response.status());
    console.log('Body:', reg1Body);

    expect(reg1Response.status()).toBe(201);
    expect(reg1Body).toHaveProperty('accessToken');

    // Step 3: Second register (same email)
    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'POST');
    console.log('URL:', url);
    console.log('Body:', requestBody);

    const reg2Response = await request.post(url, { data: requestBody });
    const reg2Body = await reg2Response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', reg2Response.status());
    console.log('Body:', reg2Body);

    expect(reg2Response.status()).toBe(409);
    expect(reg2Body.error).toBe('API client already registered. Try a different email.');
  });

  // @Important: High
  // @Scenario: Alternative
  test('[TC-12650] F4 - Register without clientEmail returns 400', async ({ request }) => {
    const url = '/api-clients';
    const requestBody = { clientName: 'No Email' };

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'POST');
    console.log('URL:', url);
    console.log('Body:', requestBody);

    const response = await request.post(url, { data: requestBody });
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body:', responseBody);

    expect(response.status()).toBe(400);
    expect(responseBody.error).not.toBe('');
  });

  // @Important: High
  // @Scenario: Alternative
  test('[TC-12651] F4 - Register without clientName returns 400', async ({ request }) => {
    const url = '/api-clients';
    const requestBody = { clientEmail: 'noname@example.com' };

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'POST');
    console.log('URL:', url);
    console.log('Body:', requestBody);

    const response = await request.post(url, { data: requestBody });
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body:', responseBody);

    expect(response.status()).toBe(400);
    expect(responseBody.error).not.toBe('');
  });

  // @Important: Critical
  // @Scenario: Alternative
  test('[TC-12652] Authentication pre-requisite for all protected flows', async ({ request }) => {
    // Step 1: GET /orders — no token
    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'GET');
    console.log('URL:', '/orders');
    console.log('Headers:', '(no Authorization)');

    const get1Response = await request.get('/orders');
    const get1Body = await get1Response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', get1Response.status());
    console.log('Body:', get1Body);

    expect(get1Response.status()).toBe(401);
    expect(get1Body.error).toBe('Missing Authorization header.');

    // Step 2: POST /orders — no token
    const post1Response = await request.post('/orders', { data: { bookId: 1, customerName: 'Test' } });
    expect(post1Response.status()).toBe(401);
    expect((await post1Response.json()).error).toBe('Missing Authorization header.');

    // Step 3: PATCH /orders/any-id — no token
    const patchResponse = await request.patch('/orders/any-id', { data: { customerName: 'Test' } });
    expect(patchResponse.status()).toBe(401);
    expect((await patchResponse.json()).error).toBe('Missing Authorization header.');

    // Step 4: DELETE /orders/any-id — no token
    const deleteResponse = await request.delete('/orders/any-id');
    expect(deleteResponse.status()).toBe(401);
    expect((await deleteResponse.json()).error).toBe('Missing Authorization header.');
  });
});
