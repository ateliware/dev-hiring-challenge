import 'dart:convert';

import 'package:github_repository/api/url.dart';
import 'package:github_repository/shared/utils.dart';
import 'package:http/http.dart' as http;

class Api {
  static Future fetchRepositoriesByLang(int langId) async {
    try {
      String lang = Utils.getLangById(langId);

      http.Response res = await http.get(
        Uri.parse(Url.repositories + '?q=language:$lang&sort=stars&order=desc&per_page=10'),
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/vnd.github.v3+json",
        },
      );

      if (res.statusCode == 200) {
        return jsonDecode(res.body);
      }

      if (res.statusCode >= 400) {
        return null;
      }
    } catch (err) {
      print(err);
      return null;
    }
  }
}
