import React, { useState } from "react";
import RepositoryItem from "../repositoryItem/repositoryItem";
import "./repositoryList.css";
import { TailSpin } from "react-loading-icons";

const RepositoryListComponent = ({ repositoryListData, codeLanguage }) => {
  const [isExpanded, setIsExpanded] = useState({
    id: null,
    status: false,
  });

  const isExpandedHandler = (id) => {
    if (id === isExpanded.id) {
      setIsExpanded({ id, status: !isExpanded.status });
      return;
    }
    setIsExpanded({ id, status: true });
  };

  return (
    <div className='repository__card--list'>
      <div className='repository__card--head'>
        <div>Nome</div>
        <div>Repositorio</div>
        <div>Estrelas</div>
      </div>
      {repositoryListData ? (
        repositoryListData.map((repositoryItem) => (
          <RepositoryItem
            key={repositoryItem.id}
            icon={codeLanguage}
            repositoryData={repositoryItem}
            handler={isExpandedHandler}
            isExpanded={isExpanded}
          />
        ))
      ) : (
        <div className='loading'>
          <TailSpin stroke='#06bcee' />
        </div>
      )}
    </div>
  );
};

export default RepositoryListComponent;
