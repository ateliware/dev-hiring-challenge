import 'package:dev_hiring_challenge/pages/feed.dart';
import 'package:dev_hiring_challenge/pages/repository.dart';
import 'package:dev_hiring_challenge/pages/search.dart';
import 'package:flutter/material.dart';


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