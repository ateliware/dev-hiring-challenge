import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2";
import { converter } from "../../../../services/github/helpers";
import {
  RepositoryDatabaseData,
  RepositoryJsonData,
} from "../../../../services/github";
import { RepositorySearchDatabaseData } from "../../../../services/mysql";
require("dotenv").config();

export const database = mysql
  .createPool({
    port: Number(process.env.MYSQL_PORT),
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    charset: "utf8",
    timezone: "-00:00",
    connectionLimit: 20,
    waitForConnections: true,
    queueLimit: 0,
  })
  .promise();

const fetchRepositoriesFromGithub = async (
  query: string,
  language: string
): Promise<{
  total_count: number;
  incomplete_results: boolean;
  items: RepositoryJsonData[];
}> => {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${query}+in:name,description+language:${language}&sort=stars&order=desc&per_page=12`
  );
  return response.json();
};

const writeRepositoriesSearchToDatabase = async ({
  query,
  language,
}: {
  language: string;
  query: string;
}) => {
  const conection = await database;
  await conection.query(`
    CREATE TABLE IF NOT EXISTS repositories_search (
        search_id INT AUTO_INCREMENT PRIMARY KEY,
        language TEXT NOT NULL,
        query TEXT NOT NULL,
        search_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  const [{ insertId }] = await conection.query<mysql.ResultSetHeader>(
    `INSERT INTO repositories_search (language,query)
      VALUES (?,?);`,
    [language, query]
  );
  return insertId;
};

const writeRepositoriesToDatabase = async (
  { searchId }: { searchId: number },
  data: RepositoryJsonData[]
) => {
  const conection = await database;
  await conection.query(`
    CREATE TABLE IF NOT EXISTS repositories (
        repository_id INT AUTO_INCREMENT PRIMARY KEY,
        search_id INT NOT NULL,
        id INT NOT NULL ,
        node_id TEXT NOT NULL,
        name TEXT NOT NULL,
        full_name TEXT NOT NULL,
        description TEXT NOT NULL,
        language TEXT NOT NULL,
        url TEXT NOT NULL,
        html_url TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        stargazers_count INT NOT NULL,
        topics TEXT NOT NULL,
        owner__login TEXT NOT NULL,
        owner__id INT NOT NULL,
        owner__url TEXT NOT NULL,
        owner__avatar_url TEXT NOT NULL
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
  `);
  const [{ affectedRows }] = await conection.query<mysql.ResultSetHeader>(
    `INSERT INTO repositories (search_id,id,node_id,name,full_name,description,language,url,html_url,created_at,updated_at,stargazers_count,topics,owner__login,owner__id,owner__url,owner__avatar_url) VALUES ?`,
    [
      data
        .map((jsonData) => converter.toDatabase(jsonData))
        .map(
          ({
            id,
            node_id,
            name,
            full_name,
            description,
            language,
            url,
            html_url,
            created_at,
            updated_at,
            stargazers_count,
            topics,
            owner__login,
            owner__id,
            owner__url,
            owner__avatar_url,
          }) => {
            return [
              searchId,
              id,
              node_id,
              name,
              full_name,
              description,
              language,
              url,
              html_url,
              created_at,
              updated_at,
              stargazers_count,
              topics,
              owner__login,
              owner__id,
              owner__url,
              owner__avatar_url,
            ];
          }
        ),
    ]
  );
  return affectedRows;
};

const getLatestLanguageSearchFromDatabase = async (
  query: string,
  language: string
) => {
  const conection = await database;
  const [rows]: [RepositorySearchDatabaseData[], mysql.FieldPacket[]] =
    await conection.query(
      "SELECT query,search_id,language,search_date FROM repositories_search WHERE ( query = ? AND language = ? ) ORDER BY search_date DESC LIMIT 1;",
      [query, language]
    );
  if (rows.length > 0) {
    return rows[0];
  }
  return false;
};

const fetchRepositoriesFromDatabase = async (
  query: string,
  language: string
) => {
  try {
    const latestSearch = await getLatestLanguageSearchFromDatabase(
      query,
      language
    );
    if (!latestSearch) {
      throw new Error("there are no searches in this language");
    }
    const connection = await database;
    const [rows]: [RepositoryDatabaseData[], mysql.FieldPacket[]] =
      await connection.query(
        "SELECT search_id,id,node_id,name,full_name,description,language,url,html_url,created_at,updated_at,stargazers_count,topics,owner__login,owner__id,owner__url,owner__avatar_url FROM repositories WHERE search_id = ? ORDER BY stargazers_count DESC;",
        [latestSearch.search_id]
      );
    return {
      repositories: rows.map((row) => converter.fromDatabase(row)),
      search: latestSearch,
    };
  } catch (e) {
    return { repositories: [], search: null };
  }
};

export const forceGithubFetch = async (query: string, language: string) => {
  try {
    const { items: repositoriesJson } = await fetchRepositoriesFromGithub(
      query,
      language
    );
    const searchId = await writeRepositoriesSearchToDatabase({
      query,
      language: language,
    });
    const savedRepositories = await writeRepositoriesToDatabase(
      { searchId },
      repositoriesJson
    );
    return savedRepositories > 0;
  } catch (e) {
    return false;
  }
};

const getRepositories = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    error: boolean;
    repositories: RepositoryJsonData[];
    search: RepositorySearchDatabaseData | null;
  }>,
  repeatCount: number = 0
): Promise<void> => {
  try {
    const {
      query: { language, q },
    } = req;
    if (typeof language !== "string") {
      throw new Error("language is not a string");
    }
    if (typeof q !== "string") {
      throw new Error("query is not a string");
    }
    const { repositories, search } = await fetchRepositoriesFromDatabase(
      q,
      language
    );
    if (repositories.length === 0 && repeatCount === 0) {
      const fetched = await forceGithubFetch(q, language);
      if (fetched) {
        return getRepositories(req, res, 1);
      } else {
        throw new Error("problem fetching from github");
      }
    }
    const connection = await database.getConnection();
    connection.destroy();
    res.status(200).json({ error: false, repositories, search });
    return;
  } catch (e) {
    const connection = await database.getConnection();
    connection.destroy();
    res.status(500).json({ error: true, repositories: [], search: null });
    return;
  }
};

const RepositoriesLanguage = (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  if (req.method === "GET") {
    return getRepositories(req, res);
  } else {
    return res
      .status(403)
      .json({ error: true, repositories: [], search: null });
  }
};
export default RepositoriesLanguage;
