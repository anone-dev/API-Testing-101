import 'package:flutter/material.dart';
import '../models/book.dart';
import '../services/api_service.dart';
import 'book_detail_screen.dart';

class BooksScreen extends StatefulWidget {
  const BooksScreen({super.key});

  @override
  State<BooksScreen> createState() => _BooksScreenState();
}

class _BooksScreenState extends State<BooksScreen> {
  final ApiService _apiService = ApiService();
  List<Book> _books = [];
  bool _isLoading = true;
  String? _filterType;

  @override
  void initState() {
    super.initState();
    _loadBooks();
  }

  Future<void> _loadBooks() async {
    setState(() => _isLoading = true);
    try {
      final books = await _apiService.getBooks(type: _filterType);
      setState(() => _books = books);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e')),
        );
      }
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(16),
          child: SegmentedButton<String?>(
            key: const Key('book_filter'),
            segments: const [
              ButtonSegment(value: null, label: Text('All')),
              ButtonSegment(value: 'fiction', label: Text('Fiction')),
              ButtonSegment(value: 'non-fiction', label: Text('Non-Fiction')),
            ],
            selected: {_filterType},
            onSelectionChanged: (Set<String?> newSelection) {
              setState(() => _filterType = newSelection.first);
              _loadBooks();
            },
          ),
        ),
        Expanded(
          child: _isLoading
              ? const Center(child: CircularProgressIndicator())
              : RefreshIndicator(
                  onRefresh: _loadBooks,
                  child: ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: _books.length,
                    itemBuilder: (context, index) {
                      final book = _books[index];
                      return Card(
                        key: Key('book_card_${book.id}'),
                        margin: const EdgeInsets.only(bottom: 12),
                        child: ListTile(
                          leading: CircleAvatar(
                            backgroundColor: book.type == 'fiction'
                                ? Colors.deepPurple
                                : Colors.orange,
                            child: Text(book.emoji, style: const TextStyle(fontSize: 24)),
                          ),
                          title: Text(book.name, style: const TextStyle(fontWeight: FontWeight.bold)),
                          subtitle: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('ID: ${book.id} | ${book.type.toUpperCase()}'),
                            ],
                          ),
                          trailing: Chip(
                            label: Text(book.available ? 'Available' : 'Out of Stock'),
                            backgroundColor: book.available ? Colors.green[100] : Colors.grey[300],
                          ),
                          onTap: () => Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) => BookDetailScreen(bookId: book.id),
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
        ),
      ],
    );
  }
}
