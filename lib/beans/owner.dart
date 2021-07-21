class Owner {
  final int id;
  final String login;

  Owner({
    required this.id,
    required this.login
  });

  factory Owner.fromJson(Map<String, dynamic> json) {
    return Owner(
        id: json['id'],
        login: json['login']
    );
  }
}