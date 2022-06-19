import { useState } from "react";
import { ApiResponse, FeedbackMessage, getApiFeedback, isApiLoaded, isApiLoading, isApiWaiting, RemoteDataState, Repositorie, setAsError, setLoaded, setLoading, setWaiting } from "../shared"
import { get, post } from "../shared/api";
import { AccessToken, Token } from "../users";

interface FavoriteHook {
  repositories: ApiResponse<Repositorie[]>;
  add: (payload: Repositorie, token: Token, refresh: () => Promise<AccessToken>) => Promise<void>;
  load: (token?: Token, refresh?: () => Promise<AccessToken>) => Promise<void>;
}

export const useFavorite = (): FavoriteHook => {
  const [ repositories, setRepositories ] = useState<ApiResponse<Repositorie[]>>(initialRepositories);

  const setRepositoriesLoading = setLoading(setRepositories);
  const setRepositoriesLoaded = setLoaded(setRepositories);
  const setRepositoriesAsError = setAsError(setRepositories);
  const setRepositoriesWaiting = setWaiting(setRepositories);

  const add = async (payload: Repositorie, token: Token, refresh: () => Promise<AccessToken>): Promise<void> => {
    setRepositoriesLoading();
    const addResponse = await requestAdd({
      id: payload.id,
      html_url: payload.html_url,
      full_name: payload.full_name,
      created_at: payload.created_at,
      description: payload.description,
    }, token, refresh);
    switch(addResponse.state) {
      case(RemoteDataState.LOADED):
        setRepositoriesWaiting("Repositorie added as favorite");
        break;
      case(RemoteDataState.ERROR):
        setRepositoriesAsError(addResponse.detail);
        break;
    }
  }

  const load = async (token?: Token, refresh?: () => Promise<AccessToken>): Promise<void> => {
    setRepositoriesLoading();
    const loadResponse = await requestLoad({}, token, refresh);
    switch(loadResponse.state) {
      case(RemoteDataState.LOADED):
        setRepositoriesLoaded(loadResponse.data, "Repositorie loaded");
        break;
      case(RemoteDataState.ERROR):
        setRepositoriesAsError(loadResponse.detail);
        break;
    }
  }

  return { repositories, add, load };
}

export const selectors = {
  isLoading: (state?: FavoriteHook): boolean => isApiLoading(state?.repositories),
  isWaiting: (state?: FavoriteHook): boolean => isApiWaiting(state?.repositories),
  isLoggedIn: (state?: FavoriteHook): boolean => isApiLoaded(state?.repositories),
  getFeedback: (state?: FavoriteHook): FeedbackMessage | undefined => getApiFeedback(state?.repositories),
}

const initialRepositories: ApiResponse<Repositorie[]> = {
  state: RemoteDataState.WAITING
}

const requestAdd = post<Repositorie, Repositorie>("/api/v1/repositories/");
const requestLoad = get<Repositorie[]>("/api/v1/repositories/");

