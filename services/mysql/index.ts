import mysql from "mysql2";
export interface RepositorySearchDatabaseData extends mysql.RowDataPacket {
  search_id: number;
  language: string;
  query: string;
  search_date: string;
}
