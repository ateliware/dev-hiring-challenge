import 'dart:convert';

RepositoryModel repositoryModelFromMap(String str) => RepositoryModel.fromMap(json.decode(str));

String repositoryModelToMap(RepositoryModel data) => json.encode(data.toMap());

class RepositoryModel {
  RepositoryModel({
    required this.id,
    required this.name,
    required this.description,
    required this.ownerName,
    required this.ownerPicture,
    required this.language,
    required this.forksCount,
    required this.watchersCount,
    required this.stargazersCount,
  });

  int id;
  String name;
  String description;
  String ownerName;
  String ownerPicture;
  int language;
  int forksCount;
  int watchersCount;
  int stargazersCount;

  factory RepositoryModel.fromMap(Map<String, dynamic> json) => RepositoryModel(
        id: json["id"],
        name: json["name"],
        description: json["description"],
        ownerName: json["owner_name"],
        ownerPicture: json["owner_picture"],
        language: json["language"],
        forksCount: json["forks_count"],
        watchersCount: json["watchers_count"],
        stargazersCount: json["stargazers_count"],
      );

  Map<String, dynamic> toMap() => {
        "id": id,
        "name": name,
        "description": description,
        "owner_name": ownerName,
        "owner_picture": ownerPicture,
        "language": language,
        "forks_count": forksCount,
        "watchers_count": watchersCount,
        "stargazers_count": stargazersCount,
      };
}
