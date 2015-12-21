import React from 'react';
import Helmet from 'react-helmet';

import ApiClient from '../../middleware/api-client';

class Page extends React.Component {
  render() {
    const { page } = this.props;

    if (!page) {
      return null;
    }

    const { fields } = page;

    return (
      <div className={`page page--${fields.slug}`}>
        <Helmet
          title={fields.title}
          meta={[
            {'name': 'description', 'content': fields.intro }
          ]} />

        <h1>{fields.title}</h1>
        <p>{fields.intro}</p>
        {fields.details && <p>{fields.details}</p>}
      </div>
    );
  }
}

Page.loadProps = (params, cb) => {
  let api = new ApiClient();

  let request = { 
    page: api.getPage(params) 
  };

  api.resolve(request)
    .then(data => cb(null, data));
};


export default Page;