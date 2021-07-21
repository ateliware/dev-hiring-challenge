import 'dart:convert';
import 'package:dev_challenge/components/listRepo.dart';
import 'package:dev_challenge/beans/repo.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class Search extends StatefulWidget {
  Search({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  _SearchState createState() => _SearchState();
}

class _SearchState extends State<Search> {
  List<Repository> _listRepos = [];
  TextEditingController _searchController = new TextEditingController();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  var _finishListing = true;
  var _page = 1;
  var _language = "";

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
              TextFormField(
                controller: _searchController,
                decoration: InputDecoration(
                  hintText: 'Linguagem',
                  contentPadding: EdgeInsets.all(20.0),
                  suffixIcon: IconButton(
                    onPressed: () {
                      if(_searchController.text.isNotEmpty) {
                        setState(() {
                          _listRepos.clear();
                          _language = (_searchController.text);
                          _page = 1;
                        });
                        searchGitHub(_searchController.text);
                      }
                    },
                    icon: Icon(Icons.search, color: Colors.grey)
                    )
                  ),
              ),
              Expanded(
                child: ListRepository(
                  repositories: _listRepos,
                ),
              ),
              Visibility(
                visible: _finishListing,
                child: TextButton(
                  onPressed: () {
                    if(_language.isNotEmpty) {
                      searchGitHub(_language);
                    }
                  },
                  child: Text(
                    'Carregar Mais',
                  ),
                )
              )
            ],
          ),
        ),
      ),
    );
  }

  Future<void> searchGitHub(String language) async {
    var responseJson = await http.get(Uri.parse("https://api.github.com/search/repositories?q=$language&page=$_page&per_page=20"));
    var body = jsonDecode(responseJson.body);

    if (body['items'] == null) {
      setState(() {
        _finishListing = true;
      });
      return;
    }

    setState(() {
      _page = _page + 1;
      _listRepos += (body['items'] as List).map((e) => Repository.fromJson(e)).toList();
    });
  }
}
