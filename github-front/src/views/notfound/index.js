import React from 'react';
import {Link} from 'react-router-dom';
export default function NotFound(){
  return(
    <>
      <h1>Error 404</h1>
      <h2>Page not found</h2>
      <Link to="/" >Back to Repository List</Link>

    </>
  )
}