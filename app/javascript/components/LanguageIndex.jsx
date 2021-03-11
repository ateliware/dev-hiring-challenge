import React, { useRef } from "react";

import { Button } from "react-bootstrap";

import consumer        from "../channels/consumer";
import LanguageShow    from "./LanguageShow";
import RepositoryModal from "./RepositoryModal";

/**
 * LanguageIndex component
 * 
 * Props: { languages }
 * 
 * State: { showModal, repoInfo, languageId: { movingButton, repositories } }
 * 
 * Children: [ LanguageShow, RepositoryModal ]
 * - LanguageShow.props:
 *  - attributes: { language, languageState }
 *  - callbacks: { openModal, sendUpdateRequest }
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

    var stage = this.props.languages.map((x) => x.id).reduce((map, obj) => {
      map[obj] = {
          movingButton: false,
          repositories: []
      };
      return map;
    }, {});

    this.state = {
      showModal: false,
      repoInfo: null,
      ...stage
    };

    
    this.subscription = null;

    this.setModal = this.setModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.sendUpdateRequest = this.sendUpdateRequest.bind(this);
    this.sendUpdateAllRequests = this.sendUpdateAllRequests.bind(this);
  }

  render() {
    return (
      <div className="content">
        <Button
          onClick={this.sendUpdateAllRequests}
          className="update-button">
          Update repositories
        </Button>

        <div className="list">
          <ul>
            {
              this.props.languages.map((language) => 
                <li className="name" key={language.id}>
                  <LanguageShow
                    language={language}
                    openModal={this.setModal}
                    languageState={this.state[language.id]}
                    sendUpdateRequest={this.sendUpdateRequest} />
                </li>
              )
            }
          </ul>
        </div>

        <RepositoryModal
          show={this.state.showModal}
          repository={this.state.repoInfo}
          handleClose={this.closeModal} />
      </div>
    );
  }

  sendUpdateAllRequests() {
    this.props.languages.forEach((x) => this.sendUpdateRequest(x.id))
  }

  // Request for repositories update for languageId
  sendUpdateRequest(languageId) {
    const csrf = document
      .querySelector("meta[name='csrf-token']")
      .getAttribute("content");

    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf
      }
    };

    const url = `languages/${languageId}/update_repositories`;

    this.setState({
      [languageId]: {
        movingButton: true,
        repositories: []
      }
    });

    fetch(url, requestOptions)
      .then(data => {
        if (data.status != 204) {
          console.log("Error");
        }
      });
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

  // Calls WebSocket subscription when component mounts
  componentDidMount() {
    this.setupSubscription();
  }

  componentWillUnmount() {
    if (this.subscription) {
      ThemeConsumer.subscription.remove(this.subscription);
    }
  }

  // Callback for when data is received through subscription
  updateRepositoryList(data) {
    this.setState({
      [data.language.id]: { 
        repositories: data.language.repositories,
        movingButton: false
      }
    });
  }

  // The subscription will signal "received", when request for repositories 
  // update is finished and the back-end sends the data through WebSockets,
  // which will trigger updateRepositoryList method
  setupSubscription() {
    this.subscription = consumer.subscriptions.create("RepositoriesChannel", {
      connected() {},

      disconnected() {},

      received(data) {
        this.update(data);
      },

      update: this.updateRepositoryList.bind(this)
    });
  }
}

export default LanguageIndex
