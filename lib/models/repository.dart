class Repository {
  int id;
  String name;
  String avatar;
  String language;
  String description;
  int stars;


  Repository({this.id, this.name, this.avatar, this.language, this.description,
    this.stars });

  factory Repository.fromJson(Map<String, dynamic> json) {
    return Repository(
        id: json["id"],
        name: json["name"],
        avatar: json["owner"]["avatar_url"],
        language: json["language"],
        description: json["description"],
        stars: json["stargazers_count"]);
  }

  Map<String, dynamic> toMap(){
    return {
      'id' : id,
      'name' : name,
      'avatar' : avatar,
      'language' : language,
      'description' : description,
      'stars' : stars,
    };
  }

  @override
  String toString() {
    return 'Repository(id: $id, nome: $name, linguagem: $language, descrição: $description, stars: $stars)';
  }
}



