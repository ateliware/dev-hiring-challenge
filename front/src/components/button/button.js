import React from "react";
import "./button.css";
import fetchIcon from "../../utils/fetchIcon";

const ButtonComponent = ({ type, codeLanguageHandler }) => {
  return (
    <div className='button' onClick={() => codeLanguageHandler(type)}>
      <img
        src={fetchIcon(type)}
        alt={`${type} icon`}
        className='button__image'
      />
      <h5 className='button__title'>{type}</h5>
    </div>
  );
};

export default ButtonComponent;
