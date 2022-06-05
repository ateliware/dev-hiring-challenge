class Utils {
  static String getLangById(int langId) {
    switch (langId) {
      case 1:
        return 'Dart';

      case 2:
        return 'Javascript';

      case 3:
        return 'C++';

      case 4:
        return 'PHP';

      default:
        return '';
    }
  }
}
