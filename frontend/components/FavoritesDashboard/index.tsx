import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { selectors as favoriteSelectors, useFavorite } from "../../libs/favorites"
import { RemoteDataState } from "../../libs/shared"
import { selectors as userSelectors } from "../../libs/users"
import { DataContext } from "../AppProvider"
import { Feedback } from "../Feedback"
import { RepositorieTable } from "../RepositoriesTable"

export const FavoriteDashboard = (): JSX.Element => {
  const [ hasRequested, setHasRequest ] = useState<boolean>(false);
  const [ timer, setTimer ] = useState<number>();
  const { auth } = useContext(DataContext);
  const favorites = useFavorite();
  const router = useRouter();

  useEffect(() => {
    if (!userSelectors.isLoggedIn(auth)) {
      router.push('/login');
    } else if (favorites?.repositories?.state == RemoteDataState.WAITING && !hasRequested) {
      setHasRequest(true);
      clearTimeout(timer);
      setTimer(window.setTimeout(() => {
        favorites.load(auth?.token, auth?.refresh);
      }, 500));
    }
    return () => clearTimeout(timer);
  }, [auth, router, favorites, hasRequested, timer]);

  return (
    !userSelectors.isLoggedIn(auth)
      ? <div>Not logged in, redirecting you...</div>
      : (
        <>
          <div className="w-full text-center">
            <Feedback
              message={favoriteSelectors.getFeedback(favorites)}
              isPositiveMessage={favoriteSelectors.isWaiting(favorites) || favoriteSelectors.isLoggedIn(favorites)}
            />
          </div>
          <div className="card w-full bg-white p-1 relative overflow-scroll" style={{ height: "300px" }}>
            {
              favorites.repositories.state === RemoteDataState.LOADED
                ? <RepositorieTable repositories={favorites.repositories.data} withFavorite={false} />
                : <span>Repositories not loaded yet</span>
            }
          </div>
        </>
      )
  )
}
