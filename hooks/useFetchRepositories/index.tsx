import React, { useCallback, useEffect, useState } from "react";
import {
  fetchRepositoryFromAPI,
  RepositoryJsonData,
} from "../../services/github";
import { RepositorySearchDatabaseData } from "../../services/mysql";

export const useFetchRepositories = (query: string, language: string) => {
  const [data, setData] = useState<{
    error: boolean;
    repositories: RepositoryJsonData[];
    search: RepositorySearchDatabaseData | null;
  }>({ error: false, repositories: [], search: null });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const fetchData = useCallback(
    async (query: string, refresh: boolean = false) => {
      try {
        setError(false);
        if (refresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }
        const result = await fetchRepositoryFromAPI(query, language, refresh);
        setData(result);
        if (refresh) {
          setRefreshing(false);
        } else {
          setLoading(false);
        }
      } catch (e) {
        setError(true);
        if (refresh) {
          setRefreshing(false);
        } else {
          setLoading(false);
        }
      }
    },
    [setError, setData, setLoading, language, setRefreshing]
  );

  useEffect(() => {
    fetchData(query);
  }, [fetchData, query]);

  return {
    data,
    loading,
    fetchData,
    error,
    refreshing,
  };
};
