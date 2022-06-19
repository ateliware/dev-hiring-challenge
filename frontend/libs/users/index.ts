import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"
import { ApiResponse, FeedbackMessage, getApiFeedback, isApiLoaded, isApiLoading, isApiWaiting, RemoteDataState, setAsError, setLoaded, setLoading, setWaiting, User } from "../shared";
import { post } from "../shared/api";

export interface UserPayload {
  username: string;
  password: string;
}

export interface UserRegisterPayload extends UserPayload {
  password2: string;
}

export interface AccessToken {
  access: string;
}

export interface RefreshToken {
  refresh: string;
}

export type Token = AccessToken & RefreshToken;

export interface UserHook {
  user: ApiResponse<User>;
  token: Token;
  login: (payload: UserPayload) => Promise<void>;
  signup: (payload: UserRegisterPayload) => Promise<void>;
  refresh: () => Promise<AccessToken>;
}

export const useUser = (): UserHook => {
  const [ user, setUser ] = useState<ApiResponse<User>>(initialUser);
  const [ token, setToken ] = useState<Token>(initialToken);
  const [ hasTryToLoadUserToken, setHasTryToLoadUserToken ] = useState<boolean>(false);

  const setUserLoading = setLoading(setUser);
  const setUserLoaded = setLoaded(setUser);
  const setUserAsError = setAsError(setUser);
  const setUserWaiting = setWaiting(setUser);
  const updateToken = updateTokenAction(setToken);
  const loadToken = loadTokenAction(setToken, setUserLoaded);

  const login = async (body: UserPayload): Promise<void> => {
    setUserLoading();
    const tokenResponse = await requestLogin(body);
    switch(tokenResponse.state) {
      case(RemoteDataState.LOADED):
        updateToken(tokenResponse.data, body.username);
        setUserLoaded({ username: body.username }, LOGIN_MESSAGE);
        break;
      case(RemoteDataState.ERROR):
        updateToken(initialToken);
        setUserAsError(tokenResponse.detail);
        break;
    }
  }

  const signup = async (body: UserRegisterPayload): Promise<void> => {
    setUserLoading();
    const profileResponse = await requestSignup(body);
    switch(profileResponse.state) {
      case(RemoteDataState.LOADED):
        updateToken(initialToken);
        setUserWaiting(SIGNUP_MESSAGE);
        break;
      case(RemoteDataState.ERROR):
        updateToken(initialToken);
        setUserAsError(profileResponse.detail);
        break;
    }
  }

  const refresh = useCallback(async (): Promise<AccessToken> => {
    setUserLoading();
    const tokenResponse = await requestRefresh({ refresh: token.refresh });
    switch(tokenResponse.state) {
      case(RemoteDataState.LOADED):
        const nextToken = { ...token, access: tokenResponse.data.access };
        updateToken(nextToken);
        const username = user.state !== RemoteDataState.LOADED ? 'NO_NAME?!?' : user.data.username;
        setUserLoaded({ username }, LOGIN_MESSAGE);
        return nextToken;
      case(RemoteDataState.ERROR):
        updateToken(initialToken);
        setUserAsError(tokenResponse.detail);
        break;
    }
    return initialToken;
  }, [ setUserLoading, token, updateToken, setUserAsError, user, setUserLoaded ]);

  useEffect(() => {
    if (!hasTryToLoadUserToken) {
      setHasTryToLoadUserToken(true);
      loadToken();
    } else if (user.state === RemoteDataState.WAITING && token.refresh && token.refresh !== '') {
      refresh();
    }
  }, [ hasTryToLoadUserToken, token, loadToken, refresh, user.state ]);
  
  return { user, login, signup, refresh, token };
}

export const selectors = {
  isLoading: (state?: UserHook): boolean => isApiLoading(state?.user),
  isWaiting: (state?: UserHook): boolean => isApiWaiting(state?.user),
  isLoggedIn: (state?: UserHook): boolean => isApiLoaded(state?.user),
  getFeedback: (state?: UserHook): FeedbackMessage | undefined => getApiFeedback(state?.user),
}

export const initialUser: ApiResponse<User> = {
  state: RemoteDataState.WAITING,
}

export const initialToken: Token = {
  access: '',
  refresh: '',
}

const requestLogin = post<Token, UserPayload>("/api/v1/auth/token/")
const requestSignup = post<User, UserRegisterPayload>("/api/v1/auth/register/")
const requestRefresh = post<AccessToken, RefreshToken>("/api/v1/auth/token/refresh/")

const updateTokenAction = (dispatch: Dispatch<SetStateAction<Token>>) => (token: Token, username?: string): void => {
  localStorage.setItem('token', JSON.stringify({ ...token, username }));
  dispatch(token);
}

const loadTokenAction = (dispatch: Dispatch<SetStateAction<Token>>, dispatchUser: (data: User, detail: string) => void) => (): void => {
  try {
    const token = JSON.parse(localStorage.getItem('token') || '');
    if (token.username) {
      dispatchUser({ username: token.username }, "User loaded. We are redirecting you");
    }
    dispatch(token);
  } catch(err) {}
}

const LOGIN_MESSAGE = "User loaded. We are redirecting you";

const SIGNUP_MESSAGE = "User signup with success!";
