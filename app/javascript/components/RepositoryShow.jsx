import React from "react";

import RepositoryIconValue from "./RepositoryIconValue";

import { Card } from "react-bootstrap";

import star24    from "@iconify-icons/octicon/star-24";
import gitFork24 from "@iconify-icons/octicon/git-fork-24";

/**
 * RepositoryShow component
 * 
 * Props: { repository, openModal }
 * 
 * Children: [ RepositoryIconValue ]
 * - RepositoryIconValue.props:
 *  - attributes: { icon, value }
 * 
 * Parents:
 *  - LanguageShow
 */
class RepositoryShow extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  render () {
    const repo = this.props.repository;

    return (
      <Card
        style={{ margin: "1px" }}
        className="repo-card"
        id={repo.name + "-card"}
        onClick={this.handleClick}>
        
        <Card.Body style={{ padding: "10px 20px" }}>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <th
                 colSpan="2"
                 style={{
                   overflow: "hidden",
                   whiteSpace: "nowrap",
                   textOverflow: "ellipsis",
                   maxWidth: "50px"
                 }}>
                   {repo.owner}/{repo.name}
                 </th>
              </tr>
              <tr>
                <td style={{ width: "112px" }}>
                  <RepositoryIconValue
                    icon={star24}
                    value={repo.stargazersCount} />
                </td>
                <td style={{ width: "112px" }}>
                  <RepositoryIconValue
                    icon={gitFork24}
                    value={repo.forksCount} />
                </td>
              </tr>
            </tbody>
          </table>
        </Card.Body>
      </Card>
    );
  }

  handleClick() {
    this.props.openModal(this.props.repository.id);
  }
}

export default RepositoryShow