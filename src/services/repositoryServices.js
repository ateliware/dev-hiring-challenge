import axios from "axios";
// import AppError from "../utils/appError"

const getMostStarredRepository = async (language) => {
  const { status, data } = await axios.get(
    `https://api.github.com/search/repositories?sort=stars&q=stars:%3E1+language:${language}+stars:>1600&per_page=5`
  );
  return data;
};

export { getMostStarredRepository };
