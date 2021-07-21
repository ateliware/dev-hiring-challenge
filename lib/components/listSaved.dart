import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/widgets.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:url_launcher/url_launcher.dart';

class ListArchive extends StatelessWidget {

  static final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  static final _CollectionReference = _firestore.collection("Repos").doc("Repositorio").collection("Repositorios");
  
  @override
  Widget build(BuildContext context) {
    return StreamBuilder<QuerySnapshot>(
      stream: _CollectionReference.snapshots(),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          final List<DocumentSnapshot> documents = snapshot.data!.docs;
          return ListView(
            children: documents.map((doc) => Card(
              child: Column(
                children: <Widget>[
                  Padding(
                    padding: const EdgeInsets.all(1.0),
                    child: ListTile(
                      title: Text("Repositório: " + doc['name']),
                      subtitle: Text("Proprietário: " + doc['owner_login'] +
                          "\n" + doc['htmlUrl'] + "\n" +
                          "Problemas: " + doc['openIssues'].toString() +
                          " Forks: " + doc['forks'].toString() +
                          " Seguindo: " + doc['watchers'].toString()
                      )
                    ),
                  ),
                  ButtonBar(
                    children: <Widget>[
                      IconButton(
                        icon: Icon(Icons.delete),
                        onPressed: () async {
                          deleteRepo(doc);
                        },
                      ),
                      IconButton(
                        icon: Icon(Icons.link),
                        onPressed: () async {
                          var url = doc['htmlUrl'];
                          launch(url.toString());
                        },
                      )
                    ],
                  ),
                ],
              ),
            )).toList(),
          );
        } else {
          return Text('Nenhum repositório salvo');
        }
      }
    );
  }
  deleteRepo(DocumentSnapshot<Object?> doc) async{
    _CollectionReference.doc(doc.id).delete()
        .then((value) => Fluttertoast.showToast(msg: "Repositório Salvo"))
        .catchError((error) => print("Failed to add user: $error")
    );
  }
}