import React from 'react';
import { Link } from 'react-router';

class Navigation extends React.Component {
  render() {
    const { pages, projects } = this.props;

    return (
      <nav className='navigation'>
        <ul>
          <li><Link to='/'>Home</Link></li>
          {pages.map(page => (
            <li key={page.sys.id}>
              <Link to={`/${page.fields.slug}`}>{page.fields.title}</Link>
            </li>
          ))}
          {projects.length &&
            <li>
              <Link to='/projects'>Projects</Link>
              {projects.map(project => 
                <Link 
                  to={`/projects/${project.fields.slug}`}
                  key={project.sys.id}>
                  {project.fields.title}
                </Link>
              )}
            </li>
          }
        </ul>
      </nav>
    );
  }
}

Navigation.propTypes = {
  pages: React.PropTypes.array,
  projects: React.PropTypes.array,
};

Navigation.defaultProps = {
  pages: [],
  projects: [],
};

export default Navigation;