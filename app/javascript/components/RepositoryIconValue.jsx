import React from "react";

import { Icon, InlineIcon } from "@iconify/react";

/**
 * RepositoryIconValue component
 * 
 * Props: { icon, value }
 * 
 * Parents:
 *  - RepositoryModal
 *  - RepositoryShow
 */
class RepositoryIconValue extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="repo-stat-icon">
        <Icon icon={this.props.icon} width="14" height="14" /> {this.props.value}
      </div>
    );
  }
}

export default RepositoryIconValue