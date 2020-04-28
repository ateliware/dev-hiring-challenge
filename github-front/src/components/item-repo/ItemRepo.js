import React from 'react';
import { Link } from 'react-router-dom'

const ItemRepo = ({repo, rest}) => {
  const to = `/details/${repo.id}`;
  return(
    <>
      <tr {...rest}>
        <td>{repo.name}</td>
        <td>{repo.language}</td>
        <td> <Link to={to}>Details</Link> </td>
      </tr>
    </>
  )
}

export default ItemRepo;