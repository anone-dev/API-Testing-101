class Book {
  final int id;
  final String name;
  final String type;
  final bool available;
  final String? author;
  final String? isbn;
  final double? price;
  final int? currentStock;

  Book({
    required this.id,
    required this.name,
    required this.type,
    required this.available,
    this.author,
    this.isbn,
    this.price,
    this.currentStock,
  });

  factory Book.fromJson(Map<String, dynamic> json) {
    return Book(
      id: json['id'],
      name: json['name'],
      type: json['type'],
      available: json['available'],
      author: json['author'],
      isbn: json['isbn'],
      price: json['price']?.toDouble(),
      currentStock: json['current-stock'],
    );
  }

  String get emoji {
    if (type == 'fiction') {
      final emojis = ['📚', '📖', '📕', '📗', '📘', '📙'];
      return emojis[id % emojis.length];
    } else {
      final emojis = ['📊', '💼', '🎓', '🔬', '💡', '🌍'];
      return emojis[id % emojis.length];
    }
  }
}
