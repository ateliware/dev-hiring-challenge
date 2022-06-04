import 'dart:io';

import 'package:github_repository/database/scripts.dart';
import 'package:github_repository/models/repositoryModel.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';

class DatabaseHelper {
  static Database? _database;

//Faz o get do banco de dados
  Future<Database> get datebase async {
    _database ??= await _initializeDatabase();
    return _database!;
  }

  Future<Database> _initializeDatabase() async {
    Directory directory = await getApplicationDocumentsDirectory();
    String path = directory.path + "/github_repository.db";

    Database database = await openDatabase(path, version: 1, onCreate: _createdb, onConfigure: _onConfigure);
    return database;
  }

  static Future _onConfigure(Database db) async {
    await db.execute(
      'PRAGMA foreign_keys = ON',
    );
  }

  void _createdb(Database db, int newVersion) async {
    //Executa os scripts de criação do banco
    for (int i = 0; i < DatabaseScripts.create.length; i++) {
      await db.execute(DatabaseScripts.create[i]);
    }
  }

  Future<void> deleteAllData() async {
    Database? db = await datebase;
    Batch batch = db.batch();

    List tables = await db.rawQuery("SELECT name FROM sqlite_master WHERE type ='table' AND name NOT LIKE 'sqlite_%';");

    for (Map item in tables) {
      batch.execute("DELETE FROM " + item['name']);
    }

    await batch.commit();
  }

  Future<List<RepositoryModel>> fetchRepositoryByLang(int lang) async {
    Database? db = await datebase;

    try {
      List result = await db.query('repositories');
      List<RepositoryModel> list = result.isNotEmpty ? result.map((t) => RepositoryModel.fromMap(t)).toList() : [];

      return list;
    } catch (e) {
      return [];
    }
  }
}
