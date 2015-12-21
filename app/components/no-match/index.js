import React from 'react';

class NoMatch extends React.Component {
  render() {
    return <div>Page not found</div>;
  }
}

NoMatch.status = 404;

export default NoMatch;