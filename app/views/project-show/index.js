import React from 'react';
import Helmet from 'react-helmet';

import ApiClient from '../../middleware/api-client';

class ProjectShow extends React.Component {
  render() {
    const { project } = this.props;

    if (!project) {
      return null;
    }

    const { fields } = project;

    return (
      <div className={`project project--${fields.slug}`}>
        <Helmet
          title={`Project – ${fields.title}`}
          meta={[
            {'name': 'description', 'content': fields.description }
          ]} />

        <h1>{fields.title}</h1>
        {fields.description && <p>{fields.description}</p>}
      </div>
    );
  }
}

ProjectShow.loadProps = (params, cb) => {
  let api = new ApiClient();

  let request = { 
    project: api.getProject(params) 
  };

  api.resolve(request)
    .then(data => cb(null, data));
};


export default ProjectShow;