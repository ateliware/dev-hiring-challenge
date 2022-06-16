import type { NextPage } from "next";
import { Container, Position, Size } from "../components/Container";
import { SearchGithub } from "../components/SearchGithub";
import { Tabs } from "../components/Tabs";

const Home: NextPage = () => {
  return (
    <div className="bg-teal-700 flex justify-center h-screen items-center">
      <Container
        position={Position.STATIC}
        size={Size.MEDIUM}
        title="Search Repositories"
      >
        <Tabs
          tabsLabel={['Search repositories', 'My favorites']}
          tabsContent={[<SearchGithub key={0} />, <div key={1}>Outro</div>]}
        />
      </Container>
    </div>
  );
};

export default Home;
