import {
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { LANGS } from "../../../assets/langs"
import { ApiResponse, fetchRepositories } from "../../../services/api"
import { useUser } from "../../../store/UserProvider"
import { RepositoryGrid } from "../../repository/RepositoriesGrid"

export const TabsPanel = () => {
  const [language, setLanguage] = useState<string>(LANGS[0].value)
  const [repos, setRepos] = useState<ApiResponse>({ total_count: 0, items: [] })
  const toast = useToast()
  const { userId } = useUser()

  const getRepositories = async () => {
    const data = await fetchRepositories(language, userId)
    if (!data.items.length) {
      toast({
        title: "Failed to fetch",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } else {
      setRepos(data)
    }
  }

  useEffect(() => {
    if (!userId) return
    getRepositories()
  }, [language, userId])

  const onChangeTab = (index: number) => {
    setRepos({ total_count: 0, items: [] })
    setLanguage(LANGS[index].value)
  }

  return (
    <Tabs isFitted variant='enclosed-colored' isLazy onChange={onChangeTab}>
      <TabList mb='1em'>
        {LANGS.map((lang) => (
          <Tab key={lang.value} _selected={{ color: lang.color, bg: lang.bg }}>
            {lang.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {repos.items.length > 0 ? (
          Array(LANGS.length)
            .fill(null)
            .map((_, index) => (
              <TabPanel key={LANGS[index].value}>
                <RepositoryGrid repositories={repos.items} />
              </TabPanel>
            ))
        ) : (
          <Flex align='center' justify='center'>
            <Spinner size='xl' />
          </Flex>
        )}
      </TabPanels>
    </Tabs>
  )
}
