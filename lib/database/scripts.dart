class DatabaseScripts {
  static List<String> create = [
    """
    CREATE TABLE repository (
      id INTEGER PRIMARY KEY,
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
