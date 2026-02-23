// ===== Books API Schemas =====
// NOTE: POST /orders response uses key "orderId" (createOrderResponseSchema)
//       GET /orders and GET /orders/:id response uses key "id" (orderSchema, orderListSchema)

export const bookListSchema = {
  type: 'array',
  items: {
    type: 'object',
    required: ['id', 'name', 'type', 'available'],
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      type: { type: 'string', enum: ['fiction', 'non-fiction'] },
      available: { type: 'boolean' }
    }
  }
};

export const bookDetailSchema = {
  type: 'object',
  required: ['id', 'name', 'type', 'available'],
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    author: { type: 'string' },
    isbn: { type: 'string' },
    type: { type: 'string', enum: ['fiction', 'non-fiction'] },
    price: { type: 'number' },
    'current-stock': { type: 'number' },
    available: { type: 'boolean' }
  }
};

export const createOrderResponseSchema = {
  type: 'object',
  required: ['created', 'orderId'],
  properties: {
    created: { type: 'boolean' },
    orderId: { type: 'string' }
  }
};

export const orderSchema = {
  type: 'object',
  required: ['id', 'bookId', 'quantity', 'createdBy'],
  properties: {
    id: { type: 'string' },
    bookId: { type: 'number' },
    customerName: { type: 'string' },
    createdBy: { type: 'string' },
    quantity: { type: 'number' },
    timestamp: { type: 'number' }
  }
};

export const orderListSchema = {
  type: 'array',
  items: orderSchema
};
