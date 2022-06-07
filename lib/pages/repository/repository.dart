import 'package:flutter/material.dart';
import 'package:github_repository/components/customAppBar/customAppBar.dart';
import 'package:github_repository/models/repositoryModel.dart';

class Repository extends StatelessWidget {
  final RepositoryModel repositoryModel;
  const Repository({Key? key, required this.repositoryModel}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Respositório'),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                CircleAvatar(
                  radius: 40,
                  backgroundColor: Colors.white,
                  backgroundImage: NetworkImage(
                    repositoryModel.ownerPicture,
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        repositoryModel.name,
                        style: const TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(repositoryModel.description),
                    ],
                  ),
                ),
              ],
            ),
            const Divider(),
            Text('Desenvolvido por ${repositoryModel.ownerName}'),
            Padding(
              key: const Key('forks'),
              padding: const EdgeInsets.only(top: 8.0),
              child: Row(
                children: [
                  Image.asset(
                    'assets/fork.png',
                    height: 24,
                    width: 24,
                  ),
                  const SizedBox(width: 10),
                  Text('Fork ${repositoryModel.forksCount}'),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 8.0),
              child: Row(
                children: [
                  const Icon(Icons.star),
                  const SizedBox(width: 10),
                  Text('Star ${repositoryModel.stargazersCount}'),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 8.0),
              child: Row(
                children: [
                  const Icon(Icons.remove_red_eye),
                  const SizedBox(width: 10),
                  Text('Watch ${repositoryModel.watchersCount}'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
