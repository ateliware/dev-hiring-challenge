import React, { useState, useEffect } from 'react';
import {
  Input, FormGroup, Label, Alert,
} from 'reactstrap';

import api from '../../services/api';

function LanguagesList({ onChange = () => {} }) {
  const [error, setError] = useState(null);
  const [lang, setLang] = useState('');
  const [languages, setLanguages] = useState([]);

  function handleGetLangs() {
    setError(false);
    api.get('/programming-languages')
      .then(({ data }) => {
        setLanguages(data);
      }).catch(() => {
        setError(true);
      });
  }

  useEffect(() => {
    handleGetLangs();
  }, []);

  useEffect(() => {
    const [selected] = languages.filter((language) => String(language.id) === lang);
    onChange(selected);
  }, [lang]);

  return (
    <>
      {error && (
        <Alert color="danger">
          Houve um erro ao tentar buscar
          as linguagens de programação.
          {' '}
          <a
            href="#"
            className="alert-link"
            onClick={handleGetLangs}
          >
            Tentar novamente.
          </a>
        </Alert>
      )}

      <FormGroup className="m-0">
        <Label for="select-language">
          Linguagem de programação
        </Label>
        <Input
          id="select-language"
          value={lang}
          type="select"
          name="select"
          onChange={
            ({ target: { value } }) => setLang(value)
          }
        >
          {!lang && (
            <option value="NO_VALUE">
              Selecione uma linguagem
            </option>
          )}

          {languages.map((language) => (
            <option
              key={language.id}
              value={language.id}
            >
              {language.name}
            </option>
          ))}
        </Input>
      </FormGroup>
    </>
  );
}

export default LanguagesList;
