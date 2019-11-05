import 'package:flutter/material.dart';
import 'package:hiring_app/api/api.dart';
import 'package:hiring_app/models/repository.dart';
import 'package:hiring_app/pages/repository.dart';

import 'dialog.dart';
import 'feed.dart';

class SearchPage extends StatefulWidget {
  @override
  _SearchPageState createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  int _indiceAtual = 1;

  @override
  Widget build(BuildContext context) {
    String language = ModalRoute.of(context).settings.arguments;

    List<Widget> pages = [RepositoriesPage(), FeedPage(), SearchPage()];

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.red[900],
        title: Text(""),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.account_circle),
            onPressed: () {
              print("conta");
            },
          ),
        ],
      ),
      body: GetBody(language),
      bottomNavigationBar: getBottom(),
    );
  }

  //Retorna a tela de acordo com a resposta do servidor.
  GetBody(language) {
    return Card(
      child: FutureBuilder<List<Repository>>(
        future: _getRepositories(language),
        // ignore: missing_return
        builder: (context, snapashot) {
          switch (snapashot.connectionState) {
            case ConnectionState.none:
            case ConnectionState.waiting:
              return Center(
                child: CircularProgressIndicator(),
              );
              break;
            case ConnectionState.active:
            case ConnectionState.done:
              if (snapashot.hasData) {
                return ListView.builder(
                    itemBuilder: (context, index) {
                      List<Repository> repositories = snapashot.data;
                      Repository repository = repositories[index];

                      return Padding(
                        padding:
                            const EdgeInsets.only(top: 10, left: 5, right: 5),
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
                                    RaisedButton(
                                      child: Text('Detalhes',
                                          style:
                                              TextStyle(color: Colors.white)),
                                      elevation: 8.0,
                                      color: Colors.red[900],
                                      onPressed: () => _showDetails(
                                          repositoryDetails: repository,
                                          index: index),
                                    ),
                                  ],
                                )
                              ],
                            ),
                          ),
                        ),
                      );
                    },
                    itemCount: snapashot.data.length);
              } else {
                return Center(
                  child: Text("Nenhum resultado encontrado."),
                );
              }
              break;
          }
        },
      ),
    );
  }

  getBottom() {
    return BottomNavigationBar(
        type: BottomNavigationBarType.shifting,
        currentIndex: _indiceAtual,
        onTap: (indice) {
          setState(() {
            _indiceAtual = indice;
          });

          if (indice != null) {
            Navigator.pushNamed(context, '/home');
          }
        },
        items: [
          BottomNavigationBarItem(
              backgroundColor: Colors.red[900],
              title: Text("Favorites"),
              icon: Icon(Icons.star, color: Colors.white)),
          BottomNavigationBarItem(
              backgroundColor: Colors.red[900],
              title: Text("Home"),
              icon: Icon(Icons.home, color: Colors.white)),
          BottomNavigationBarItem(
              backgroundColor: Colors.red[900],
              title: Text("Search"),
              icon: Icon(Icons.search, color: Colors.white))
        ]);
  }

  //metodo para abrir pop-up com detalhes do repositório
  void _showDetails({Repository repositoryDetails, int index}) async {
    final repository = await showDialog<Repository>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return DialogRepository(repository: repositoryDetails);
      },
    );
  }

  //Faz a requisição no servidor
  _getRepositories(language) {
    Api api = Api();
    return api.getRepositories(language);
  }
}
