import React, { useEffect, useState } from 'react';
import './App.css';

const API = 'http://localhost:3000/favorite';

function App() {
  const [languageFavorites, setLanguageFavorite] = useState(['']);
  const [favoriteRepoIds, setFavoriteRepoId] = useState([] as number[]);
  const [nameSearchField, setNameSearchField] = useState('');
  const [languageSearchField, setLanguageSearchField] = useState('');
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([] as any);
  const [showDetail, setShowDetail ] = useState(false);
  const [detail, setDetail] = useState({} as any);

  async function getFavoritedReposFromServer() {
    const repos = await fetch(API, {
      method: 'get',
    });

    if (!repos || repos?.status !== 200) {
      return [];
    }

    const json = await repos.json();

    if (!json || !json?.length) {
      return [];
    }

    setFavoriteRepoId([...json.map((favorite: any) => favorite.repo_id)]);

    const basedOnLanguage = json?.reduce(
      (root: any, favorite: any) => ((root[favorite.language] = favorite.repo_id), root),
      {},
    );

    setLanguageFavorite([...Object.keys(basedOnLanguage)]);
  }

  async function fetchRepositoriesFromGithub(name: string, language: string) {
    try {
      let query = `q=${name ?? ''}`;

      if (language) {
        query += `+language:${language}`;
      }
  
      setPage(1);
      query += `&page=${page}`
  
      const response = await fetch(`https://api.github.com/search/repositories?${query}`);
  
      if (response.status !== 200) {
        setContent([]);
      }
  
      const json = await response.json();
  
      if (!json || !json.items) {
        setContent([]);
      }
  
      setPage(page+1);
      setContent(json.items);
    }
    catch(_) {
      setContent([]);
    }
  }

  async function fetchRepositoriesFromGithubByIds() {
    const contents = [];
    for await (const repoId of favoriteRepoIds) {
      const response = await fetch(`https://api.github.com/repositories/${repoId}`);
      const json = await response.json();

      contents.push(json);
    }

    setContent(contents);
  }

  async function favoriteRepo(repoId: number, language: string) {
    const repos = await fetch(API, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify([{
        repo_id: repoId,
        language,
      }])
    });

    const json = await repos.json();
    setFavoriteRepoId([...favoriteRepoIds, ...json?.map((favorite: any) => favorite.repo_id)]);

    if(!languageFavorites.includes(language) && languageFavorites.length < 5) {
      setLanguageFavorite([...languageFavorites, language])
    }
  }

  useEffect(() => {
    getFavoritedReposFromServer();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <strong>Your Favorited Languages</strong>
        <p><small>( {languageFavorites.join(' - ') } )</small></p>
      </header>
      <main>
        <div>
          <button onClick={() => fetchRepositoriesFromGithubByIds()}>Get my favorite repos</button>
        </div>
        <div>
          <input value={nameSearchField} onChange={e => setNameSearchField(e.target.value)} type="text" placeholder="Repository name..."></input>
          <input value={languageSearchField} onChange={e => setLanguageSearchField(e.target.value)} type="text" placeholder="Language name..."></input>
          <button onClick={() => {
            setPage(1);
            fetchRepositoriesFromGithub(nameSearchField, languageSearchField);
          }}>search</button>
        </div>
        {
          !showDetail 
          ?
          <div style={{display: "inline"}}>
          {
            content?.map((repo: any) => (
              <div onClick={() => { setShowDetail(true); setDetail(repo); }} key={repo.id} style={{
                margin: "5px",
                padding: "50px",
                backgroundColor: "#f9f9f9",
                height: "100px",
                }}>
                <h4>{repo.name} <small>by {repo.owner.login}</small></h4>
                <label>{repo.language}</label>
                <div>
                  <button onClick={() => favoriteRepo(repo.id, repo.language)}>favorite</button>
                </div>
              </div>
            ))
          }
          <button onClick={() => fetchRepositoriesFromGithub(nameSearchField, languageSearchField) }>Next</button>
        </div>
        :
        <div>
          <div>
            <button onClick={() => { setShowDetail(false); setDetail({}) }}>Back</button>
          </div>
          
          <div>
            <small>{ favoriteRepoIds.includes(detail.id) ? "**** Favorited ****" : "" }</small>
            <h2>{detail.full_name}</h2>
            
            <p>Created at <strong>{new Date(detail.created_at).toLocaleDateString()}</strong> by <strong>{detail.owner.login}</strong> using <strong>{detail.language}</strong> language.</p>
            <p>{detail.description}</p>
            <p>Default branch <strong>{detail.default_branch}</strong></p>
            <p>License <strong>{ detail?.license ? detail.license.name : "-" }</strong></p>
          </div>

          <a href={detail.html_url}>visit</a>
        </div>
        }
      </main>
    </div>
  );
}

export default App;
