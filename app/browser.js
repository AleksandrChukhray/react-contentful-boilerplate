import React from 'react';
import { render } from 'react-dom';
import Router from 'react-router';
import AsyncProps from 'async-props';

import routes from './routes';

import createBrowserHistory from 'history/lib/createBrowserHistory'

window.onload = () => {
  window.picturefill = require('picturefill');
  require('picturefill/dist/plugins/mutation/pf.mutation');

  let history = createBrowserHistory()
  render(<Router RoutingContext={AsyncProps} history={history}>{routes}</Router>, document.getElementById('site'));
}