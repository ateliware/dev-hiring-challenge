import axios from "axios";

export default {
  montarUrl(busca) {
    if (!busca) {
      throw new Error("Campo de pesquisa não pode estar nulo");
    }

    const URL = "https://api.github.com/search/repositories";
    const SORT = "sort=stars";
    const PAGE = "page=0";
    const SIZE = "per_page=5";
    const Q = `q=language:${busca}`

    return `${URL}?${SORT}&${PAGE}&${SIZE}&${Q}`;
  },

  buscarRepositorios(url) {
    console.log(url)
    return axios.get(url);
  }
}