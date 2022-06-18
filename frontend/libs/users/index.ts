import { useState } from "react"
import { ApiResponse, createPostParams, FeedbackMessage, RemoteDataState, User, verifyResponse } from "../shared";

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
  login: (payload: UserPayload) => Promise<void>;
  signup: (payload: UserRegisterPayload) => Promise<void>;
  refresh: () => Promise<void>;
}


export const useUser = (): UserHook => {
  const [ user, setUser ] = useState<ApiResponse<User>>(initialUser);
  const [ token, setToken ] = useState<Token>(initialToken);

  const setUserLoading = (): void => {
    setUser({
      state: RemoteDataState.LOADING
    });
  }

  const setUserLoaded = (data: User, detail: string): void => {
    setUser({
      state: RemoteDataState.LOADED,
      data,
      detail: { success: detail }
    });
  }

  const setUserWaiting = (detail: string): void => {
    setUser({
      state: RemoteDataState.WAITING,
      detail: { success: detail }
    });
  }

  const setUserAsError = (detail: FeedbackMessage): void => {
    setUser({
      state: RemoteDataState.ERROR,
      detail
    });
  }

  const updateToken = (token: Token): void => {
    localStorage.setItem('token', JSON.stringify(token));
    setToken(token);
  }

  const login = async (body: UserPayload): Promise<void> => {
    setUserLoading();
    const tokenResponse = await requestLogin(body);
    switch(tokenResponse.state) {
      case(RemoteDataState.LOADED):
        updateToken(tokenResponse.data);
        setUserLoaded(ofUser(body.username), "User loaded. We are redirecting you");
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
        setUserWaiting('User signup with success!');
        break;
      case(RemoteDataState.ERROR):
        updateToken(initialToken);
        setUserAsError(profileResponse.detail);
        break;
    }
  }

  const refresh = async (): Promise<void> => {
    setUserLoading();
    const tokenResponse = await requestRefresh({ refresh: token.refresh });
    switch(tokenResponse.state) {
      case(RemoteDataState.LOADED):
        updateToken({ ...token, access: tokenResponse.data.access });
        break;
      case(RemoteDataState.ERROR):
        updateToken(initialToken);
        setUserAsError(tokenResponse.detail);
        break;
    }
  }

  const userHook = { user, login, signup, refresh };

  return userHook;
}

export const selectors = {
  isLoading: (state?: UserHook): boolean => (
    !!state
      && state.user.state === RemoteDataState.LOADING
  ),
  isWaiting: (state?: UserHook): boolean => (
    !!state
      && state.user.state === RemoteDataState.WAITING
  ),
  isLoggedIn: (state?: UserHook): boolean => (
    !!state
      && state.user.state === RemoteDataState.LOADED
  ),
  getFeedback: (state?: UserHook): FeedbackMessage | null => (
    !!state
      && (state.user.state === RemoteDataState.WAITING || state?.user.state == RemoteDataState.ERROR || state?.user.state === RemoteDataState.LOADED)
      && state?.user?.detail
      || null
  )
}

const initialUser: ApiResponse<User> = {
  state: RemoteDataState.WAITING,
}

const initialToken: Token = {
  access: '',
  refresh: '',
}

const requestLogin = (body: UserPayload): Promise<ApiResponse<Token>> => (
  fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/auth/token/`,
    createPostParams(body)
  )
    .then((res): Promise<ApiResponse<Token>> => verifyResponse<Token>(res))
)

const requestSignup = (body: UserRegisterPayload): Promise<ApiResponse<User>> => (
  fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/auth/register/`,
    createPostParams(body)
  )
    .then((res): Promise<ApiResponse<User>> => verifyResponse<User>(res))
)

const requestRefresh = (body: RefreshToken): Promise<ApiResponse<AccessToken>> => (
  fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/auth/refresh/`,
    createPostParams(body)
  )
    .then((res): Promise<ApiResponse<AccessToken>> => verifyResponse<AccessToken>(res))
)

const ofUser = (username: string): User => ({
  username,
  repositories: {
    state: RemoteDataState.WAITING,
    items: [],
  }
});
