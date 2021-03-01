import { useQuery } from 'react-query';
import api from '../services/api';

import IRepository from '../interfaces/Repository';

const getMostStarredRepositories = async ({ queryKey }) => {
  const { data } = await api.get<IRepository[]>(
    `starred_repos?language=${encodeURIComponent(queryKey[1])}`,
  );

  return data;
};

export default function useMostStarredRepositories(language: string, isEnabled: boolean) {
  return useQuery<IRepository[], Error>(
    [`${language}_most_starred_repos`, language],
    getMostStarredRepositories,
    {
      enabled: isEnabled,
    },
  );
}
