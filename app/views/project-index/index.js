import React from 'react';
import Helmet from 'react-helmet';

import ApiClient from '../../middleware/api-client';

class ProjectIndex extends React.Component {
  render() {
    const { projects } = this.props;

    return (
      <div className='project-index'>
        <Helmet
          title={'Projects'}
          meta={[
            {'name': 'description', 'content': 'All my projects' }
          ]} />

        <h1>Projects</h1>
      </div>
    );
  }
}

ProjectIndex.loadProps = (params, cb) => {
  let api = new ApiClient();

  let request = { 
    projects: api.getProjects()
  };

  api.resolve(request)
    .then(data => cb(null, data));
};

ProjectIndex.defaultProps = {
  projects: [],
};


export default ProjectIndex;