import axios from "axios"
import { Repository } from "../components/repository/Repository"

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
})

export type ApiResponse = {
  total_count: number
  items: Repository[]
}

export const fetchRepositories = async (
  language: string,
  userId: string,
): Promise<ApiResponse> => {
  try {
    const { data } = await api.get<ApiResponse>(
      `/repositories/${language}/${userId}`,
    )
    return data
  } catch (err) {
    console.error("[ERROR] fetching repositories", { err })
  }
  return { total_count: 0, items: [] }
}

export const getUserLikedRepositories = async (userId: string) => {
  try {
    const { data } = await api.get(`/liked-repositories/${userId}`)
    return data
  } catch (err) {
    console.error("[ERROR] getting user liked repositories", { err })
  }
  return []
}

export const insertUserLikedRepository = async (
  userId: string,
  repositoryId: string,
) => {
  try {
    const { data } = await api.post("liked-repository", {
      userId,
      repositoryId,
    })
    return data
  } catch (err) {
    console.error("[ERROR] insert user liked repository", { err })
  }
  return {}
}

export const deleteUserLikedRepository = async (
  userId: string,
  repositoryId: string,
) => {
  try {
    const { data } = await api.delete(
      `/liked-repository/${userId}/${repositoryId}`,
    )
    return data
  } catch (err) {
    console.error("[ERROR] delete user liked repository", { err })
  }
  return {}
}
