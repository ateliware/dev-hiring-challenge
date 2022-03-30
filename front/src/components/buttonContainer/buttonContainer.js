import React from "react";
import Button from "../button/button";
import LANGUAGE from "../../utils/languages";
import "./buttonContainer.css";

const CODE_LANGUAGE_INITIALIZATION = [
  LANGUAGE.javascript,
  LANGUAGE.python,
  LANGUAGE.java,
  LANGUAGE.php,
  LANGUAGE.kotlin,
];

const ButtonContainerComponent = ({ codeLanguageHandler }) => {
  return (
    <>
      <h2>Selecione em qual linguagem deseja realizar a busca:</h2>
      <div className='button__container'>
        {CODE_LANGUAGE_INITIALIZATION.map((codeLanguage) => (
          <Button
            type={codeLanguage}
            codeLanguageHandler={codeLanguageHandler}
          />
        ))}
      </div>
    </>
  );
};

export default ButtonContainerComponent;
