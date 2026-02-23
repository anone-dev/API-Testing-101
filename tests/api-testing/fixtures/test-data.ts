export const booksApiData = {
  baseUrl: process.env.API_BASE_URL || 'http://localhost:5000',
  bookId: {
    fiction: 1,
    nonFiction: 7,
    outOfStock: 3
  },
  customer: {
    name: 'SIT Test User',
    updateName: 'SIT Updated User',
    email: `sit_test_${Date.now()}@example.com`,
    clientName: 'SIT Playwright Client'
  }
};
