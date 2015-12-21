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
      console.log('Fetching new cache info for:', key);
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
    }).then(data => resolve(data));
  });
}

/* GET page list. */
router.get('/pages', function(req, res, next) {
  const options = {
    content_type: 'page',
    include: 0
  };
  getEntries(options).then(data => {
    res.json(data);
  });
});

/* GET single page. */
router.get('/page', function(req, res, next) {
  const options = {
    'content_type': 'page',
    'fields.slug': req.query.page_id
  };
  getEntries(options).then(data => {
    res.json(data[0]);
  });
});

export default router;
