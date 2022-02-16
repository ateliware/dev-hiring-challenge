import React from "react";
import { ThemeSwitcher } from "../ThemeSwitcher";
import styles from "./Footer.module.css";
export const Footer = () => {
  return (
    <footer>
      <section className="container">
        <main className={styles.main}>
          <section className={styles.copyleft}>
            Facundo Leites copyleft 2022
          </section>
          <section className={styles.themeSwitcherContainer}>
            <ThemeSwitcher switcherId="footer-theme-switcher" />
          </section>
        </main>
      </section>
    </footer>
  );
};
