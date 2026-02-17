class Order {
  final String id;
  final int bookId;
  final String customerName;
  final int? quantity;
  final String createdBy;

  Order({
    required this.id,
    required this.bookId,
    required this.customerName,
    this.quantity,
    required this.createdBy,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['id'],
      bookId: json['bookId'],
      customerName: json['customerName'],
      quantity: json['quantity'],
      createdBy: json['createdBy'],
    );
  }
}
