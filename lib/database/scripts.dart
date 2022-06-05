class DatabaseScripts {
  static List<String> create = [
    """
    CREATE TABLE repository (
      id_repository INTEGER PRIMARY KEY AUTOINCREMENT,
      id INTEGER,
      name TEXT NOT NULL,
      description TEXT,
      owner_name TEXT NOT NULL,
      owner_picture TEXT,
      language INTEGER NOT NULL,
      forks_count INTEGER,
      watchers_count INTEGER,
      stargazers_count INTEGER
      );""",
  ];
}
