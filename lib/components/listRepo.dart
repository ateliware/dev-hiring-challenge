import 'package:dev_challenge/beans/repo.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:url_launcher/url_launcher.dart';

class ListRepository extends StatelessWidget {
  const ListRepository({Key? key, required this.repositories}): super(key: key);

  final List<Repository> repositories;
  static final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  static final _CollectionReference = _firestore.collection("Repos").doc("Repositorio").collection("Repositorios");
  static final CollectionReference repo = _CollectionReference;

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemBuilder: (context, index) {
        return Card(
          child: Column(
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.all(1.0),
                child: ListTile(
                  title: Text("Repositório: " + repositories[index].name),
                  subtitle: Text("Proprietário: " + repositories[index].owner.login +
                      "\n" + repositories[index].htmlUrl + "\n" +
                      "Problemas: " +repositories[index].openIssues.toString() +
                      " Forks: " + repositories[index].openIssues.toString() +
                      " Seguindo: " + repositories[index].watchers.toString()
                  )
                ),
              ),
              ButtonBar(
                children: <Widget>[
                  IconButton(
                    icon: Icon(Icons.save),
                    onPressed: () async {
                      saveRepo(repositories[index]);
                    },
                  ),
                  IconButton(
                    icon: Icon(Icons.link),
                    onPressed: () async {
                      var url = repositories[index].htmlUrl;
                      launch(url.toString());
                    },
                  )
                ],
              ),
            ],
          ),
          elevation: 2.0,
        );
      },
    itemCount: repositories.length);
  }

  saveRepo(Repository repo) async{
    Map<String,dynamic> repoData = {
      "id": repo.id,
      "name": repo.name,
      "private": repo.private,
      "htmlUrl": repo.htmlUrl,
      "url": repo.url,
      "createdAt": repo.createdAt,
      "forks": repo.forks,
      "openIssues": repo.openIssues,
      "watchers": repo.watchers,
      "owner_id": repo.owner.id,
      "owner_login": repo.owner.login
    };
    _CollectionReference.add(repoData)
      .then((value) => Fluttertoast.showToast(msg: "Repositório Salvo"))
      .catchError((error) => print("Failed to add user: $error")
    );
  }
}