import React from 'react';

import api from '../../services/api';

async function handleRepos(e) {
  e.preventDefault();

  const response = await api.get("/search", {
    headers:{"Access-Control-Allow-Origin": "*"}
  });
  console.log(response);
}

export default function List() {
  return (
    <button className="button" type="button" onClick={handleRepos}>Busca ai</button>
  );
}