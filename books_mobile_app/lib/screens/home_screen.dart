import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import 'books_screen.dart';
import 'orders_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const BooksScreen(),
    const OrdersScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('📚 Books App'),
        actions: [
          IconButton(
            key: const Key('info_button'),
            icon: const Icon(Icons.info_outline),
            onPressed: () {
              final token = context.read<AuthProvider>().token ?? '';
              showDialog(
                context: context,
                builder: (context) => AlertDialog(
                  title: const Text('App Information'),
                  content: SingleChildScrollView(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Books Mobile App',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                        ),
                        const SizedBox(height: 8),
                        const Text('Version: 1.0.0'),
                        const Divider(height: 24),
                        const Text(
                          'Developed by: Anan.Ph : QA-CoE',
                          style: TextStyle(fontWeight: FontWeight.bold),
                        ),
                        const Text('Date: 2026-02-17'),
                        const Divider(height: 24),
                        const Text(
                          'Access Token:',
                          style: TextStyle(fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 8),
                        Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: Colors.grey[200],
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: SelectableText(
                            token,
                            style: const TextStyle(fontSize: 12, fontFamily: 'monospace'),
                          ),
                        ),
                      ],
                    ),
                  ),
                  actions: [
                    TextButton(
                      onPressed: () {
                        Clipboard.setData(ClipboardData(text: token));
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Token copied to clipboard')),
                        );
                      },
                      child: const Text('Copy Token'),
                    ),
                    TextButton(
                      onPressed: () => Navigator.pop(context),
                      child: const Text('Close'),
                    ),
                  ],
                ),
              );
            },
          ),
          IconButton(
            key: const Key('logout_button'),
            icon: const Icon(Icons.logout),
            onPressed: () => context.read<AuthProvider>().logout(),
          ),
        ],
      ),
      body: _screens[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        key: const Key('bottom_nav'),
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.book), label: 'Books'),
          BottomNavigationBarItem(icon: Icon(Icons.shopping_cart), label: 'Orders'),
        ],
      ),
    );
  }
}
