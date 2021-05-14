import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PageWrapper from './PageWrapper';

import Main from '../pages/Main';
import RepoResults from '../pages/RepoResults';

function Routes() {
  return (
    <Switch>
      <Route path="/" component={(props) => <PageWrapper component={Main} {...props} />} exact />
      <Route path="/repo-results" component={(props) => <PageWrapper component={RepoResults} {...props} />} exact />
    </Switch>
  );
}

export default Routes;
