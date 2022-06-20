import type { NextPage } from "next";
import { Container, Position, Size } from "../components/Container";
import { FavoriteDashboard } from "../components/FavoritesDashboard";
import { SearchGithub } from "../components/SearchGithub";
import { Tabs } from "../components/Tabs";

const Home: NextPage = () => {
  return (
    <Container
      position={Position.STATIC}
      size={Size.MEDIUM}
      title="Repositories Dashboard"
    >
      <Tabs
        tabsLabel={['Search repositories', 'My favorites']}
        tabsContent={[<SearchGithub key={0} />, <FavoriteDashboard key={1} />]}
      />
    </Container>
  );
};

export default Home;
