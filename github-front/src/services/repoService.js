import axios from 'axios';
const BACKEND_URL = 'http://localhost:8080/api';

export const saveRepos = async (repos) => {
  const url = `${BACKEND_URL}/repos`;
  const savedRepos = [];

  for(let repo of repos){
    const response = await axios.post(url, repo);
    const data = await response.data;
    savedRepos.push(data);
  }

  return savedRepos;
}

export const fetchRepos = async (repos) => {
  const url = `${BACKEND_URL}/repos`;
  const response = await axios.get(url);
  return await response.data;
}

export const deleteAllRepos = async () => {
  const url = `${BACKEND_URL}/repos`;
  const response = await axios.delete(url);
  return await response.data;
}