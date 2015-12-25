import React from 'react';
import Helmet from 'react-helmet';

class Home extends React.Component {
  render() {
    return (
      <div className='home'>
        <Helmet
          title='Home'
          meta={[
            {'name': 'description', 'content': 'Home description' }
          ]} />
        
        <h1>Welcome home</h1>
        <picture>
          <source srcSet="http://placehold.it/1000x1000" media="(min-width: 1000px)" />
          <source srcSet="http://placehold.it/600x600" media="(min-width: 600px)" />
          <img srcSet="http://placehold.it/320x320" alt="320x320" />
        </picture>
      </div>
    );
  }
}

export default Home;