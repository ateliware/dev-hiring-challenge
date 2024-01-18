import React, { useContext } from 'react';
import Context from '../../context/Context';
import '../../styles/Footer.css';

const Footer = () => {
  const { deleteRepos, setGitRepos } = useContext(Context);
  return (
    <footer>
      <button className='delete' onClick={deleteRepos}>Delete all repositories</button>
      <button className='search' onClick={setGitRepos}>Search top repositories</button>
    </footer>
  )
};

export default Footer;
