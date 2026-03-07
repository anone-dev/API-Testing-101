import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import '../models/book.dart';
import '../models/order.dart';

class ApiService {
  // Auto-detect port: try 5001 first (macOS), fallback to 5000
  static String _baseUrl = '';
  
  static Future<String> get baseUrl async {
    if (_baseUrl.isNotEmpty) return _baseUrl;
    
    // Determine base host based on platform
    String host;
    if (Platform.isAndroid) {
      host = '10.0.2.2'; // Android Emulator
    } else if (Platform.isIOS) {
      host = 'localhost'; // iOS Simulator
    } else {
      host = 'localhost'; // Desktop/Web
    }
    
    // Try port 5001 first (macOS default), then 5000
    for (int port in [5001, 5000]) {
      try {
        final response = await http.get(
          Uri.parse('http://$host:$port/status'),
        ).timeout(Duration(seconds: 2));
        
        if (response.statusCode == 200) {
          _baseUrl = 'http://$host:$port';
          print('✅ Connected to API at $_baseUrl');
          return _baseUrl;
        }
      } catch (e) {
        // Try next port
      }
    }
    
    // Default fallback
    _baseUrl = 'http://$host:5000';
    print('⚠️ Using default: $_baseUrl');
    return _baseUrl;
  }
  
  // Reset base URL (useful for testing)
  static void resetBaseUrl() {
    _baseUrl = '';
  }

  Future<List<Book>> getBooks({String? type, int? limit}) async {
    final url = await baseUrl;
    var uri = Uri.parse('$url/books');
    if (type != null || limit != null) {
      uri = uri.replace(queryParameters: {
        if (type != null) 'type': type,
        if (limit != null) 'limit': limit.toString(),
      });
    }
    
    final response = await http.get(uri);
    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((json) => Book.fromJson(json)).toList();
    }
    throw Exception('Failed to load books');
  }

  Future<Book> getBookById(int id) async {
    final url = await baseUrl;
    final response = await http.get(Uri.parse('$url/books/$id'));
    if (response.statusCode == 200) {
      return Book.fromJson(json.decode(response.body));
    }
    throw Exception('Failed to load book');
  }

  Future<String> register(String email, String name) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/api-clients'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'clientEmail': email, 'clientName': name}),
    );
    if (response.statusCode == 201) {
      return json.decode(response.body)['accessToken'];
    }
    final errorData = json.decode(response.body);
    throw Exception(errorData['error'] ?? 'Failed to register');
  }

  Future<bool> validateToken(String token) async {
    try {
      final url = await baseUrl;
      final response = await http.get(
        Uri.parse('$url/orders'),
        headers: {'Authorization': 'Bearer $token'},
      );
      return response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }

  Future<String> createOrder(String token, int bookId, String customerName) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/orders'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: json.encode({'bookId': bookId, 'customerName': customerName}),
    );
    if (response.statusCode == 201) {
      return json.decode(response.body)['orderId'];
    }
    throw Exception(json.decode(response.body)['error'] ?? 'Failed to create order');
  }

  Future<List<Order>> getOrders(String token) async {
    final url = await baseUrl;
    final response = await http.get(
      Uri.parse('$url/orders'),
      headers: {'Authorization': 'Bearer $token'},
    );
    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((json) => Order.fromJson(json)).toList();
    }
    throw Exception('Failed to load orders');
  }

  Future<void> deleteOrder(String token, String orderId) async {
    final url = await baseUrl;
    final response = await http.delete(
      Uri.parse('$url/orders/$orderId'),
      headers: {'Authorization': 'Bearer $token'},
    );
    if (response.statusCode != 204) {
      throw Exception('Failed to delete order');
    }
  }

  Future<void> updateOrder(String token, String orderId, String customerName) async {
    final url = await baseUrl;
    final response = await http.patch(
      Uri.parse('$url/orders/$orderId'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: json.encode({'customerName': customerName}),
    );
    if (response.statusCode != 204) {
      throw Exception('Failed to update order');
    }
  }
}
