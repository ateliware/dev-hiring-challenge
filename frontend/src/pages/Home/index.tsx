import { Box } from "@chakra-ui/react"
import { Navbar } from "../../components/layout/Navbar"
import { TabsPanel } from "../../components/layout/Tabs"

export const Home = () => {
  return (
    <Box>
      <Navbar />
      <TabsPanel />
    </Box>
  )
}
