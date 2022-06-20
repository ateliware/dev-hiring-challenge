import { Dispatch, SetStateAction } from "react";

export type ApiResponse<T> = RemoteDataError | RemoteDataLoading | RemoteDataWaiting | RemoteDataLoaded<T>;

export enum TypeUser {
  PROFILE="profile",
  ANONYMOUS="anonymous"
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

export interface User {
  username: string;
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

export const setLoading = <T>(dispatch: Dispatch<SetStateAction<ApiResponse<T>>>) => (): void => {
  dispatch({
    state: RemoteDataState.LOADING
  });
}

export const setLoaded = <T>(dispatch: Dispatch<SetStateAction<ApiResponse<T>>>) => (data: T, detail: string): void => {
  dispatch({
    state: RemoteDataState.LOADED,
    data,
    detail: { success: detail }
  });
}

export const setWaiting = <T>(dispatch: Dispatch<SetStateAction<ApiResponse<T>>>) => (detail: string): void => {
  dispatch({
    state: RemoteDataState.WAITING,
    detail: { success: detail }
  });
}

export const setAsError = <T>(dispatch: Dispatch<SetStateAction<ApiResponse<T>>>) => (detail: FeedbackMessage): void => {
  dispatch({
    state: RemoteDataState.ERROR,
    detail
  });
}

export const isApiLoading = <T>(data?: ApiResponse<T>): boolean => (
  !!data
    && data.state === RemoteDataState.LOADING
)

export const isApiWaiting = <T>(data?: ApiResponse<T>): boolean => (
  !!data
    && data.state === RemoteDataState.WAITING
)

export const isApiLoaded = <T>(data?: ApiResponse<T>): boolean => (
  !!data
    && data.state === RemoteDataState.LOADED
)

export const getApiFeedback = <T>(data?: ApiResponse<T>): FeedbackMessage | undefined => (
  !!data
    && (data.state === RemoteDataState.WAITING || data.state == RemoteDataState.ERROR || data.state === RemoteDataState.LOADED)
    && data.detail
    || undefined
)
