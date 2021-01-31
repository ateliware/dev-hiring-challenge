import React from 'react';

import { FaGithub } from 'react-icons/fa'

import './styles.css';

export default function Header() {

  return (
    <div id="header" className="header w-full h-16 mb-8 flex items-center px-8">
      <FaGithub size="33" color="white"/>
      <spam className="text-white text-lg font-semibold pl-4">Dev hiring challenge</spam>
    </div>
  );
}