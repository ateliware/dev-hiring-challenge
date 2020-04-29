import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

export const saveRepos = async (repos) => {
  const url = `${API_URL}/repos`;
  const savedRepos = [];

  for(let repo of repos){
    const response = await axios.post(url, repo);
    const data = await response.data;
    savedRepos.push(data);
  }
  return savedRepos;
}

export const fetchRepos = async () => { 
  const url = `${API_URL}/repos`;
  const response = await axios.get(url);
  return await response.data;
}

export const deleteAllRepos = async () => {
  const url = `${API_URL}/repos`;
  const response = await axios.delete(url);
  return await response.data;
}