import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Context from './Context';

const Provider = ({ children }) => {

  const [repos, setRepos] = useState([]);
  const language = ['python', 'javascript', 'java', 'kotlin', 'swift']   

  const http = axios.create({
    baseURL: 'https://ateliware-backend-dev-hiring.herokuapp.com/',
  });

  const git = axios.create({
    baseURL: 'https://api.github.com',
    headers: { 'Content-type': 'application/json' }
  });

  const getGitServices = async (lang) => {
    try {
      const data = git.get(`/search/repositories?q=language:${lang}&sort=stars&order=desc`)
        .then((r) => postElements({
          name: r.data.items[0].name,
          language: r.data.items[0].language,
          description: r.data.items[0].description,
          user: r.data.items[0].owner.login,
          userImage: r.data.items[0].owner.avatar_url,
          created: r.data.items[0].created_at,
          updated: r.data.items[0].updated_at,
          stars: r.data.items[0].stargazers_count,
          watchs: r.data.items[0].watchers,
          size: r.data.items[0].size,
          issues: r.data.items[0].open_issues_count,
          url: r.data.items[0].html_url,
        }));

      return await data;
    } catch (error) {
      console.error(error)
    }
  }; 

  const setGitRepos = async () => {
    deleteElements();
    for (const l of language) {
      try {
        getGitServices(l);
        getElement();
      } catch (e) {
        console.log(e);
      }
    }
  }

  const getElement = () => {
    const data = http.get('/repos');
    return data.then(res => setRepos(res.data))
  };

  const postElements = async (data) => {
    return await http.post('/repos', data);
  };

  const deleteElements = () => {
    return http.delete('/repos');
  };

  const deleteRepos = () => {
    setRepos([]);
  }

  useEffect(() => { 
    setGitRepos();
  //eslint-disable-next-line
  },[]);

  const value = {
    repos,
    language,
    deleteRepos,
    setGitRepos,
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
