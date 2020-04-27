import axios from 'axios';
const URL_API_GITHUB = 'https://api.github.com/search/repositories?q=';

export const fetchRepos = async () => {

  const langs = ['java', 'php', 'scala', 'javascript', 'python']
  const langsCriteria = langs.join('+language:');
  const url = `${URL_API_GITHUB}language:${langsCriteria}`;

  const response = await axios.get(url);
  const {items} = await response.data;

  const repos = [];
  for(let lang of langs){
    const repo = items.find(d => d.language.toLowerCase() === lang);
    repos.push(repo);
  }
  return repos;
}