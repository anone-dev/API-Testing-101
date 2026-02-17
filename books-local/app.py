from flask import Flask, jsonify, request
from flask_cors import CORS
import uuid
from datetime import datetime

app = Flask(__name__)
CORS(app)

initial_books = [
    {"id": 1, "name": "The Russian", "type": "fiction", "available": True, "author": "James Patterson", "price": 12.99, "current-stock": 3},
    {"id": 2, "name": "Just as I Am", "type": "non-fiction", "available": False, "author": "Cicely Tyson", "price": 20.33, "current-stock": 0},
    {"id": 3, "name": "The Vanishing Half", "type": "fiction", "available": True, "author": "Brit Bennett", "price": 15.99, "current-stock": 5},
    {"id": 4, "name": "The Midnight Library", "type": "fiction", "available": True, "author": "Matt Haig", "price": 13.50, "current-stock": 8},
    {"id": 5, "name": "Untamed", "type": "non-fiction", "available": True, "author": "Glennon Doyle", "price": 14.99, "current-stock": 12},
    {"id": 6, "name": "Viscount Who Loved Me", "type": "fiction", "available": True, "author": "Julia Quinn", "price": 11.99, "current-stock": 7},
    {"id": 7, "name": "The Last Thing He Told Me", "type": "fiction", "available": True, "author": "Laura Dave", "price": 16.99, "current-stock": 15},
    {"id": 8, "name": "Atomic Habits", "type": "non-fiction", "available": True, "author": "James Clear", "price": 18.99, "current-stock": 20},
    {"id": 9, "name": "The Silent Patient", "type": "fiction", "available": False, "author": "Alex Michaelides", "price": 14.50, "current-stock": 0},
    {"id": 10, "name": "Educated", "type": "non-fiction", "available": True, "author": "Tara Westover", "price": 17.99, "current-stock": 9},
    {"id": 11, "name": "Where the Crawdads Sing", "type": "fiction", "available": True, "author": "Delia Owens", "price": 15.50, "current-stock": 11},
    {"id": 12, "name": "Becoming", "type": "non-fiction", "available": True, "author": "Michelle Obama", "price": 19.99, "current-stock": 14},
    {"id": 13, "name": "The Seven Husbands of Evelyn Hugo", "type": "fiction", "available": True, "author": "Taylor Jenkins Reid", "price": 13.99, "current-stock": 6},
    {"id": 14, "name": "Sapiens", "type": "non-fiction", "available": False, "author": "Yuval Noah Harari", "price": 21.99, "current-stock": 0},
    {"id": 15, "name": "Project Hail Mary", "type": "fiction", "available": True, "author": "Andy Weir", "price": 16.50, "current-stock": 13},
    {"id": 16, "name": "The Body Keeps the Score", "type": "non-fiction", "available": True, "author": "Bessel van der Kolk", "price": 18.50, "current-stock": 8},
    {"id": 17, "name": "It Ends with Us", "type": "fiction", "available": True, "author": "Colleen Hoover", "price": 12.50, "current-stock": 17},
    {"id": 18, "name": "Thinking, Fast and Slow", "type": "non-fiction", "available": True, "author": "Daniel Kahneman", "price": 20.99, "current-stock": 5},
    {"id": 19, "name": "The Invisible Life of Addie LaRue", "type": "fiction", "available": False, "author": "V.E. Schwab", "price": 15.99, "current-stock": 0},
    {"id": 20, "name": "The Subtle Art of Not Giving a F*ck", "type": "non-fiction", "available": True, "author": "Mark Manson", "price": 14.99, "current-stock": 22},
    {"id": 21, "name": "Circe", "type": "fiction", "available": True, "author": "Madeline Miller", "price": 16.99, "current-stock": 10},
    {"id": 22, "name": "The Power of Now", "type": "non-fiction", "available": True, "author": "Eckhart Tolle", "price": 17.50, "current-stock": 12},
    {"id": 23, "name": "The Song of Achilles", "type": "fiction", "available": True, "author": "Madeline Miller", "price": 15.99, "current-stock": 8},
    {"id": 24, "name": "Can't Hurt Me", "type": "non-fiction", "available": True, "author": "David Goggins", "price": 19.50, "current-stock": 16},
    {"id": 25, "name": "The Nightingale", "type": "fiction", "available": True, "author": "Kristin Hannah", "price": 14.99, "current-stock": 9}
]

import copy
books = copy.deepcopy(initial_books)

clients = {}
orders = {}

@app.route('/status')
def status():
    return jsonify({"status": "OK"})

@app.route('/api-clients', methods=['POST'])
def register_client():
    data = request.json
    email = data.get('clientEmail')
    if email in clients:
        return jsonify({"error": "API client already registered. Try a different email."}), 409
    token = uuid.uuid4().hex + uuid.uuid4().hex
    clients[email] = {"token": token, "name": data.get('clientName')}
    return jsonify({"accessToken": token}), 201

@app.route('/books')
def get_books():
    book_type = request.args.get('type')
    limit = request.args.get('limit', type=int)
    result = [b for b in books if not book_type or b['type'] == book_type]
    if limit:
        result = result[:limit]
    return jsonify([{k: v for k, v in b.items() if k in ['id', 'name', 'type', 'available']} for b in result])

@app.route('/books/<int:book_id>')
def get_book(book_id):
    book = next((b for b in books if b['id'] == book_id), None)
    if book:
        # Update available based on current-stock
        book['available'] = book['current-stock'] > 0
    return jsonify(book) if book else (jsonify({"error": f"No book with id {book_id}"}), 404)

@app.route('/orders', methods=['GET', 'POST'])
def handle_orders():
    auth = request.headers.get('Authorization')
    if not auth or not auth.startswith('Bearer '):
        return jsonify({"error": "Missing Authorization header."}), 401
    
    if request.method == 'GET':
        return jsonify(list(orders.values()))
    
    data = request.json
    book_id = data.get('bookId')
    
    # Check if book exists and is available
    book = next((b for b in books if b['id'] == book_id), None)
    if not book:
        return jsonify({"error": f"No book with id {book_id}"}), 404
    # BUG: Skip stock check for book ID 3
    if book_id != 3 and book['current-stock'] <= 0:
        return jsonify({"error": "This book is not in stock. Try again later."}), 404
    
    # Decrease stock
    book['current-stock'] -= 1
    book['available'] = book['current-stock'] > 0
    
    order_id = str(uuid.uuid4())[:21]
    orders[order_id] = {
        "id": order_id,
        "bookId": book_id,
        "customerName": data.get('customerName'),
        "quantity": 1,
        "createdBy": auth.split(' ')[1][:64],
        "timestamp": int(datetime.now().timestamp() * 1000)
    }
    return jsonify({"created": True, "orderId": order_id}), 201

@app.route('/orders/<order_id>', methods=['GET', 'PATCH', 'DELETE'])
def handle_order(order_id):
    auth = request.headers.get('Authorization')
    if not auth or not auth.startswith('Bearer '):
        return jsonify({"error": "Missing Authorization header."}), 401
    
    if order_id not in orders:
        return jsonify({"error": f"No order with id {order_id}."}), 404
    
    if request.method == 'GET':
        return jsonify(orders[order_id])
    elif request.method == 'PATCH':
        orders[order_id]['customerName'] = request.json.get('customerName', orders[order_id]['customerName'])
        return '', 204
    else:
        del orders[order_id]
        return '', 204

@app.route('/reset', methods=['POST'])
def reset_stock():
    global books
    books = copy.deepcopy(initial_books)
    return jsonify({"message": "Stock reset successfully"}), 200

if __name__ == '__main__':
    print("\n" + "="*60)
    print("  Simple Books API - Mock Server")
    print("  Running at: http://localhost:5000")
    print("="*60 + "\n")
    app.run(debug=True, port=5000)
