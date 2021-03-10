import React from "react";

import { Button, Modal } from "react-bootstrap";

import RepositoryIconValue from "./RepositoryIconValue";

import Icon from "@iconify/react";

import star24       from "@iconify-icons/octicon/star-24";
import gitFork24    from "@iconify-icons/octicon/git-fork-24";
import markGithub16 from "@iconify-icons/octicon/mark-github-16";

/**
 * RepositoryModal component
 * 
 * Props: { show, repository, handleClose }
 * 
 * Children: [ RepositoryIconValue ]
 * - RepositoryIconValue.props:
 *  - attributes: { icon, value }
 * 
 * Parents:
 *  - LanguageIndex
 */
class RepositoryModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const repo = this.props.repository;

    if (repo != null) {
      return (
        <Modal
          show={this.props.show}
          onHide={this.props.handleClose}
          centered>
          
          <Modal.Header closeButton>
            <Modal.Title>{repo.owner}/{repo.name}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <strong>About</strong>
            <p>{repo.description}</p>

            <br/>

            <RepositoryIconValue
              icon={star24}
              value={repo.stargazers_count} />
            
            <RepositoryIconValue
              icon={gitFork24}
              value={repo.forks_count} />

            <br/>

            <strong>Language:</strong> {repo.language}
            <br/>
            <strong>Open Issues:</strong> {repo.open_issues_count}

            <br/>
            <br/>

            <strong>Created on:</strong> {
              new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit"
              }).format(new Date(repo.create_date))
            }
            <br/>

            <strong>Last Update:</strong> {
              new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit"
              }).format(new Date(repo.update_date))
            }
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => window.open(repo.html_url, "_blank")}>
              <Icon icon={markGithub16}
                width="20"
                height="20" /> View on Github
            </Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return (
        <Modal show={false} />
      );
    }
  }
}

export default RepositoryModal
