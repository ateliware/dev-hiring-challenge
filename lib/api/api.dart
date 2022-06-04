import 'dart:convert';

import 'package:github_repository/api/url.dart';
import 'package:http/http.dart' as http;

class Api {
  static Future fetchRepositoriesByLang(int langId) async {
    http.Response res = await http.get(
      Uri.parse(Url.repositories + '?q=language:dart&sort=stars&order=desc&per_page=10'),
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/vnd.github.v3+json",
      },
    );

    if (res.statusCode == 200) {
      return jsonDecode(res.body);
    }
  }
}
