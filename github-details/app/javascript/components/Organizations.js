import React from "react";

const Organization = ({ organizations }) => {

  return (
    <>
      { organizations.map(({ name, slug }) => <p key={slug}>{name}</p>) }
    </>
  )
};

export default Organization
