import 'package:flutter/material.dart';
import 'package:github_repository/models/repositoryModel.dart';
import 'package:github_repository/pages/repository/repository.dart';

class RepositoryCard extends StatelessWidget {
  final RepositoryModel repositoryModel;
  const RepositoryCard({Key? key, required this.repositoryModel}) : super(key: key);

  void navigateTo(RepositoryModel repo, BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (conxtet) => Repository(
          repositoryModel: repo,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      key: Key(repositoryModel.name),
      borderRadius: BorderRadius.circular(10),
      onTap: () {
        navigateTo(repositoryModel, context);
      },
      child: Padding(
        padding: const EdgeInsets.all(4.0),
        child: Row(
          children: [
            CircleAvatar(
              radius: 20,
              backgroundColor: Colors.white,
              backgroundImage: NetworkImage(
                repositoryModel.ownerPicture,
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.only(left: 8.0),
                  child: Text(
                    repositoryModel.name,
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
                      repositoryModel.description,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
