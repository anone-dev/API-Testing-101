import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/book.dart';
import '../models/order.dart';

class ApiService {
  // Android Emulator - ใช้ 10.0.2.2 (localhost ของ host machine)
  // ถ้าไม่ได้ให้ใช้ IP จริงของเครื่อง เช่น 192.168.1.100
  static const String baseUrl = 'http://10.0.2.2:5000'; // Android Emulator
  // static const String baseUrl = 'http://192.168.1.100:5000'; // ใช้ IP จริง
  // static const String baseUrl = 'http://localhost:5000'; // iOS Simulator

  Future<List<Book>> getBooks({String? type, int? limit}) async {
    var uri = Uri.parse('$baseUrl/books');
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
    final response = await http.get(Uri.parse('$baseUrl/books/$id'));
    if (response.statusCode == 200) {
      return Book.fromJson(json.decode(response.body));
    }
    throw Exception('Failed to load book');
  }

  Future<String> register(String email, String name) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api-clients'),
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
      final response = await http.get(
        Uri.parse('$baseUrl/orders'),
        headers: {'Authorization': 'Bearer $token'},
      );
      return response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }

  Future<String> createOrder(String token, int bookId, String customerName) async {
    final response = await http.post(
      Uri.parse('$baseUrl/orders'),
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
    final response = await http.get(
      Uri.parse('$baseUrl/orders'),
      headers: {'Authorization': 'Bearer $token'},
    );
    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((json) => Order.fromJson(json)).toList();
    }
    throw Exception('Failed to load orders');
  }

  Future<void> deleteOrder(String token, String orderId) async {
    final response = await http.delete(
      Uri.parse('$baseUrl/orders/$orderId'),
      headers: {'Authorization': 'Bearer $token'},
    );
    if (response.statusCode != 204) {
      throw Exception('Failed to delete order');
    }
  }

  Future<void> updateOrder(String token, String orderId, String customerName) async {
    final response = await http.patch(
      Uri.parse('$baseUrl/orders/$orderId'),
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
