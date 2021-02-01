import React from 'react';
import { useHistory } from 'react-router-dom';

import { FaGithub } from 'react-icons/fa'

import './styles.css';

export default function Header() {

  const history = useHistory();

  async function handleHome(e) {
    e.preventDefault();
    history.push('/');
  };

  return (
    <div id="header" className="header w-full h-16 mb-8 flex items-center px-8" >
      <div className="flex justify-center cursor-pointer" onClick={handleHome}>
        <FaGithub size="33" color="white"/>
        <span className="text-white text-lg font-semibold pl-4 pt-1">Dev hiring challenge</span>
      </div>
    </div>
  );
}