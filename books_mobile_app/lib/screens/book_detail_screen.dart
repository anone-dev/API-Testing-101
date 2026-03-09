import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/book.dart';
import '../services/api_service.dart';
import '../providers/auth_provider.dart';

class BookDetailScreen extends StatefulWidget {
  final int bookId;
  const BookDetailScreen({super.key, required this.bookId});

  @override
  State<BookDetailScreen> createState() => _BookDetailScreenState();
}

class _BookDetailScreenState extends State<BookDetailScreen> {
  final ApiService _apiService = ApiService();
  final _nameController = TextEditingController();
  Book? _book;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadBook();
  }

  Future<void> _loadBook() async {
    try {
      final book = await _apiService.getBookById(widget.bookId);
      setState(() {
        _book = book;
        _isLoading = false;
      });
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e')),
        );
      }
    }
  }

  Future<void> _createOrder() async {
    if (_nameController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter customer name')),
      );
      return;
    }

    try {
      final token = context.read<AuthProvider>().token!;
      await _apiService.createOrder(token, widget.bookId, _nameController.text);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Order created successfully!')),
        );
        Navigator.pop(context);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Book Details')),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Center(
                    child: Container(
                      key: const Key('book_emoji'),
                      width: 120,
                      height: 120,
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: _book!.type == 'fiction'
                              ? [const Color(0xFF667eea), const Color(0xFF764ba2)]
                              : [const Color(0xFFf2994a), const Color(0xFFf2c94c)],
                        ),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Center(
                        child: Text(_book!.emoji, style: const TextStyle(fontSize: 60)),
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  Text(_book!.name, key: const Key('book_name'), style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  Chip(key: const Key('book_type'), label: Text(_book!.type.toUpperCase())),
                  const SizedBox(height: 16),
                  if (_book!.author != null) _DetailRow('Author', _book!.author!, key: const Key('book_author')),
                  if (_book!.isbn != null) _DetailRow('ISBN', _book!.isbn!, key: const Key('book_isbn')),
                  if (_book!.price != null) _DetailRow('Price', '\$${_book!.price}', key: const Key('book_price')),
                  if (_book!.currentStock != null) _DetailRow('Stock', '${_book!.currentStock}', key: const Key('book_stock')),
                  _DetailRow('Status', _book!.available ? 'Available' : 'Out of Stock', key: const Key('book_status')),
                  const SizedBox(height: 24),
                  const Text('Create Order', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  TextField(
                    key: const Key('customer_name_input'),
                    controller: _nameController,
                    decoration: const InputDecoration(
                      labelText: 'Customer Name',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  const SizedBox(height: 16),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      key: const Key('create_order_button'),
                      onPressed: _createOrder,
                      style: ElevatedButton.styleFrom(padding: const EdgeInsets.all(16)),
                      child: const Text('Create Order'),
                    ),
                  ),
                ],
              ),
            ),
    );
  }
}

class _DetailRow extends StatelessWidget {
  final String label;
  final String value;
  const _DetailRow(this.label, this.value, {super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          SizedBox(width: 100, child: Text(label, style: const TextStyle(fontWeight: FontWeight.bold))),
          Expanded(child: Text(value)),
        ],
      ),
    );
  }
}
