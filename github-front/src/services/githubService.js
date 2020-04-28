import axios from 'axios';

const URL_API_GITHUB = 'https://api.github.com/search/repositories?q=';

export const fetchRepos = async () => {
  const langs = ['java', 'kotlin', 'scala', 'javascript', 'python'];
  const repos = [];

  for(let lang of langs){
    try{
      const url = `${URL_API_GITHUB}language:${lang}`;
      const response = await axios.get(url);
      const {items} = await response.data;
  
      const repo = items.find(d => d.language.toLowerCase() === lang);
      repos.push(repo);
    }catch(e){
      throw new Error(e);
    }
  }
  
  return repos;
}