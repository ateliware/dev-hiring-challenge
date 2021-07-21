import 'package:dev_challenge/components/archive.dart';
import 'package:flutter/material.dart';
import 'package:dev_challenge/components/search.dart';
import 'package:firebase_core/firebase_core.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: Firebase.initializeApp(),
      builder: (context, snapshot) {
        return MaterialApp(
          debugShowCheckedModeBanner: false,
          title: 'Dev Challenge',
          theme: ThemeData(
            primarySwatch: Colors.blue,
          ),
          home: MyHomePage(title: 'Dev Challenge'),
        );
      },
    );
  }
}

class MyHomePage extends StatefulWidget {
  final String title;

  const MyHomePage({Key? key, required this.title}) : super(key: key);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: new AppBar(
        title: new Text(widget.title),
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            Padding(padding: EdgeInsets.all(30.0)),
            ListTile(
              leading: Icon(Icons.search),
              title: Text('Buscar Repositórios'),
              selected: 0 == _selectedIndex,
              onTap: () {
                _onSelectItem(0);
              },
            ),
            ListTile(
              leading: Icon(Icons.favorite),
              title: Text('Repositórios Salvos'),
              selected: 1 == _selectedIndex,
              onTap: () {
                _onSelectItem(1);
              },
            ),
          ],
        ),
      ),
      body: _getDrawerItem(_selectedIndex),
    );
  }

  _getDrawerItem(int pos) {
    switch (pos) {
      case 0:
        return Search(title: "Buscar Repositórios");
      case 1:
        return Archive(title: "Repositórios Salvos");
    }
  }

  _onSelectItem(int index) {
    setState(() => _selectedIndex = index);
    Navigator.of(context).pop();
  }
}