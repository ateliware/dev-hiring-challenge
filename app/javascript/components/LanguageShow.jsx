import React from "react"
import { Card } from "react-bootstrap";

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
          { this.state.repositories.map((repository) => {repository.name}) }
        </Card.Body>
      </Card>
    );
  }

  handleUpdate() {
    this.setState({
      movingButton: true
    });
  }
}

export default LanguageShow
