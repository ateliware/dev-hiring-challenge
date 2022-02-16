import React, { useCallback, useMemo } from "react";
import { Alert, AlertPropsVariants } from "../../../components/Alert";
import { RepositoriesList } from "../../../components/Repositories/List";
import { useFetchRepositories } from "../../../hooks/useFetchRepositories";
import styles from "./RepositoryCategory.module.css";

interface RepositoryCategoryProps {
  name: string;
  language: string;
  query: string;
}
export const RepositoryCategory: React.FC<RepositoryCategoryProps> = ({
  name,
  language,
  query,
}) => {
  const { data, loading, fetchData, error, refreshing } = useFetchRepositories(
    query,
    language
  );

  const handleTryAgainClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      fetchData(query);
    },
    [fetchData, query]
  );

  const handleRefreshDataClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      fetchData(query, true);
    },
    [fetchData, query]
  );

  const formatedSearchData = useMemo(() => {
    if (!data.search) {
      return "";
    }
    const dateObject = new Date(data.search.search_date);
    const dateText = dateObject.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return dateText;
  }, [data]);

  return (
    <article className={styles.main}>
      <header className={styles.header}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.lead}>
          {query !== ""
            ? `Mostrando ${data.repositories.length} repósitorios, contendo "${query}" no nome ou na descrição, ordenados por quantidade de estrelas do servidor MySQL local atualizado em ${formatedSearchData}`
            : `Mostrando ${data.repositories.length} repósitorios, ordenados por quantidade de estrelas do servidor MySQL local atualizado em ${formatedSearchData}`}
        </p>
        <button
          className={styles.refreshDataButton}
          onClick={handleRefreshDataClick}
          disabled={refreshing || loading}
        >
          {refreshing
            ? "Atualizando..."
            : "Atualizar banco de dados desde a API de Github"}
        </button>
      </header>
      {loading ? (
        <div className={styles.refreshingIndicator}>carregando...</div>
      ) : error ? (
        <main className={styles.alertContainer}>
          <Alert
            variant={AlertPropsVariants.error}
            actions={[
              <button onClick={handleTryAgainClick}>tentar novamente</button>,
            ]}
          >
            Ops! aconteceu um erro consultando os repositórios.{" "}
          </Alert>
        </main>
      ) : (
        <>
          {refreshing && (
            <div className={styles.refreshingIndicator}>atualizando...</div>
          )}
          <RepositoriesList data={data.repositories} />
        </>
      )}
    </article>
  );
};
