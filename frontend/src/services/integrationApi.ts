import axios from "axios";

export const BASE_URL = "https://books.ioasys.com.br/api/v1";

export const fetchRepositories = async (language: any) => {
  return await axios.get(
    `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=12`
    // {
    //   headers: { authorization: `Bearer ${auth}` },
    // }
  );
};
