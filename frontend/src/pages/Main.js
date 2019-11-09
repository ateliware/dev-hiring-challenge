import React, { useState } from 'react';
import api from '../services/api';

import Repository from '../components/Repository';
import Loading from '../components/Loading';

import './main.css';

export default function Main() {
  const [ data, setData ] = useState();
  const [ language, setLanguage ] = useState('');
  const [ showLoading, setShowLoading ] = useState(false);
  const [error, setError ] = useState();
  
  async function handleSubmit(ev) {
    ev.preventDefault();
    document.getElementById('inp').blur()
    
    setShowLoading(true);
    setData(undefined);
    setError(undefined);

    try {
      const response = await api.get(language);

      if (response.data.error || response.data.info) {
        setError("Linguagem não encontrada!")
      } else {
        setData(response);
      }
      setShowLoading(false);
    } catch(err) {
      console.error(err);
    }
  }  

  const handleInput = (event => {
    setLanguage(event.target.value);
  })


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label for="inp" class="inp">
          <input 
            type="text" 
            id="inp" 
            placeholder="&nbsp;"
            value={language} 
            onChange={handleInput}
          />
          <span class="label">Linguagem</span>
          <span class="border"></span>
        </label>
        
        <button className="button" type="submit">Pesquisar</button>
        <Loading show={showLoading}/>
        {<p>{error}</p>}
      </form>

      {data && data.data && (
        data.data.map(repo => (
          <Repository key={repo.id_repository} repository={repo}/>
        ))
      )}
    </div>
  ) 
}