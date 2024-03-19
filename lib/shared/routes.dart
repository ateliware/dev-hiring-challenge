import 'package:flutter/material.dart';
import 'package:github_repository/pages/dashboard/dashboard.dart';
import 'package:github_repository/pages/repositories/repositories.dart';

class RouteGenerator {
  static Route<dynamic>? generateRoute(RouteSettings settings) {
    switch (settings.name) {
      //Rotas de Login
      case '/':
        return MaterialPageRoute(builder: (_) => const Dashboard());

      case '/repositories':
        return MaterialPageRoute(builder: (_) => Repositories(langId: settings.arguments as int));

      case '/repository':
        return MaterialPageRoute(builder: (_) => Repositories(langId: settings.arguments as int));
    }

    return null;
  }
}
