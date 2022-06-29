import { Rotas } from "./routes"
import { UserProvider } from "./store/UserProvider"

export const App = () => {
  return (
    <UserProvider>
      <Rotas />
    </UserProvider>
  )
}
