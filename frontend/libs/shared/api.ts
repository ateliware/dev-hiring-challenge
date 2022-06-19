import { ApiResponse, FeedbackMessage, RemoteDataState } from ".";
import { AccessToken, initialToken } from "../users";

export const get = <R>(endpoint: string) => async (params: Record<string, string>={}, token?: AccessToken, refresh?: () => Promise<AccessToken>, tryAgain: boolean=true): Promise<ApiResponse<R>> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${endpoint}?${mountQueryParams(params)}`,
    createGetParams(token)
  );

  if (tryAgain && response.status === 401) {
    const nextAccessToken = refresh && await refresh();
    return get<R>(endpoint)(params, nextAccessToken || initialToken, refresh, false);
  }
  return verifyResponse<R>(response);
}

export const post = <R, B>(endpoint: string) => async (body: B, token?: AccessToken, refresh?: () => Promise<AccessToken>, tryAgain: boolean=true): Promise<ApiResponse<R>> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${endpoint}`,
    createPostParams(body, token)
  )

  if (tryAgain && response.status === 401) {
    const nextAccessToken = refresh && await refresh();
    return post<R, B>(endpoint)(body, nextAccessToken, refresh, false);
  }
  return verifyResponse<R>(response);
}

const createPostParams = <T>(body: T, token?: AccessToken): RequestInit => {
  const headers = new Headers({
    "Content-Type": "application/json"
  });

  if (token) {
    headers.set("Authorization", `Bearer ${token.access}`);
  }

  return {
    headers,
    method: "POST",
    body: JSON.stringify(body)
  }
}

const createGetParams = (token?: AccessToken): RequestInit => {
  const headers = new Headers();

  if (token) {
    headers.set("Authorization", `Bearer ${token.access}`);
  }

  return {
    headers,
    method: "GET",
  };
}

const verifyResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  switch(response.status) {
    case(200):
    case(201):
      const data: T = await response.json();
      return { data, state: RemoteDataState.LOADED };
    default:
      return response.json().then((detail: FeedbackMessage) => ({ detail, state: RemoteDataState.ERROR }))
  }
}

const mountQueryParams = (params: Record<string, string>={}): string => (
  Object.keys(params).reduce((result: string[], key: string) => (
    result.concat(`${key}=${params[key]}`)
  ), []).join("&")
)
