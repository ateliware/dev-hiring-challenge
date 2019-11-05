import 'package:hiring_app/models/repository.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

const URL_BASE = "https://api.github.com/search/repositories?q=";
const STAR = "stars";
const ORDER = "desc";

//https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc
class Api {

  Future<List<Repository>> getRepositories(String language) async {

    http.Response response = await http.get(
        URL_BASE +
        "language:$language"
        "&sort=$STAR"
        "&order=$ORDER"
    );

    if (response.statusCode == 200) {
      //print("result:" + response.body);
      Map<String, dynamic> dadosJason = json.decode(response.body);

      List<Repository> repositories = dadosJason["items"].map<Repository>((map) {
        return Repository.fromJson(map);
      }).toList();

      return repositories;
    }
  }
}
