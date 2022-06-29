import { GridItem, SimpleGrid } from "@chakra-ui/react"
import { Repository } from "./Repository"
import { RepositoryCard } from "./RepositoryCard"

interface RepositoryGridProps {
  repositories: Repository[]
}

export const RepositoryGrid = ({ repositories }: RepositoryGridProps) => {
  return (
    <SimpleGrid columns={[1, 2]} spacingX='40px' spacingY='20px'>
      {repositories.map((repository) => (
        <GridItem key={repository.id}>
          <RepositoryCard repository={repository} />
        </GridItem>
      ))}
    </SimpleGrid>
  )
}
