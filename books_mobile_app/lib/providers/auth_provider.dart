import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/api_service.dart';

class AuthProvider with ChangeNotifier {
  String? _token;
  final ApiService _apiService = ApiService();

  String? get token => _token;
  bool get isAuthenticated => _token != null;

  Future<void> loadToken() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString('token');
    notifyListeners();
  }

  Future<void> register(String email, String name) async {
    _token = await _apiService.register(email, name);
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('token', _token!);
    notifyListeners();
  }

  Future<bool> loginWithToken(String token) async {
    final isValid = await _apiService.validateToken(token);
    if (isValid) {
      _token = token;
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', _token!);
      notifyListeners();
      return true;
    }
    return false;
  }

  Future<void> logout() async {
    _token = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
    notifyListeners();
  }
}
