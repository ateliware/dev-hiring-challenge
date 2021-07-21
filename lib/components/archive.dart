import 'package:dev_challenge/components/listSaved.dart';
import 'package:flutter/material.dart';

class Archive extends StatefulWidget {
  Archive({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  _ArchiveState createState() => _ArchiveState();
}

class _ArchiveState extends State<Archive> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        alignment: Alignment.center,
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Expanded(
                child: ListArchive(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
