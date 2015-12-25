import express from 'express';
import MemCached from '../services/memcached';
// can’t use import contentful from 'contentful' until
// https://github.com/contentful/contentful.js/issues/42 is resolved
const contentful = require('contentful');

const memcached = new MemCached();
const router = express.Router();

function getEntries(options) {
  return new Promise(resolve => {
    let key = memcached.keyFor(options);
    memcached.fetch(key, process.env.CACHE_TIME || 30, () => {
      let isPreview = process.env.PREVIEW && JSON.parse(process.env.PREVIEW);
      let clientOptions = {
        space: process.env.SPACE_ID,
        accessToken: isPreview
          ? process.env.PREVIEW_ACCESS_TOKEN
          : process.env.ACCESS_TOKEN,
        host: isPreview
          ? 'preview.contentful.com'
          : 'cdn.contentful.com'
      };
      const client = contentful.createClient(clientOptions);
      return client.entries(options).then(data => data);
    }).then(data => resolve(data))
      .catch(err => {
        let error = new Error(err);
        throw error;
      });
  });
}

/* GET page list. */
router.get('/pages', (req, res, next) => {
  const options = {
    'content_type': 'page',
    'include': 0
  };
  getEntries(options).then(data => {
    res.json(data);
  });
});

/* GET single page. */
router.get('/page', (req, res, next) => {
  const options = {
    'content_type': 'page',
    'fields.slug': req.query.page_id
  };
  getEntries(options).then(data => {
    res.json(data[0]);
  });
});

/* GET project list */
router.get('/projects', (req, res, next) => {
  const options = {
    'content_type': 'project',
    'include': 0
  };
  getEntries(options).then(data => {
    res.json(data);
  });
});

/* GET single project */
router.get('/project', (req, res, next) => {
  const options = {
    'content_type': 'project',
    'fields.slug': req.query.project_id
  };
  getEntries(options).then(data => {
    res.json(data[0]);
  });
});

export default router;
