import React from "react";
import { UserInfoSection } from "../UserInfoSection";
import style from "./Header.module.css";
export const Header = () => {
  return (
    <header>
      <section className="container">
        <div className={style.main}>
          <h1 className={style.title}>Prova Ateliware</h1>
          <p className={style.lead}>Desafio técnico para desenvolvedores</p>
          <section className={style.userInfoSectionContainer}>
            <UserInfoSection />
          </section>
        </div>
      </section>
    </header>
  );
};
