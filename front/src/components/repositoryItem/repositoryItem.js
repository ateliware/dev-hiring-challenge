import React from "react";
import "./repositoryItem.css";
import fetchIcon from "../../utils/fetchIcon";
import fetchColor from "../../utils/fetchColor";

const RepositoryItemComponent = ({
  repositoryData,
  icon,
  handler,
  isExpanded,
}) => {
  const COLOR = fetchColor(repositoryData.language);
  const styles = {
    languageColor: {
      color: COLOR,
    },
  };

  return (
    <>
      <div
        className='repository__card'
        onClick={() => handler(repositoryData.id)}
      >
        <img src={fetchIcon(icon)} alt={icon} />
        <div className='repository__card__data'>{repositoryData.name}</div>
        <div className='repository__card__data'>{repositoryData.fullName}</div>
        <div className='repository__card__data'>{repositoryData.stars}</div>
      </div>
      {isExpanded.id === repositoryData.id && isExpanded.status && (
        <div className='repository__card__details'>
          <div
            className='repository__card__details__item'
            style={styles.languageColor}
          >
            Url:
            <span>
              <a href={repositoryData.url}>{repositoryData.url}</a>
            </span>
          </div>
          <div
            className='repository__card__details__item'
            style={styles.languageColor}
          >
            Clone url: <span>{repositoryData.cloneUrl}</span>
          </div>
          <div
            className='repository__card__details__item'
            style={styles.languageColor}
          >
            Owner: <span>{repositoryData.owner}</span>
          </div>
          <div
            className='repository__card__details__item'
            style={styles.languageColor}
          >
            Watchers: <span>{repositoryData.watchers}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default RepositoryItemComponent;
