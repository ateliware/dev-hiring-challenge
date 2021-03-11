import React from "react";

import { Card } from "react-bootstrap";

import RepositoryShow from "./RepositoryShow";

/**
 * UpdateButton component
 * 
 * Props: { moving, handleClick }
 * 
 * Parents:
 *  - LanguageShow
 */
class UpdateButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const moving = "fa fa-refresh fa-spin";
    const normal = "fa fa-refresh";

    return (
      <a className="update" onClick={this.props.handleClick}>
        <i className={this.props.moving ? moving : normal} />
      </a>
    );
  }
}

/**
 * LanguageShow component
 * 
 * Props: { language, openModal, languageState, sendUpdateRequest }
 * 
 * State: { movingButton, repositories }
 * 
 * Children: [ UpdateButton, RepositoryShow ]
 * - UpdateButton.props:
 *  - attributes: { moving }
 *  - callbacks: { handleClick }
 * - RepositoryShow.props:
 *  - attributes: { repository, key }
 *  - callbacks: { openModal }
 * 
 * Parents:
 *  - LanguageIndex
 */
class LanguageShow extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  render () {
    const language = this.props.language;
    
    return (
      <Card bg="dark" style={{ width: '270px' }} text="white" className="mb-2">
        <Card.Header>
          {language.name}

          <UpdateButton
            moving={this.props.languageState.movingButton}
            handleClick={this.handleUpdate} />
        </Card.Header>

        <Card.Body style={{ padding: "0px" }}>
          { 
            this.props.languageState.repositories.map((repository) =>
              <RepositoryShow
                repository={repository}
                key={repository.id}
                openModal={this.props.openModal} />
            ) 
          }
        </Card.Body>
      </Card>
    );
  }

  // Request for repositories update for this language
  handleUpdate() {
    this.props.sendUpdateRequest(this.props.language.id);
  }  
}

export default LanguageShow
