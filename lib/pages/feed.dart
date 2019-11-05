import 'package:flutter/material.dart';

class FeedPage extends StatefulWidget {
  @override
  _FeedPageState createState() => _FeedPageState();
}

class _FeedPageState extends State<FeedPage> {
  @override
  Widget build(BuildContext context) {
    //Monta os cards com as opções de linguagem.
    return Center(
      child: GridView.count(
        crossAxisCount: 2,
        mainAxisSpacing: 2,
        crossAxisSpacing: 2,
        padding: EdgeInsets.only(top: 20, right: 3, left: 3),
        childAspectRatio: 8 / 9,
        children: <Widget>[
          Card(
            color: Colors.red[900],
            clipBehavior: Clip.antiAlias,
            child: InkWell(
              onTap: () async {
                Navigator.pushNamed(context, '/search',
                    arguments: "javascript");
              },
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  AspectRatio(
                    aspectRatio: 18 / 13,
                    child: Image.asset('images/javascript.png',
                        fit: BoxFit.fitWidth),
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 15),
                    child: Center(
                      child: Text('Java Script',
                          style: TextStyle(fontSize: 15, color: Colors.white)),
                    ),
                  )
                ],
              ),
            ),
          ),
          Card(
            color: Colors.red[900],
            clipBehavior: Clip.antiAlias,
            child: InkWell(
              onTap: () async {
                Navigator.pushNamed(context, '/search', arguments: "dart");
              },
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  AspectRatio(
                    aspectRatio: 18 / 13,
                    child: Image.asset('images/dart.png', fit: BoxFit.fitWidth),
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 16),
                    child: Center(
                      child: Text('Dart',
                          style: TextStyle(fontSize: 15, color: Colors.white)),
                    ),
                  )
                ],
              ),
            ),
          ),
          Card(
            color: Colors.red[900],
            clipBehavior: Clip.antiAlias,
            child: InkWell(
              onTap: () async {
                Navigator.pushNamed(context, '/search', arguments: "java");
              },
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  AspectRatio(
                    aspectRatio: 18 / 13,
                    child: Image.asset('images/java.png', fit: BoxFit.fitWidth),
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 21),
                    child: Center(
                      child: Text('Java',
                          style: TextStyle(fontSize: 15, color: Colors.white)),
                    ),
                  )
                ],
              ),
            ),
          ),
          Card(
            color: Colors.red[900],
            clipBehavior: Clip.antiAlias,
            child: InkWell(
              onTap: () async {
                Navigator.pushNamed(context, '/search', arguments: "python");
              },
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  AspectRatio(
                    aspectRatio: 18 / 13,
                    child:
                        Image.asset('images/python.png', fit: BoxFit.fitWidth),
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 21),
                    child: Center(
                      child: Text('Python',
                          style: TextStyle(fontSize: 15, color: Colors.white)),
                    ),
                  ),
                ],
              ),
            ),
          ),
          Card(
            color: Colors.red[900],
            clipBehavior: Clip.antiAlias,
            child: InkWell(
              onTap: () async {
                Navigator.pushNamed(context, '/search', arguments: "c#");
              },
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  AspectRatio(
                    aspectRatio: 18 / 13,
                    child:
                        Image.asset('images/dotNet.png', fit: BoxFit.fitWidth),
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 21),
                    child: Center(
                      child: Text('C#',
                          style: TextStyle(fontSize: 15, color: Colors.white)),
                    ),
                  ),
                ],
              ),
            ),
          ),
          Card(
            color: Colors.red[900],
            clipBehavior: Clip.antiAlias,
            child: InkWell(
              onTap: () async {
                Navigator.pushNamed(context, '/search', arguments: "swift");
              },
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  AspectRatio(
                    aspectRatio: 18 / 13,
                    child:
                        Image.asset('images/swift.png', fit: BoxFit.fitWidth),
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 21),
                    child: Center(
                      child: Text('Swift',
                          style: TextStyle(fontSize: 15, color: Colors.white)),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
