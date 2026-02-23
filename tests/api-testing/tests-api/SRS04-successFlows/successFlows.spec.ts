import { test, expect } from '@playwright/test';

test.describe('[PBI-12567] Success Flows: S1-Order, S2-Update, S3-Delete', () => {
  test.describe.configure({ mode: 'serial' });

  // @Important: Critical
  // @Scenario: Success
  test('[TC-12641] S1 - Order fiction book success (full flow)', async ({ request }) => {
    // Step 1: Register
    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'POST');
    console.log('URL:', '/api-clients');
    const regBody = { clientEmail: `s1_${Date.now()}@example.com`, clientName: 'S1 Test' };
    console.log('Body:', regBody);

    const regResponse = await request.post('/api-clients', { data: regBody });
    const regData = await regResponse.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', regResponse.status());
    console.log('Body:', regData);

    expect(regResponse.status()).toBe(201);
    const token = regData.accessToken;
    const headers = { Authorization: `Bearer ${token}` };

    // Step 2: GET /status
    const statusResponse = await request.get('/status');
    expect(statusResponse.status()).toBe(200);
    const statusBody = await statusResponse.json();
    expect(statusBody.status).toBe('OK');

    // Step 3: GET /books
    const booksResponse = await request.get('/books');
    expect(booksResponse.status()).toBe(200);
    const booksBody = await booksResponse.json();
    expect(Array.isArray(booksBody)).toBe(true);

    // Step 4: GET /books/1
    const bookResponse = await request.get('/books/1');
    expect(bookResponse.status()).toBe(200);
    const bookBody = await bookResponse.json();
    expect(bookBody.id).toBe(1);

    // Step 5: POST /orders
    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'POST');
    console.log('URL:', '/orders');
    const orderBody = { bookId: 1, customerName: 'API test by S1' };
    console.log('Body:', orderBody);

    const orderResponse = await request.post('/orders', { headers, data: orderBody });
    const orderData = await orderResponse.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', orderResponse.status());
    console.log('Body:', orderData);

    expect(orderResponse.status()).toBe(201);
    expect(orderData.created).toBe(true);
    expect(orderData.orderId).not.toBe('');
    const orderId = orderData.orderId;

    // Step 6: GET /orders — verify orderId in list
    const listResponse = await request.get('/orders', { headers });
    expect(listResponse.status()).toBe(200);
    const listBody = await listResponse.json();
    const orderIds = listBody.map((o: any) => o.id);
    expect(orderIds).toContain(orderId);
    const createdBys = listBody.map((o: any) => o.createdBy);
    expect(new Set(createdBys).size).toBe(1);

    // Step 7: GET /orders/{orderId}
    const detailResponse = await request.get(`/orders/${orderId}`, { headers });
    expect(detailResponse.status()).toBe(200);
    const detailBody = await detailResponse.json();
    expect(detailBody.id).toBe(orderId);
    expect(detailBody.bookId).toBe(1);
    expect(detailBody.customerName).toBe('API test by S1');
  });

  // @Important: High
  // @Scenario: Success
  test('[TC-12642] S1 - Verify order list contains only own orders', async ({ request }) => {
    const regBody = { clientEmail: `s1b_${Date.now()}@example.com`, clientName: 'S1B Test' };
    const regResponse = await request.post('/api-clients', { data: regBody });
    const regData = await regResponse.json();
    const token = regData.accessToken;
    const headers = { Authorization: `Bearer ${token}` };

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'POST');
    console.log('URL:', '/orders');
    const orderBody = { bookId: 1, customerName: 'Own Order Test' };
    console.log('Body:', orderBody);

    await request.post('/orders', { headers, data: orderBody });

    const listResponse = await request.get('/orders', { headers });
    const listBody = await listResponse.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', listResponse.status());
    console.log('Body:', listBody);

    expect(listResponse.status()).toBe(200);
    const createdBys = listBody.map((o: any) => o.createdBy);
    expect(new Set(createdBys).size).toBe(1);
  });

  // @Important: Critical
  // @Scenario: Success
  test('[TC-12643] S2 - Update order customerName success (full flow)', async ({ request }) => {
    // Step 1: Register
    const regBody = { clientEmail: `s2_${Date.now()}@example.com`, clientName: 'S2 Test' };
    const regResponse = await request.post('/api-clients', { data: regBody });
    const regData = await regResponse.json();
    expect(regResponse.status()).toBe(201);
    const token = regData.accessToken;
    const headers = { Authorization: `Bearer ${token}` };

    // Step 2: GET /status
    const statusResponse = await request.get('/status');
    expect(statusResponse.status()).toBe(200);

    // Step 3: GET /books?type=non-fiction
    const booksResponse = await request.get('/books?type=non-fiction');
    expect(booksResponse.status()).toBe(200);
    const booksBody = await booksResponse.json();
    booksBody.forEach((b: any) => expect(b.type).toBe('non-fiction'));

    // Step 4: GET /books/5
    const bookResponse = await request.get('/books/5');
    expect(bookResponse.status()).toBe(200);
    const bookBody = await bookResponse.json();
    expect(bookBody.type).toBe('non-fiction');

    // Step 5: POST /orders
    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'POST');
    console.log('URL:', '/orders');
    const orderBody = { bookId: 5, customerName: 'Original Name' };
    console.log('Body:', orderBody);

    const orderResponse = await request.post('/orders', { headers, data: orderBody });
    const orderData = await orderResponse.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', orderResponse.status());
    console.log('Body:', orderData);

    expect(orderResponse.status()).toBe(201);
    expect(orderData.created).toBe(true);
    const orderId = orderData.orderId;

    // Step 6: GET /orders — verify in list
    const listResponse = await request.get('/orders', { headers });
    expect(listResponse.status()).toBe(200);
    const listBody = await listResponse.json();
    expect(listBody.map((o: any) => o.id)).toContain(orderId);

    // Step 7: GET /orders/{orderId} — verify original name
    const detail1Response = await request.get(`/orders/${orderId}`, { headers });
    expect(detail1Response.status()).toBe(200);
    const detail1Body = await detail1Response.json();
    expect(detail1Body.customerName).toBe('Original Name');

    // Step 8: PATCH /orders/{orderId}
    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'PATCH');
    console.log('URL:', `/orders/${orderId}`);
    const patchBody = { customerName: 'Updated Name' };
    console.log('Body:', patchBody);

    const patchResponse = await request.patch(`/orders/${orderId}`, { headers, data: patchBody });

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', patchResponse.status());

    expect(patchResponse.status()).toBe(204);

    // Step 9: GET /orders/{orderId} — verify updated name
    const detail2Response = await request.get(`/orders/${orderId}`, { headers });
    expect(detail2Response.status()).toBe(200);
    const detail2Body = await detail2Response.json();
    expect(detail2Body.customerName).toBe('Updated Name');
    expect(detail2Body.bookId).toBe(5);
  });

  // @Important: Critical
  // @Scenario: Success
  test('[TC-12644] S3 - Delete order success (full flow)', async ({ request }) => {
    // Step 1: Register
    const regBody = { clientEmail: `s3_${Date.now()}@example.com`, clientName: 'S3 Test' };
    const regResponse = await request.post('/api-clients', { data: regBody });
    const regData = await regResponse.json();
    expect(regResponse.status()).toBe(201);
    const token = regData.accessToken;
    const headers = { Authorization: `Bearer ${token}` };

    // Step 2: GET /status
    expect((await request.get('/status')).status()).toBe(200);

    // Step 3: GET /books?type=fiction&limit=1
    const booksResponse = await request.get('/books?type=fiction&limit=1');
    expect(booksResponse.status()).toBe(200);
    const booksBody = await booksResponse.json();
    expect(booksBody.length).toBe(1);
    expect(booksBody[0].type).toBe('fiction');

    // Step 4: GET /books/4
    const bookResponse = await request.get('/books/4');
    expect(bookResponse.status()).toBe(200);
    expect((await bookResponse.json()).type).toBe('fiction');

    // Step 5: POST /orders (target)
    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'POST');
    console.log('URL:', '/orders');
    const orderBody = { bookId: 4, customerName: 'Delete Test' };
    console.log('Body:', orderBody);

    const orderResponse = await request.post('/orders', { headers, data: orderBody });
    const orderData = await orderResponse.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', orderResponse.status());
    console.log('Body:', orderData);

    expect(orderResponse.status()).toBe(201);
    const orderId = orderData.orderId;

    // Step 6: POST /orders (extra)
    await request.post('/orders', { headers, data: { bookId: 4, customerName: 'Extra Order' } });

    // Step 7: GET /orders — verify orderId in list
    const list1Response = await request.get('/orders', { headers });
    expect(list1Response.status()).toBe(200);
    expect((await list1Response.json()).map((o: any) => o.id)).toContain(orderId);

    // Step 8: GET /orders/{orderId}
    const detailResponse = await request.get(`/orders/${orderId}`, { headers });
    expect(detailResponse.status()).toBe(200);

    // Step 9: DELETE /orders/{orderId}
    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'DELETE');
    console.log('URL:', `/orders/${orderId}`);

    const deleteResponse = await request.delete(`/orders/${orderId}`, { headers });

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', deleteResponse.status());

    expect(deleteResponse.status()).toBe(204);

    // Step 10: GET /orders — verify orderId NOT in list
    const list2Response = await request.get('/orders', { headers });
    expect(list2Response.status()).toBe(200);
    expect((await list2Response.json()).map((o: any) => o.id)).not.toContain(orderId);

    // Step 11: GET /orders/{orderId} — verify 404
    const get404Response = await request.get(`/orders/${orderId}`, { headers });
    expect(get404Response.status()).toBe(404);
  });

  // @Important: Critical
  // @Scenario: Success
  test('[TC-12645] Order state: created → updated → deleted', async ({ request }) => {
    // Register
    const regBody = { clientEmail: `s6_${Date.now()}@example.com`, clientName: 'S6 Test' };
    const regResponse = await request.post('/api-clients', { data: regBody });
    const token = (await regResponse.json()).accessToken;
    const headers = { Authorization: `Bearer ${token}` };

    // Step 2: POST /orders
    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'POST');
    console.log('URL:', '/orders');
    const orderBody = { bookId: 4, customerName: 'State Test' };
    console.log('Body:', orderBody);

    const orderResponse = await request.post('/orders', { headers, data: orderBody });
    const orderData = await orderResponse.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', orderResponse.status());
    console.log('Body:', orderData);

    expect(orderResponse.status()).toBe(201);
    const orderId = orderData.orderId;

    // Step 3: GET — state created
    const get1Response = await request.get(`/orders/${orderId}`, { headers });
    expect(get1Response.status()).toBe(200);
    const get1Body = await get1Response.json();
    expect(get1Body.customerName).toBe('State Test');

    // Step 4: PATCH — state updated
    const patchResponse = await request.patch(`/orders/${orderId}`, {
      headers,
      data: { customerName: 'Updated' }
    });
    expect(patchResponse.status()).toBe(204);

    // Step 5: GET — verify updated
    const get2Response = await request.get(`/orders/${orderId}`, { headers });
    expect(get2Response.status()).toBe(200);
    expect((await get2Response.json()).customerName).toBe('Updated');

    // Step 6: DELETE — state deleted
    const deleteResponse = await request.delete(`/orders/${orderId}`, { headers });
    expect(deleteResponse.status()).toBe(204);

    // Step 7: GET — verify 404
    const get3Response = await request.get(`/orders/${orderId}`, { headers });
    expect(get3Response.status()).toBe(404);
  });
});
