import 'package:flutter/material.dart';
import 'package:hiring_app/dao/database.dart';
import 'package:hiring_app/models/repository.dart';

class RepositoriesPage extends StatefulWidget {
  @override
  _RepositoriesPageState createState() => _RepositoriesPageState();
}

class _RepositoriesPageState extends State<RepositoriesPage> {
  Banco _data;
  List<Repository> _getRepositories = new List();

  @override
  Widget build(BuildContext context) {

    //Aqui é montada a lista de repositórios favoritos
    return ListView.builder(
        itemCount: _getRepositories.length,
        itemBuilder: (BuildContext ctx, int index) {
          Repository repository = _getRepositories.elementAt(index);

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
                          image: NetworkImage(repository.avatar),
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
                            Text(" " + repository.stars.toString()),
                          ],
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(
                            repository.name,
                            style: TextStyle(
                              fontSize: 25,
                            ),
                          ),
                        ),
                      ],
                    )
                  ],
                ),
              ),
            ),
          );
        });
  }

  //Metodos para inicialização do banco
  void _startDatabase() async {
    _data = await Banco.get();
    _getRepositories = await _data.getRepositories();
  }

  @override
  void initState() {
    super.initState();
    _startDatabase();
  }
}
