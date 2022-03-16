import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import ReposList from './components/ReposList';

function App() {
  return (
    <Fragment>
      <div className="App">
        <ReposList />
      </div>
    </Fragment>
  );
}

export default App;
