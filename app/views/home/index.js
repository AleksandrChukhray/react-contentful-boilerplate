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
      </div>
    );
  }
}

export default Home;