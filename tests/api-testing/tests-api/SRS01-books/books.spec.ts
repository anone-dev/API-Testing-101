import { test, expect } from '@playwright/test';

test.describe('[PBI-12557] FR-03: Books Management', () => {
  // @Important: High
  // @Scenario: Success
  test('[TC-12575] GET /books returns all 25 books', async ({ request }) => {
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
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBe(25);
    responseBody.forEach((item: any) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('type');
      expect(item).toHaveProperty('available');
      expect(item).not.toHaveProperty('author');
      expect(item).not.toHaveProperty('price');
      expect(item).not.toHaveProperty('current-stock');
    });
  });

  // @Important: High
  // @Scenario: Success
  test('[TC-12576] GET /books?type=fiction returns only fiction', async ({ request }) => {
    const url = '/books?type=fiction';

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
    responseBody.forEach((item: any) => {
      expect(item.type).toBe('fiction');
    });
  });

  // @Important: High
  // @Scenario: Success
  test('[TC-12577] GET /books?type=non-fiction returns only non-fiction', async ({ request }) => {
    const url = '/books?type=non-fiction';

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
    responseBody.forEach((item: any) => {
      expect(item.type).toBe('non-fiction');
    });
  });

  // @Important: Medium
  // @Scenario: Success
  test('[TC-12578] GET /books?limit=5 returns max 5 items', async ({ request }) => {
    const url = '/books?limit=5';

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
    expect(responseBody.length).toBeLessThanOrEqual(5);
  });

  // @Important: High
  // @Scenario: Success
  test('[TC-12579] GET /books/{bookId} returns book detail', async ({ request }) => {
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
    expect(responseBody.id).toBe(1);
    expect(responseBody.name).toBe('The Russian');
    expect(responseBody.author).toBe('James Patterson');
    expect(responseBody.price).toBe(12.99);
    expect(responseBody).toHaveProperty('type');
    expect(responseBody).toHaveProperty('available');
    expect(responseBody).toHaveProperty('current-stock');
  });

  // @Important: High
  // @Scenario: Success
  test('[TC-12580] GET /books/{bookId} available reflects stock', async ({ request }) => {
    const url = '/books/2';

    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'GET');
    console.log('URL:', url);

    const response = await request.get(url);
    const responseBody = await response.json();

    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body:', responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody.available).toBe(false);
    expect(responseBody['current-stock']).toBe(0);
  });

  // @Important: High
  // @Scenario: Alternative
  test('[TC-12581] GET /books/{bookId} not found returns 404', async ({ request }) => {
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
    expect(responseBody.error).toBe('No book with id 9999');
  });
});
