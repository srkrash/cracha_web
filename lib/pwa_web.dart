import 'dart:js_interop';

@JS('isPwaInstallable')
external JSBoolean _isPwaInstallable();

@JS('promptPwaInstall')
external JSPromise<JSBoolean> _promptPwaInstall();

bool get isPwaInstallable {
  try {
    return _isPwaInstallable().toDart;
  } catch (e) {
    return false;
  }
}

Future<bool> promptPwaInstall() async {
  try {
    final result = await _promptPwaInstall().toDart;
    return result.toDart;
  } catch (e) {
    return false;
  }
}
