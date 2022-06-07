import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:github_repository/api/api.dart';
import 'package:github_repository/main.dart';

void main() {
  setUpAll(() {
    HttpOverrides.global = null;
  });
  testWidgets('Teste para verificar se existe botão com o a linguagem dart', (WidgetTester tester) async {
    await tester.pumpWidget(const MaterialApp(home: MyApp()));

    expect(find.byType(Card), findsWidgets);

    //Busca o botão da linguagem dart
    Finder dart = find.byKey(const Key('Dart'));
    tester.ensureVisible(dart);
  });

  test('Testa chamada da api para ver se retorna os dados', () async {
    Map? result = await Api.fetchRepositoriesByLang(1);

    expect(result != null, true);

    expect(result!['items'].length, 10);
  });
}
