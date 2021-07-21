// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility that Flutter provides. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:dev_challenge/main.dart';

void main() {
  testWidgets('navigation', (WidgetTester tester) async {
    final scaffoldKey = GlobalKey<ScaffoldState>();
    const displayName = "Buscar Repositórios";

    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          key: scaffoldKey,
          drawer: const Text(displayName),
        ),
      ),
    );

    scaffoldKey.currentState!.openDrawer();
    await tester.pump();

    expect(find.text(displayName), findsOneWidget);
  });
}
