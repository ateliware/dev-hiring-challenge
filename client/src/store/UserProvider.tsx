import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react"
import { v4 } from "uuid"
import { Repository } from "../components/repository/Repository"
import {
  deleteUserLikedRepository,
  getUserLikedRepositories,
  insertUserLikedRepository,
} from "../services/api"

type UserContextProps = {
  userId: string
  logout: () => void
  likeds: Repository[]
  toggleLike: (data: Repository) => void
  alreadyLiked: (data: Repository) => boolean
}

const USER_ID_KEY = "ateliware-dev-hiring-challange@user-id"

const UserContext = createContext<UserContextProps>(undefined!)

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [userId, setUserId] = useState<string>("")
  const [likeds, setLikeds] = useState<Repository[]>([])

  useEffect(() => {
    const userId = localStorage.getItem(USER_ID_KEY)
    if (userId) {
      setUserId(userId)
    } else {
      localStorage.setItem(USER_ID_KEY, v4())
    }
  }, [])

  useEffect(() => {
    if (!userId) return

    async function getData() {
      const data = await getUserLikedRepositories(userId)
      setLikeds(data.map((l) => l.repository.dataObj))
    }
    getData()
  }, [userId])

  const logout = () => {
    localStorage.removeItem(USER_ID_KEY)
    window.location.reload()
  }

  const alreadyLiked = (repository: Repository) => {
    return !!likeds.find((l) => l.id === repository.id)
  }

  const toggleLike = (repository: Repository) => {
    const hasLiked = alreadyLiked(repository)
    console.log({ hasLiked })
    console.log({
      userId,
      repositoryId: String(repository.id),
    })
    if (hasLiked) {
      deleteUserLikedRepository(userId, String(repository.id))
      setLikeds((p) => p.filter((l) => l.id !== repository.id))
    } else {
      insertUserLikedRepository(userId, String(repository.id))
      setLikeds((p) => [...p, repository])
    }
  }

  return (
    <UserContext.Provider
      value={{ userId, logout, likeds, toggleLike, alreadyLiked }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
