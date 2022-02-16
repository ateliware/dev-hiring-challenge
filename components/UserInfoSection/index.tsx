import React from "react";
import styles from "./UserInfoSection.module.css";

export const UserInfoSection = () => {
  return (
    <div className={styles.main}>
      <hr className={styles.divider} />
      <a href="mailto:hola@facundoleites.com" className={styles.mailToButton}>
        hola@facundoleites.com
      </a>
    </div>
  );
};
