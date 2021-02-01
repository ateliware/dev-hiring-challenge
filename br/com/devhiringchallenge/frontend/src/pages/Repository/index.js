import React, { Component }from 'react';

import api from '../../services/api';

class Repository extends Component {
  
  render() {
    console.log(this.props.match.params.id)
    return (
      <div>HELLOU</div>
    )
  }
};

export default Repository;