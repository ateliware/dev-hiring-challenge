import mysql from "mysql2";
import { RepositorySearchDatabaseData } from "../mysql";

const refreshRepositoriesFromAPI = async (query: string, language: string) => {
  try {
    const result = await fetch(
      `/api/repositories/${language}/refresh/?q=${query}`,
      {
        method: "POST",
      }
    );
    if (!result.ok) {
      throw new Error("problem fetching API");
    }
    return true;
  } catch (e) {
    //TODO handle errors
    return false;
  }
};

export const fetchRepositoryFromAPI = async (
  query: string,
  language: string,
  refresh: boolean
) => {
  let refreshed = false;
  if (refresh) {
    refreshed = await refreshRepositoriesFromAPI(query, language);
  }
  if (refresh && !refreshed) {
    throw new Error("problem refreshing results");
  }
  const result = await fetch(`/api/repositories/${language}/?q=${query}`);
  if (!result.ok) {
    throw new Error("problem fetching API");
  }
  return (await result.json()) as {
    error: boolean;
    repositories: RepositoryJsonData[];
    search: RepositorySearchDatabaseData | null;
  };
};

export interface RepositoryDatabaseData extends mysql.RowDataPacket {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  description: string;
  language: string;
  url: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  topics: string;
  owner__login: string;
  owner__id: number;
  owner__url: string;
  owner__avatar_url: string;
}

export interface RepositoryJsonData {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  description: string;
  language: string;
  url: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  topics: string[];
  owner: {
    login: string;
    id: number;
    url: string;
    avatar_url: string;
  };
}
