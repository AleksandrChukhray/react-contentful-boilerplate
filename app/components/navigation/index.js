import React from 'react';
import { Link } from 'react-router';

import ResponsiveImage from '../responsive-image';

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
              <span>Projects</span>
              <ul>
              {projects.map(project => 
                <li key={project.sys.id}>
                  <Link to={`/projects/${project.fields.slug}`}>
                    {project.fields.title}
                    {project.fields.teaserImage && 
                      <ResponsiveImage 
                        ratio='16x9'
                        renditions={[
                          {
                            options: { w: 1000 },
                            query: '(min-width: 600px)'
                          },
                          {
                            options: { w: 600 }
                          }
                        ]} 
                        image={project.fields.teaserImage} />}
                  </Link>
                </li>
              )}
              </ul>
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