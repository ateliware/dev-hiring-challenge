import 'package:flutter/material.dart';
import 'package:hiring_app/pages/feed.dart';
import 'package:hiring_app/pages/repository.dart';
import 'package:hiring_app/pages/search.dart';

import 'pages/home.dart';

void main() => runApp(MaterialApp(
  initialRoute: '/',
  routes: {
    '/home': (context) => HomePage(),
    '/feed': (context) => FeedPage(),
    '/search': (context) => SearchPage(),
    '/repositories': (context) => RepositoriesPage(),
  },
  home: HomePage(),
));