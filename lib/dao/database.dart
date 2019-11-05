import 'package:hiring_app/models/repository.dart';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

class Banco {
  //Singleton
  Banco._internal();

  static final Banco _db = Banco._internal();

  static Banco get() {
    return _db;
  }

  //SQLite
  Database _dbSqlite;

  Future<Database> _getSqlite() async {
    _dbSqlite = await _abrirSqlite();
    return _dbSqlite;
  }

  Future<Database> _abrirSqlite() async {
    final path = join(await getDatabasesPath(), "Tabelas.db");
    return openDatabase(path, version: 1,
        onCreate: (Database db, int version) async {
      await db.execute(
        "CREATE TABLE repositories("
        "id INTEGER PRIMARY KEY AUTOINCREMENT, "
        "name TEXT,"
        "avatar TEXT,"
        "language TEXT,"
        "description TEXT,"
        "stars NUMBER);",
      );
    });
  }

  Future<Repository> insert(Repository repository) async {
    Database db = await _getSqlite();
    repository.id = await db.insert('repositories', repository.toMap());
    return repository;
  }

  Future<int> update(Repository repository) async {
    Database db = await _getSqlite();
    return await db.update('repositories', repository.toMap(),
        where: 'id = ?', whereArgs: [repository.id]);
  }

  Future<int> delete(int id) async {
    Database db = await _getSqlite();
    return await db.delete('repositories', where: 'id = ?', whereArgs: [id]);
  }

  Future<int> deleteAll() async {
    Database db = await _getSqlite();
    return await db.delete('repositories');
  }

  Future<List<Repository>> getRepositories() async {
    final Database db = await _getSqlite();
    final List<Map<String, dynamic>> maps = await db.query('repositories');
    return List.generate(maps.length, (i) {
      return Repository(
          id: maps[i]['id'],
          name: maps[i]['name'],
          avatar: maps[i]['avatar'],
          description: maps[i]['description'],
          stars: maps[i]['stars']);
    });
  }
}
