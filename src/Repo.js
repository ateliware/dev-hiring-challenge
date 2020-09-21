import React from 'react';

const Repo = ({ repo }) => (
  <div className='card card-body mb-2'>
    <div className='row'>
      <div className='col-md-6'>
        <a href={repo.html_url} target='_blank' rel="noopener noreferrer">{repo.name}</a>
      </div>
      <div className='col-md-6'>
        <p>Detalhes do repositório:</p>
        <span style={{ margin: 5 }} className='badge badge-primary'>Stars: {repo.stargazers_count}</span>
        <span style={{ margin: 5 }} className='badge badge-secondary'>Watch: {repo.watchers_count}</span>
        <span style={{ margin: 5 }} className='badge badge-success'>Forks: {repo.forks_count}</span>
        <span style={{ margin: 5 }} className='badge badge-warning'>Language: {repo.language}</span>
      </div>
    </div>
  </div>
)

export default Repo;