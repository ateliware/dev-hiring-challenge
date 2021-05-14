import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import Styles from './styles';
import api from '../../services/api';
import LanguagesList from '../../components/LanguagesList';
import MainItemList from '../../components/MainItemList';

function RepoResults() {
  const [owner, setOwner] = useState(null);
  const [repos, setRepos] = useState([]);

  function handleGetRepos() {
    api.get(`/repositories/search/${owner.github_login}`)
      .then(({ data }) => {
        setRepos(data);
      }).catch(() => {
        toast.error('Ops, houve um erro ao tentar buscar os dados');
      });
  }

  function handleAddRepository(repo) {
    api.post('/repositories', {
      ...repo,
      programming_language_id: owner.id,
    })
      .then(() => {
        toast.success('Repositório incluído com sucesso');
      }).catch(() => {
        toast.error('Ops, houve um erro ao tentar incluir o repositório');
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
            noDetails
            data={repo}
            onAddRequest={() => handleAddRepository(repo)}
          />
        ))}
      </Styles.List>
    </>
  );
}

export default RepoResults;
