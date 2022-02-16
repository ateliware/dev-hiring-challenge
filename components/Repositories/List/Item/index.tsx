import React from "react";
import { RepositoryJsonData } from "../../../../services/github";
import styles from "./RepositoriesListItem.module.css";

interface RepositoriesListItemSectionProps {
  label: string;
  value: React.ReactNode;
}
export const RepositoriesListItemSection: React.FC<
  RepositoriesListItemSectionProps
> = ({ label, value }) => {
  return (
    <section className={styles.section}>
      <span className={styles.sectionLabel}>{label}</span>
      <span className={styles.sectionValue}>{value}</span>
    </section>
  );
};

interface RepositioresListItemProps {
  data: RepositoryJsonData;
}
export const RepositoriesListItem: React.FC<RepositioresListItemProps> = ({
  data,
}) => {
  const {
    name,
    stargazers_count,
    topics,
    description,
    owner,
    html_url,
    language,
  } = data;
  return (
    <li className={styles.main}>
      <header className={styles.header}>
        <a href={html_url} target="_blank" rel="noreferrer">
          <h4 className={styles.title}>{name}</h4>
        </a>
      </header>
      <RepositoriesListItemSection label="Estrelas" value={stargazers_count} />
      <RepositoriesListItemSection
        label="Proprietario"
        value={
          <div className={styles.ownerInfo}>
            <img alt={owner.login} src={owner.avatar_url} />
            <span>{owner.login}</span>
          </div>
        }
      />
      <RepositoriesListItemSection label="Descrição" value={description} />
      <RepositoriesListItemSection label="Tópicos" value={topics.join(", ")} />
      <RepositoriesListItemSection label="Linguagem" value={language} />
    </li>
  );
};
