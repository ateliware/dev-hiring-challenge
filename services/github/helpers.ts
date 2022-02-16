import { RepositoryDatabaseData, RepositoryJsonData } from ".";

const fromDatabaseToJson = (
  data: RepositoryDatabaseData
): RepositoryJsonData => {
  return {
    id: data.id,
    node_id: data.node_id,
    name: data.name,
    full_name: data.full_name,
    description: data.description,
    url: data.url,
    html_url: data.html_url,
    language: data.language,
    created_at: data.created_at,
    updated_at: data.updated_at,
    stargazers_count: data.stargazers_count,
    topics: JSON.parse(data.topics),
    owner: {
      login: data.owner__login,
      id: data.owner__id,
      url: data.owner__url,
      avatar_url: data.owner__avatar_url,
    },
  };
};

const fromJsonToDatabase = (
  data: RepositoryJsonData
): RepositoryDatabaseData => {
  return {
    id: Number(data.id),
    node_id: String(data.node_id),
    name: String(data.name),
    full_name: String(data.full_name),
    description: String(data.description),
    url: String(data.url),
    html_url: String(data.html_url),
    language: String(data.language),
    created_at: String(data.created_at),
    updated_at: String(data.updated_at),
    stargazers_count: Number(data.stargazers_count),
    topics: JSON.stringify(data.topics),
    owner__login: String(data.owner.login),
    owner__id: Number(data.owner.id),
    owner__url: String(data.owner.url),
    owner__avatar_url: String(data.owner.avatar_url),
  } as RepositoryDatabaseData;
};

export const converter = {
  fromDatabase: fromDatabaseToJson,
  toDatabase: fromJsonToDatabase,
};
