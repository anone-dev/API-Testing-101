import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/order.dart';
import '../services/api_service.dart';
import '../providers/auth_provider.dart';

class OrdersScreen extends StatefulWidget {
  const OrdersScreen({super.key});

  @override
  State<OrdersScreen> createState() => _OrdersScreenState();
}

class _OrdersScreenState extends State<OrdersScreen> {
  final ApiService _apiService = ApiService();
  List<Order> _orders = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadOrders();
  }

  Future<void> _loadOrders() async {
    setState(() => _isLoading = true);
    try {
      final token = context.read<AuthProvider>().token!;
      final orders = await _apiService.getOrders(token);
      setState(() => _orders = orders);
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

  Future<void> _deleteOrder(String orderId) async {
    try {
      final token = context.read<AuthProvider>().token!;
      await _apiService.deleteOrder(token, orderId);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Order deleted')),
        );
        _loadOrders();
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e')),
        );
      }
    }
  }

  Future<void> _updateOrder(String orderId, String currentName) async {
    final controller = TextEditingController(text: currentName);
    final result = await showDialog<String>(
      context: context,
      builder: (context) => AlertDialog(
        key: const Key('update_order_dialog'),
        title: const Text('Update Customer Name'),
        content: TextField(
          key: const Key('update_customer_name_input'),
          controller: controller,
          decoration: const InputDecoration(
            labelText: 'Customer Name',
            border: OutlineInputBorder(),
          ),
          autofocus: true,
        ),
        actions: [
          TextButton(
            key: const Key('update_cancel_button'),
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          TextButton(
            key: const Key('update_confirm_button'),
            onPressed: () => Navigator.pop(context, controller.text),
            child: const Text('Update'),
          ),
        ],
      ),
    );

    if (result != null && result.isNotEmpty && result != currentName) {
      try {
        final token = context.read<AuthProvider>().token!;
        await _apiService.updateOrder(token, orderId, result);
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Order updated')),
          );
          _loadOrders();
        }
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Error: $e')),
          );
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return _isLoading
        ? const Center(child: CircularProgressIndicator())
        : _orders.isEmpty
            ? const Center(child: Text('No orders yet'))
            : RefreshIndicator(
                onRefresh: _loadOrders,
                child: ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: _orders.length,
                  itemBuilder: (context, index) {
                    final order = _orders[index];
                    return Card(
                      key: Key('order_card_${order.id}'),
                      margin: const EdgeInsets.only(bottom: 12),
                      child: ListTile(
                        leading: const CircleAvatar(child: Icon(Icons.shopping_bag)),
                        title: Text('Order #${order.id}'),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Customer: ${order.customerName}'),
                            Text('Book ID: ${order.bookId}'),
                          ],
                        ),
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            IconButton(
                              key: Key('edit_order_${order.id}'),
                              icon: const Icon(Icons.edit, color: Colors.blue),
                              onPressed: () => _updateOrder(order.id, order.customerName),
                            ),
                            IconButton(
                              key: Key('delete_order_${order.id}'),
                              icon: const Icon(Icons.delete, color: Colors.red),
                              onPressed: () => showDialog(
                                context: context,
                                builder: (context) => AlertDialog(
                                  key: const Key('delete_order_dialog'),
                                  title: const Text('Delete Order'),
                                  content: const Text('Are you sure?'),
                                  actions: [
                                    TextButton(
                                      key: const Key('delete_cancel_button'),
                                      onPressed: () => Navigator.pop(context),
                                      child: const Text('Cancel'),
                                    ),
                                    TextButton(
                                      key: const Key('delete_confirm_button'),
                                      onPressed: () {
                                        Navigator.pop(context);
                                        _deleteOrder(order.id);
                                      },
                                      child: const Text('Delete', style: TextStyle(color: Colors.red)),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              );
  }
}
