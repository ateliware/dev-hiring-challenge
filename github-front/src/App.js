import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './views/home/';
import Detail from './views/detail';
import NotFound from './views/notfound';

function App() {
  return (
    <>
      <Router>
        <Container>
          <Switch>
            <Route exact path={['/', '/index.html']}>
              <Home />
            </Route>
            <Route exact path='/details/:id'>
              <Detail />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
