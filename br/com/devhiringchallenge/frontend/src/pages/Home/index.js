import React from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

import Header from '../../component/Header';

export default function Home() {

  const history = useHistory();

  async function handleList(e) {
    e.preventDefault();
    history.push('/list');
  };

  return (
    <div id="search-button-page h-full">
      <Header />
      <div id="search-container" className="flex justify-center pt-24">
        <div id="search" 
          className="bg-blue-500 text-white py-3 px-6 w-2/6 h-1/2 flex justify-center font-semibold rounded-2xl cursor-pointer" 
          onClick={handleList}>
            BUSCAR REPOSITÓRIOS FAVORITOS
        </div>
      </div>
      <div id="language-container" className="flex justify-center py-3.5">
        <div class="grid grid-cols-5 gap-4">
          <div className="text-xs bg-red-400 text-white px-1.5 py-1.5 flex justify-center font-semibold rounded-full">
            Ruby
          </div>          
          <div className="text-xs bg-blue-400 text-white px-1.5 py-1.5 flex justify-center font-semibold rounded-full">
            Go
          </div>
          <div className="text-xs bg-green-600 text-white px-1.5 py-1.5 flex justify-center font-semibold rounded-full">
            TypeScript
          </div>
          <div className="text-xs bg-yellow-500 text-white px-1.5 py-1.5 flex justify-center font-semibold rounded-full">
            C#
          </div>
          <div className="text-xs bg-indigo-600 text-white px-1.5 py-1.5 flex justify-center font-semibold rounded-full">
            Python
          </div>
        </div>
      </div>
    </div>
  );
}