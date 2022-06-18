import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { selectors } from "../../libs/users"
import { DataContext } from "../AppProvider"

export const FavoriteDashboard = (): JSX.Element => {
  const { auth } = useContext(DataContext)
  const router = useRouter();

  useEffect(() => {
    if (!selectors.isLoggedIn(auth)) {
      router.push('/login');
    }
  }, [auth, router]);

  return (
    !selectors.isLoggedIn(auth)
      ? <div>Not logged in, redirecting you...</div>
      : <div>Favoritesa</div>
  )
}
