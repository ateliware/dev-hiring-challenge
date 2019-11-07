import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class RepositoriesPage extends StatefulWidget {
  @override
  _RepositoriesPageState createState() => _RepositoriesPageState();
}

class _RepositoriesPageState extends State<RepositoriesPage> {
  final databaseReference = Firestore.instance;

  List<DocumentSnapshot> _getRepositories = new List();

  _RepositoriesPageState() {
    databaseReference.collection("repositories").snapshots().listen((snapshot) {
      setState(() {
        _getRepositories = snapshot.documents;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
        itemCount: _getRepositories.length,
        itemBuilder: (BuildContext ctx, int index) {
          DocumentSnapshot repository = _getRepositories.elementAt(index);

          return Padding(
            padding: const EdgeInsets.only(top: 10, left: 5, right: 5),
            child: Container(
              child: Card(
                clipBehavior: Clip.antiAlias,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: Container(
                        height: 300,
                        decoration: BoxDecoration(
                            image: DecorationImage(
                          fit: BoxFit.fill,
                          image: NetworkImage(repository["avatar"]),
                        )
                            // ignore: missing_return
                            ),
                      ),
                    ),
                    Divider(
                      height: 20,
                      color: Colors.black,
                    ),
                    Column(
                      children: <Widget>[
                        Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            Icon(Icons.star),
                            Padding(
                              padding: const EdgeInsets.all(2),
                              child: Text(" " + repository["stars"].toString()),
                            ),
                          ],
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(
                            repository["name"],
                            style: TextStyle(
                              fontSize: 25,
                            ),
                          ),
                        ),
                        RaisedButton(
                            child: Text('Excluir',
                                style: TextStyle(color: Colors.white)),
                            elevation: 8.0,
                            color: Colors.red[900],
                            onPressed: () => {_delete(repository)}),
                      ],
                    )
                  ],
                ),
              ),
            ),
          );
        });
  }

  void _delete(DocumentSnapshot repository) {
    try {
      databaseReference
          .collection('repositories')
          .document(repository.documentID)
          .delete();
    } catch (e) {
      print(e.toString());
    }
  }
}
