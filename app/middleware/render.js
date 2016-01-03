import React from 'react';
import path from 'path';
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
          let statsPath = path.join(__dirname, "../../static/dist", "stats.json");
          let stats = JSON.parse(require("fs").readFileSync(statsPath, 'utf8'));
          let app = renderToString(<AsyncProps {...renderProps} {...asyncProps} />);
          let head = Helmet.rewind();
          let site = renderToStaticMarkup(
            <Site 
              head={head}
              app={app}
              asyncProps={asyncProps}
              assetHash={stats.hash} />
          );

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