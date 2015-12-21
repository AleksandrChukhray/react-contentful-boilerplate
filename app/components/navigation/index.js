import React from 'react';
import { Link } from 'react-router';

class Navigation extends React.Component {
  render() {
    const { pages } = this.props;

    return (
      <nav className='navigation'>
        <ul>
          <li><Link to='/'>Home</Link></li>
          {pages.map(page => (
            <li key={page.sys.id}>
              <Link to={`/${page.fields.slug}`}>{page.fields.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Navigation.propTypes = {
  pages: React.PropTypes.array
};

Navigation.defaultProps = {
  pages: []
};

export default Navigation;