import 'package:flutter/material.dart';
import 'package:github_repository/api/api.dart';
import 'package:github_repository/components/customAppBar/customAppBar.dart';
import 'package:github_repository/database/database.dart';
import 'package:github_repository/models/repositoryModel.dart';
import 'package:skeleton_loader/skeleton_loader.dart';

class Repositories extends StatefulWidget {
  final int langId;
  const Repositories({Key? key, required this.langId}) : super(key: key);

  @override
  State<Repositories> createState() => _RepositoriesState();
}

class _RepositoriesState extends State<Repositories> {
  DatabaseHelper db = DatabaseHelper();
  List<RepositoryModel> repositories = [];
  bool isLoading = true;

  @override
  void initState() {
    fetchRepositories();
    super.initState();
  }

  fetchRepositories() async {
    if (mounted) {
      setState(() {
        isLoading = true;
      });
    }

    //Busca os repositorios na API do Github
    dynamic response = await Api.fetchRepositoriesByLang(widget.langId);

    if (response != null && response['items'] != null) {
      for (Map it in (response['items'] as List)) {
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

    if (mounted) {
      setState(() {
        isLoading = false;
      });
    }

    if (repositories.isNotEmpty) {
      repositories.forEach(db.insertRepositoryByLang);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Repositórios'),
      body: Visibility(
        replacement: SkeletonLoader(
          builder: Container(
            padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 10),
            child: Row(
              children: <Widget>[
                const CircleAvatar(
                  backgroundColor: Colors.white,
                  radius: 20,
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    children: <Widget>[
                      Container(
                        width: double.infinity,
                        height: 10,
                        color: Colors.white,
                      ),
                      const SizedBox(height: 10),
                      Container(
                        width: double.infinity,
                        height: 12,
                        color: Colors.white,
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 10),
              ],
            ),
          ),
          items: 6,
          direction: SkeletonDirection.ltr,
        ),
        visible: repositories.isNotEmpty && !isLoading,
        child: ListView.builder(
          itemCount: repositories.length,
          itemBuilder: (ctx, i) {
            return Padding(
              padding: EdgeInsets.only(top: i == 0 ? 10 : 0),
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(4.0),
                    child: Row(
                      children: [
                        CircleAvatar(
                          radius: 20,
                          backgroundColor: Colors.white,
                          backgroundImage: NetworkImage(
                            repositories[i].ownerPicture,
                          ),
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Padding(
                              padding: const EdgeInsets.only(left: 8.0),
                              child: Text(
                                repositories[i].name,
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            SizedBox(
                              width: MediaQuery.of(context).size.width * 0.8,
                              child: Padding(
                                padding: const EdgeInsets.only(left: 8.0),
                                child: Text(
                                  repositories[i].description,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                            ),
                          ],
                        )
                      ],
                    ),
                  ),
                  const Divider(),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
