import 'package:flutter/material.dart';

class Config extends StatefulWidget {
  @override
  _ConfigState createState() => _ConfigState();
}

class _ConfigState extends State<Config> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: Card(
          child: Image.asset("images/ateliware.png"),
        ),
      ),
    );
  }
}
