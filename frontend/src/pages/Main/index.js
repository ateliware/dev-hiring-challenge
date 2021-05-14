import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import Styles from './styles';
import api from '../../services/api';

import LanguagesList from '../../components/LanguagesList';
import MainItemList from '../../components/MainItemList';

function Main() {
  const [owner, setOwner] = useState(null);
  const [repos, setRepos] = useState([]);

  function handleGetRepos() {
    api.get(`/repositories/${owner.id}`)
      .then(({ data }) => {
        setRepos(data);
      }).catch(() => {
        toast.error('Ops, houve um erro ao tentar buscar os dados');
      });
  }

  function handleremoveRepo(id) {
    api.delete(`/repositories/${id}`)
      .then(() => {
        setTimeout(() => {
          handleGetRepos();
          toast.success('Repositório removido com sucesso');
        }, 2000);
      }).catch(() => {
        toast.error('Ops, houve um erro ao tentar remover o repositório');
      });
  }

  useEffect(() => {
    if (owner) {
      handleGetRepos();
    }
  }, [owner]);

  return (
    <>
      <Styles.Header>
        <LanguagesList
          onChange={(e) => setOwner(e)}
        />
      </Styles.Header>

      <Styles.List>
        {repos.map((repo) => (
          <MainItemList
            key={repo.id}
            data={repo}
            onRemoveRequest={() => handleremoveRepo(repo.id)}
          />
        ))}
      </Styles.List>
    </>
  );
}

export default Main;
