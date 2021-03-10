import React from "react";

import LanguageShow from "./LanguageShow";
import RepositoryModal from "./RepositoryModal";

/**
 * LanguageIndex component
 * 
 * Props: { languages }
 * 
 * State: { showModal, repoInfo }
 * 
 * Children: [ LanguageShow, RepositoryModal ]
 * - LanguageShow.props:
 *  - attributes: { language }
 *  - callbacks: { openModal }
 * - RepositoryModal.props:
 *  - attributes: { show, repository }
 *  - callbacks: { handleClose }
 * 
 * Parents:
 *  - root (views/languages/index.html.erb)
 */
class LanguageIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      repoInfo: null
    };

    this.setModal = this.setModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  render () {
    return (
      <>
        <ul>
          {
            this.props.languages.map((language) => 
              <li className="name" key={language.id}>
                <LanguageShow
                  language={language}
                  openModal={this.setModal} />
              </li>
            )
          }
        </ul>

        <RepositoryModal
          show={this.state.showModal}
          repository={this.state.repoInfo}
          handleClose={this.closeModal} />
      </>
    );
  }

  // Request repoId's attributes and set state, revealing modal
  setModal(repoId) {
    const csrf = document
      .querySelector("meta[name='csrf-token']")
      .getAttribute("content");

    const requestOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf
      }
    };

    const url = `repositories/${repoId}`;

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        this.setState({
          showModal: true,
          repoInfo: data
        });
      });
  }

  closeModal() {
    this.setState({
      showModal: false,
      repoInfo: null
    });
  }
}

export default LanguageIndex
