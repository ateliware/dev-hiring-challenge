import { NextApiRequest, NextApiResponse } from "next";
import { database, forceGithubFetch } from "./index.page";

const RepositoriesLanguageRefresh = async (
  req: NextApiRequest,
  res: NextApiResponse<{ error: boolean }>
) => {
  const {
    query: { language, q },
  } = req;
  try {
    let error: boolean = false;
    let statusCode: number = 200;
    if (req.method === "POST") {
      if (typeof language !== "string") {
        throw new Error("language param is not valid");
      }
      if (typeof q !== "string") {
        throw new Error("query param is not valid");
      }
      const fetched = await forceGithubFetch(q, language);
      if (!fetched) {
        throw new Error("problem fetching github");
      }
      error = false;
      statusCode = 200;
    } else {
      error = true;
      statusCode = 403;
    }
    const connection = await database.getConnection();
    connection.destroy();
    return res.status(statusCode).json({ error });
  } catch (e) {
    const connection = await database.getConnection();
    connection.destroy();
    return res.status(500).json({ error: true });
  }
};
export default RepositoriesLanguageRefresh;
