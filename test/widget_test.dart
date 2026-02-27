import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:cracha_web/main.dart';

void main() {
  testWidgets('Builds the app', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const CrachaApp());

    // Verify that the app builds without crashing.
    expect(find.byType(MaterialApp), findsOneWidget);
  });
}
