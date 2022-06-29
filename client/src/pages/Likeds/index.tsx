import { Box } from "@chakra-ui/react"
import { Navbar } from "../../components/layout/Navbar"
import { RepositoryGrid } from "../../components/repository/RepositoriesGrid"
import { useUser } from "../../store/UserProvider"

export const Likeds = () => {
  const { likeds } = useUser()

  return (
    <Box>
      <Navbar />
      <Box p={5}>
        <RepositoryGrid repositories={likeds} />
      </Box>
    </Box>
  )
}
