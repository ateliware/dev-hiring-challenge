import 'package:dev_challenge/beans/owner.dart';

class Repository {
  final int id;
  final String name;
  final bool private;
  final String htmlUrl;
  final String url;
  final String createdAt;
  final int forks;
  final int openIssues;
  final int watchers;
  final Owner owner;

  Repository({
   required this.id,
   required this.name,
   required this.private,
   required this.htmlUrl,
   required this.url,
   required this.createdAt,
   required this.forks,
   required this.openIssues,
   required this.watchers,
   required this.owner
  });

  factory Repository.fromJson(Map<String, dynamic> json) {
    return Repository(
      id: json['id'],
      name: json['name'],
      private: json['private'],
      htmlUrl: json['html_url'],
      url: json['url'],
      createdAt: json['created_at'],
      forks: json['forks'],
      openIssues: json['open_issues'],
      watchers: json['watchers'],
      owner: Owner.fromJson(json['owner'])
    );
  }
}
