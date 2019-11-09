import React from 'react'

import './loading.css';

const Loading = (props) => {

  if(props.show === true) {
    return (
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    )
  } else {
    return <React.Fragment></React.Fragment>
  }
}

export default Loading;
