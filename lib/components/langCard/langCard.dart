import 'package:flutter/material.dart';

class LangCard extends StatelessWidget {
  final String langName;
  final int langId;
  const LangCard({Key? key, required this.langName, required this.langId}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      key: Key(langName),
      child: InkWell(
        borderRadius: BorderRadius.circular(4),
        onTap: () {
          Navigator.pushNamed(context, '/repositories', arguments: langId);
        },
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset('assets/${langName.toLowerCase()}.png', height: 80),
              const SizedBox(height: 10),
              Text(
                langName,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
