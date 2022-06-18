export type ApiResponse<T> = RemoteDataError | RemoteDataLoading | RemoteDataWaiting | RemoteDataLoaded<T>;

export enum TypeUser {
  PROFILE="profile",
  ANONYMOUS="anonymous"
}

export enum TypeResponse {
  SUCCESS="success",
  ERROR="error",
}

export enum RemoteDataState {
  LOADED="loaded",
  LOADING="loading",
  ERROR="error",
  WAITING="waiting",
}

export interface Repositorie {
  id: number;
  full_name: string;
  html_url: string;
  description: string;
  created_at: string; 
}

export interface Repositories {
  state: RemoteDataState;
  items: Repositorie[];
  detail?: string;
}

export interface User {
  username: string;
  repositories: Repositories;
}

export interface RemoteDataLoading {
  state: RemoteDataState.LOADING;
}

export interface RemoteDataLoaded<T> {
  state: RemoteDataState.LOADED;
  data: T;
  detail?: FeedbackMessage;
}

export interface RemoteDataWaiting {
  state: RemoteDataState.WAITING;
  detail?: FeedbackMessage;
}

export interface FeedbackMessage {
  [key: string]: string | string[];
}

export interface RemoteDataError {
  state: RemoteDataState.ERROR;
  detail: FeedbackMessage;
}

export const createPostParams = <T>(body: T): RequestInit => {
  const headers = new Headers({
    "Content-Type": "application/json"
  });

  return {
    headers,
    method: "POST",
    body: JSON.stringify(body)
  }
}

export const verifyResponse = <T>(response: Response): Promise<ApiResponse<T>> => (
  okStatusCodes.some(status => response.status === status)
    ? response.json().then((data: T) => ({ data, state: RemoteDataState.LOADED, type: TypeResponse.SUCCESS }))
    : response.json().then((detail: FeedbackMessage) => ({ detail, state: RemoteDataState.ERROR, type: TypeResponse.ERROR }))
)

const okStatusCodes = [200, 201, 202]

