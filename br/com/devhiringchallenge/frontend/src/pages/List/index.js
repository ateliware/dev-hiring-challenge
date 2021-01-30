import React, { useState }from 'react';

import api from '../../services/api';

export default function List() {

  const [repos, setRepos] = useState([]);
  const [counter, setCounter] = useState(1);

  async function handleRepos() {
    console.log(counter);
    await api.get(`search/${counter}`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then( response => {
      let bla = [].concat(repos, response.data.repos);
      setRepos(bla);
    });
    increment();
  }
  
  function increment() {
    setCounter(counter + 1)
  }

  return (
    <div className="profile-container">
      <h1>CONTADOR: {counter}</h1>
      <button className="button" type="button" onClick={handleRepos}>Busca ai</button>
      <ul>
        { repos.map(repository => (
          <li key={repository.url}>
            <strong>URL:</strong>
            <p>{repository.url}</p>
  
            <strong>Stars:</strong>
            <p>{repository.stars}</p>
  
          </li>
        ))}
      </ul>
    </div>
  );
}