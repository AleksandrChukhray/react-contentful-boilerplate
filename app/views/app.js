import React from 'react';
import ApiClient from '../middleware/api-client';

import Navigation from '../components/navigation';
import Footer from '../components/footer';

class App extends React.Component {
  render() {
    const { pages, projects } = this.props;

    return (
      <div className='app'>
        <Navigation pages={pages} projects={projects} />
        <main className='main' role='main'>
          {this.props.children}
        </main>
        <Footer />
      </div>
    );
  }
}

App.loadProps = (params, cb) => {
  let api = new ApiClient();

  let request = { 
    pages: api.getPages(),
    projects: api.getProjects(),
  };

  api.resolve(request)
    .then(data => cb(null, data))
    .catch(err => {
      let error = new Error(err);
      throw error;
    });
};


export default App;