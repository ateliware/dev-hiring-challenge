import { useRouter } from "next/router";
import { useContext } from "react";
import { selectors as favoriteSelectors, useFavorite } from "../../libs/favorites";
import { Repositorie } from "../../libs/shared";
import { initialToken, selectors as userSelectors } from "../../libs/users";
import { DataContext } from "../AppProvider";
import { Feedback } from "../Feedback";

export interface RepositorieTableProps {
  repositories: Repositorie[];
  withFavorite: boolean;
}
export const RepositorieTable = (props: RepositorieTableProps): JSX.Element => {
  const { auth } = useContext(DataContext);
  const favorites = useFavorite();
  const router = useRouter();

  return (
    <>
      <div className="text-center">
        <Feedback
          isPositiveMessage={favoriteSelectors.isWaiting(favorites) || favoriteSelectors.isLoggedIn(favorites)}
          message={favoriteSelectors.getFeedback(favorites)}
        />
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <td className="card p-1">Name</td>
            <td className="card p-1 w-1/2">Description</td>
            <td className="card p-1">Created at</td>
            { !props.withFavorite ? null : <td className="card p-1">Fav</td> }
          </tr>
        </thead>
        <tbody>
          {
            props.repositories.map((repositorie: Repositorie) => (
              <tr key={repositorie.id}>
                <td className="p-1 bg-slate-100 align-top">{wrapText(repositorie.full_name, 120)}</td>
                <td className="p-1 bg-slate-100 align-top">{wrapText(repositorie.description, 120)}</td>
                <td className="p-1 bg-slate-100 align-top">{repositorie.created_at}</td>
                { !props.withFavorite
                    ? null
                    : <td
                        onClick={() => {
                          if (userSelectors.isLoggedIn(auth)) {
                            favorites.add(
                              repositorie,
                              auth?.token || initialToken,
                              auth?.refresh || (async () => ({ access: '' }))
                            )
                          } else {
                            router.push("/login");
                          }
                        }}
                        className="p-1 text-center btn btn-primary text-yellow-300 text-2xl t-shadow"
                      >★</td>
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

const wrapText = (value: string, trimIndex: number): string => (
  value.length < trimIndex ? value : `${value.slice(0, trimIndex)}...`
)
