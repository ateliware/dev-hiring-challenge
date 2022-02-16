import React, { useCallback, useState } from "react";
import { ReactElement } from "react";
import { Layout } from "../components/Layout";
import { NextPageWithLayout } from "./_app.page";
import styles from "./index.module.css";
import { RepositoryCategory } from "../containers/Repository/Category";

const Repositiores: NextPageWithLayout = () => {
  const [query, setQuery] = useState("");
  const [tempQuery, setTempQuery] = useState("");
  const handleOnInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTempQuery(e.target.value);
    },
    [setTempQuery]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setQuery(tempQuery);
    },
    [tempQuery, setQuery]
  );
  return (
    <div>
      <header className={styles.header}>
        <h2 className={styles.title} role="heading">
          Repositórios
        </h2>
        <p className={styles.searchingTerm} data-testid="searchTerm">
          pesquisando <strong>{query}</strong> em nome e descrição
        </p>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <input
            value={tempQuery}
            onChange={handleOnInputChange}
            placeholder="pesquisa"
            name="pesquisa"
          />
          <button type="submit">pesquisar</button>
        </form>
      </header>
      <main className={styles.repositioriesListsContainer}>
        <div className={styles.repositoryCategoryContainer}>
          <RepositoryCategory name="PHP" language="PHP" query={query} />
        </div>
        <div className={styles.repositoryCategoryContainer}>
          <RepositoryCategory
            name="Typescript"
            language="TypeScript"
            query={query}
          />
        </div>
        <div className={styles.repositoryCategoryContainer}>
          <RepositoryCategory
            name="Javascript"
            language="JavaScript"
            query={query}
          />
        </div>
        <div className={styles.repositoryCategoryContainer}>
          <RepositoryCategory name="Java" language="Java" query={query} />
        </div>
        <div className={styles.repositoryCategoryContainer}>
          <RepositoryCategory name="Dart" language="Dart" query={query} />
        </div>
      </main>
    </div>
  );
};

export default Repositiores;

Repositiores.getLayout = (page: ReactElement) => {
  return <Layout title="Repositorios">{page}</Layout>;
};
