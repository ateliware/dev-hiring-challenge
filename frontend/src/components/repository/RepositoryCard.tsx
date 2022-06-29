import { Button, Flex, Link, Text } from "@chakra-ui/react"
import { toArray } from "react-emoji-render"
import { FaStar, FaThumbsDown, FaThumbsUp } from "react-icons/fa"
import { useUser } from "../../store/UserProvider"
import { Repository } from "./Repository"

type RepositoryCardProps = {
  repository: Repository
}

const parseEmojis = (value: string) =>
  value
    ? toArray(value).reduce(
        (previous, current) =>
          `${previous}${
            typeof current === "string"
              ? current
              : (current as any).props.children
          }`,
        "",
      )
    : ""

export const RepositoryCard = ({ repository }: RepositoryCardProps) => {
  const { alreadyLiked, toggleLike } = useUser()
  const userLikedThis = alreadyLiked(repository)

  return (
    <Flex
      direction='column'
      boxShadow='md'
      rounded='md'
      p='6'
      border='1px'
      fontSize={["2xl"]}
      gap={2}
    >
      <Flex align='center' justify='space-between' direction='row'>
        <Text fontSize={["lg", "2xl"]} fontWeight='bold'>
          {`${repository.name}`}
        </Text>

        <Flex align='center' justify='center' direction='row' gap={1}>
          <FaStar color='#F7DF1E' />
          <Text>{`${repository.stargazers_count}`}</Text>
        </Flex>
      </Flex>

      <Text noOfLines={1} fontSize={["md", "lg"]} wordBreak='break-word'>
        {`${parseEmojis(repository.description)}`}
      </Text>

      <Flex align='center' justify='space-between' direction='row' gap={1}>
        <Link
          noOfLines={1}
          fontSize='lg'
          color='blue.500'
          href={repository.html_url}
          isExternal
        >
          {repository.full_name}
        </Link>

        <Button
          leftIcon={
            userLikedThis ? (
              <FaThumbsDown style={{ transform: "scaleX(-1)" }} />
            ) : (
              <FaThumbsUp />
            )
          }
          colorScheme={userLikedThis ? "red" : "blue"}
          variant='solid'
          onClick={() => toggleLike(repository)}
        >
          {userLikedThis ? "Dislike" : "Like"}
        </Button>
      </Flex>
    </Flex>
  )
}
