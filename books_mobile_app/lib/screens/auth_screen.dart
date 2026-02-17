import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _nameController = TextEditingController();
  final _tokenController = TextEditingController();
  bool _isLoading = false;
  bool _isLoginMode = false;

  Future<void> _register() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);
    try {
      await context.read<AuthProvider>().register(
        _emailController.text,
        _nameController.text,
      );
    } catch (e) {
      if (mounted) {
        final errorMsg = e.toString().replaceFirst('Exception: ', '');
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(errorMsg),
            backgroundColor: Colors.red,
            duration: const Duration(seconds: 4),
          ),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _loginWithToken() async {
    if (_tokenController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter token')),
      );
      return;
    }

    setState(() => _isLoading = true);
    try {
      final success = await context.read<AuthProvider>().loginWithToken(_tokenController.text);
      if (!success && mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Invalid token. Please register.'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF667eea), Color(0xFF764ba2)],
          ),
        ),
        child: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              child: Card(
                elevation: 8,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Text(
                          '📚 Books App',
                          style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 8),
                        Text(_isLoginMode ? 'Login with Token' : 'Register to get started'),
                        const SizedBox(height: 24),
                        if (_isLoginMode)
                          TextFormField(
                            key: const Key('token_input'),
                            controller: _tokenController,
                            decoration: InputDecoration(
                              labelText: 'Access Token',
                              border: const OutlineInputBorder(),
                              prefixIcon: const Icon(Icons.key),
                              suffixIcon: IconButton(
                                key: const Key('paste_token_button'),
                                icon: const Icon(Icons.paste),
                                tooltip: 'Paste from clipboard',
                                onPressed: () async {
                                  final data = await Clipboard.getData('text/plain');
                                  if (data?.text != null) {
                                    _tokenController.text = data!.text!;
                                  }
                                },
                              ),
                            ),
                            validator: (v) => v?.isNotEmpty == true ? null : 'Required',
                          ),
                        if (!_isLoginMode)
                          TextFormField(
                            key: const Key('email_input'),
                            controller: _emailController,
                            decoration: const InputDecoration(
                              labelText: 'Email',
                              border: OutlineInputBorder(),
                              prefixIcon: Icon(Icons.email),
                            ),
                            keyboardType: TextInputType.emailAddress,
                            validator: (v) => v?.contains('@') == true ? null : 'Invalid email',
                          ),
                        if (!_isLoginMode)
                          const SizedBox(height: 16),
                        if (!_isLoginMode)
                          TextFormField(
                            key: const Key('name_input'),
                            controller: _nameController,
                            decoration: const InputDecoration(
                              labelText: 'Name',
                              border: OutlineInputBorder(),
                              prefixIcon: Icon(Icons.person),
                            ),
                            validator: (v) => v?.isNotEmpty == true ? null : 'Required',
                          ),
                        const SizedBox(height: 24),
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            key: Key(_isLoginMode ? 'login_button' : 'register_button'),
                            onPressed: _isLoading ? null : (_isLoginMode ? _loginWithToken : _register),
                            style: ElevatedButton.styleFrom(
                              padding: const EdgeInsets.all(16),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                            ),
                            child: _isLoading
                                ? const CircularProgressIndicator()
                                : Text(_isLoginMode ? 'Login' : 'Register', style: const TextStyle(fontSize: 16)),
                          ),
                        ),
                        const SizedBox(height: 12),
                        TextButton(
                          key: const Key('toggle_mode_button'),
                          onPressed: () => setState(() => _isLoginMode = !_isLoginMode),
                          child: Text(_isLoginMode ? 'Need to register? Click here' : 'Have a token? Login here'),
                        ),
                        const SizedBox(height: 16),
                        const Text(
                          'Developed by: Anan.Ph : QA-CoE',
                          style: TextStyle(fontSize: 12, color: Colors.black54),
                        ),
                        const Text(
                          '2026-02-17',
                          style: TextStyle(fontSize: 11, color: Colors.black38),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
