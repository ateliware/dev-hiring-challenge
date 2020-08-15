import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './views/Home';
import Repo from './views/Repo';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" exact={true} component={Home}/>
        <Route path="/repo" component={Repo}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
