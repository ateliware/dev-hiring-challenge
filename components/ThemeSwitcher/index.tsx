import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ThemeSwitcher.module.css";

export enum AvailableThemes {
  "Dark" = "dark",
  "Light" = "light",
}

interface ThemeSwitcherProps {
  switcherId: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ switcherId }) => {
  //TODO salvar as preferencias de tema do usuario no banco de dados para manter a experiencia em diferentes aparelhos
  const html = useRef<HTMLHtmlElement>();
  const [currentTheme, setCurrentTheme] = useState<AvailableThemes>(
    AvailableThemes.Light
  );

  useEffect(() => {
    //quando o valor do tema escolhido muda
    if (html.current) {
      //atualizar a propriedade "theme" do <html> com o valor do tema atual para mudar as variáveis css correspondentes ao tema
      html.current.dataset.theme = currentTheme;
    }
  }, [currentTheme, html]);

  useEffect(() => {
    //executar a primeira vez que o switcher é rendereizado
    html.current = document.querySelector("html") as HTMLHtmlElement;

    //verificar preferencia de tema do sistema operacional do usuario
    const matchMediaPrefDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const processOSThemeValue = (e: MediaQueryListEvent | MediaQueryList) => {
      const isDark = e.matches;
      setCurrentTheme(isDark ? AvailableThemes.Dark : AvailableThemes.Light);
    };
    const onSystemThemeChange = processOSThemeValue;
    const startListeningToOSTheme = () => {
      matchMediaPrefDark.addEventListener("change", onSystemThemeChange);
    };
    const stopListeningToOSTheme = () => {
      matchMediaPrefDark.removeEventListener("change", onSystemThemeChange);
    };
    startListeningToOSTheme();

    //verificar valor inicial
    processOSThemeValue(matchMediaPrefDark);
    return () => {
      //remover os listeners quando o switcher não está sendo mais renderizado
      stopListeningToOSTheme();
    };
  }, [html, setCurrentTheme]);

  const handleOnSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault();
      setCurrentTheme(e.target.value as AvailableThemes);
    },
    [setCurrentTheme]
  );
  return (
    <div className={styles.main}>
      <span className={styles.label} id={switcherId}>
        tema
      </span>
      <hr className={styles.divider} />
      <select
        title="tema"
        name="tema"
        data-testid="themeSwitcherSelect"
        value={currentTheme}
        onChange={handleOnSelectChange}
        className={styles.select}
        placeholder="tema"
        aria-labelledby={switcherId}
      >
        <option value={AvailableThemes.Light}>claro</option>
        <option value={AvailableThemes.Dark}>escuro</option>
      </select>
    </div>
  );
};
