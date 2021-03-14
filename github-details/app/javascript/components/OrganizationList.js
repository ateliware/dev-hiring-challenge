import React from "react";

import withLayout from "hocs/withLayout";
import OrganizationCard from "components/OrganizationCard";

const OrganizationList = ({ organizations }) => {

  return (
    <>
      {
        organizations.map((organization) => (
          <OrganizationCard key={organization.slug} {...organization} />
        ))
      }
    </>
  )
};

export default withLayout(OrganizationList);
