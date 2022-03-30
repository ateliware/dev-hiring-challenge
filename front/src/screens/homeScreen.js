import React, { useEffect, useState } from "react";
import Header from "../components/header/header.js";
import RepositoryList from "../components/repositoryList/repositoryList";
import Section from "../components/section/section";
import ButtonContainer from "../components/buttonContainer/buttonContainer";
import * as API from "../api/api";

const HomeScreen = () => {
  const [codeLanguage, setCodeLanguage] = useState("javascript");
  const [repositoryListData, setRepositoryListData] = useState(null);

  const codeLanguageHandler = (language) => {
    setCodeLanguage(language);
    setRepositoryListData(null);
  };

  useEffect(() => {
    const fetchData = () => API.fetchRepository(codeLanguage);
    fetchData().then((data) => setRepositoryListData(data));
  }, [codeLanguage, setRepositoryListData]);

  return (
    <>
      <Header />
      <Section>
        <ButtonContainer codeLanguageHandler={codeLanguageHandler} />
        <RepositoryList
          repositoryListData={repositoryListData}
          codeLanguage={codeLanguage}
        />
      </Section>
    </>
  );
};

export default HomeScreen;
