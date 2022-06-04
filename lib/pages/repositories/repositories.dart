import 'package:flutter/material.dart';
import 'package:github_repository/api/api.dart';
import 'package:github_repository/components/customAppBar/customAppBar.dart';
import 'package:github_repository/database/database.dart';
import 'package:github_repository/models/repositoryModel.dart';

class Repositories extends StatefulWidget {
  final int langId;
  const Repositories({Key? key, required this.langId}) : super(key: key);

  @override
  State<Repositories> createState() => _RepositoriesState();
}

class _RepositoriesState extends State<Repositories> {
  DatabaseHelper db = DatabaseHelper();
  List<RepositoryModel> repositories = [];

  @override
  void initState() {
    fetchRepositories();
    super.initState();
  }

  fetchRepositories() async {
    //Busca no banco de dados os repositorios ja previamente cadastrados
    List<RepositoryModel> result = await db.fetchRepositoryByLang(widget.langId);

    if (result.isEmpty) {
      dynamic response = await Api.fetchRepositoriesByLang(widget.langId);

      if (response != null && response['items'] != null) {
        for (Map it in (response['items'] as List)) {
          print(it);
          repositories.add(
            RepositoryModel(
              id: it['id'],
              name: it['name'],
              description: it['description'],
              ownerName: it['owner']['login'],
              ownerPicture: it['owner']['avatar_url'],
              language: widget.langId,
              forksCount: it['forks_count'],
              watchersCount: it['watchers_count'],
              stargazersCount: it['stargazers_count'],
            ),
          );
        }
      }
    } else {
      repositories = result;
    }

    if (mounted) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: CustomAppBar(title: 'Repositórios'),
    );
  }
}
