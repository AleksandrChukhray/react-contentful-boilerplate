import React from 'react';
import { Router, Route } from 'react-router'
import AsyncProps from 'async-props'

import App from './views/app';
import Home from './views/home';
import Page from './views/page';

import NoMatch from './components/no-match';

const routes = (
  <Router RoutingContext={AsyncProps} component={App}>
    <Route path="/" component={Home}/>
    <Route path=":page_id" component={Page}/>
    <Route path="*" component={NoMatch}/>
  </Router>
);

export default routes;