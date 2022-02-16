import React from "react";
import { RepositoryJsonData } from "../../../services/github";
import { RepositoriesListItem } from "./Item";
import styles from "./RepositoriesList.module.css";
export interface RepositioresListProps {
  data: RepositoryJsonData[];
}
export const RepositoriesList: React.FC<RepositioresListProps> = ({ data }) => {
  return (
    <ul className={styles.main}>
      {data.map((thisItem, i) => (
        <RepositoriesListItem
          data={thisItem}
          key={`repositories_list_item_${thisItem.id}`}
        />
      ))}
    </ul>
  );
};
