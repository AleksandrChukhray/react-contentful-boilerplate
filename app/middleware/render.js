import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import AsyncProps, { loadPropsOnServer } from 'async-props'

import Helmet from 'react-helmet';

import Site from '../site';
import routes from '../routes';
import ApiClient from './api-client';

export default function (request, response) {
  let apiClient = ApiClient();

  match({ routes, location: request.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      response
        .status(500)
        .send(error.message);
    } else if (redirectLocation) {
      response
        .redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      loadPropsOnServer(renderProps, (err, asyncProps, scriptTag) => {
        try {
          let app = renderToString(<AsyncProps {...renderProps} {...asyncProps} />);
          let head = Helmet.rewind();
          let site = renderToStaticMarkup(<Site head={head} app={app} asyncProps={asyncProps} />);

          response
            .status(200)
            .send(`<!DOCTYPE html>${site}`);
        } catch(err) {
          let error = new Error(err);
          response
            .status(500)
            .send(error.message);
        }
      });
    } else {
      response
        .status(404)
        .send('Not found');
    }
  });

}