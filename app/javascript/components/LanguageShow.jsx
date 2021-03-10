import React from "react";
import consumer from "../channels/consumer";

import { Card } from "react-bootstrap";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

import RepositoryShow from "./RepositoryShow";

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

class LanguageShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movingButton: false,
      repositories: []
    };

    this.subscription = null;
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  render () {
    const language = this.props.language;
    return (
      <Card bg="dark" style={{ width: '270px' }} text="white" className="mb-2">
        <Card.Header>
          {language.name}

          <UpdateButton
            moving={this.state.movingButton}
            handleClick={this.handleUpdate} />
        </Card.Header>

        <Card.Body style={{ padding: "0px" }}>
          { 
            this.state.repositories.map((repository) =>
              <RepositoryShow 
                repository={repository}
                key={repository.id} />
            ) 
          }
        </Card.Body>
      </Card>
    );
  }

  handleUpdate() {
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

    const url = `languages/${this.props.language.id}/update_repositories`;

    fetch(url, requestOptions)
      .then(data => {
        if (data.status == 204) {
          this.setState({
            movingButton: true
          });
        } else {
          console.log("Error");
        }
      });
  }

  componentDidMount() {
    this.setupSubscription();
  }

  componentWillUnmount() {
    if (this.subscription) {
      ThemeConsumer.subscription.remove(this.subscription);
    }
  }

  updateRepositoryList(data) {
    this.setState({
      movingButton: false,
      repositories: data.repositories
    });
  }

  setupSubscription() {
    this.subscription = consumer.subscriptions.create("RepositoriesChannel", {
      languageId: this.props.language.id,

      connected() {},

      disconnected() {},

      received(data) {
        if (data.language.id == this.languageId) {
          this.update(data.language);
        }
      },

      update: this.updateRepositoryList.bind(this)
    });
  }
}

export default LanguageShow
