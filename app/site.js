import React from 'react';

class Site extends React.Component {
  render() {
    const { title, base, meta, link,   script } = this.props.head;
    const { asyncProps } = this.props;
    return (
      <html>
        <head>
          {title && title.toComponent()}
          {base && base.toComponent()}
          {meta && meta.toComponent()}
          {link && link.toComponent()}
          {script && script.toComponent()}
          <link rel='stylesheet' href='/static/index.css' />
        </head>
        <body>
          <div id='site' className='site' dangerouslySetInnerHTML={{ __html: this.props.app }} />
          <script dangerouslySetInnerHTML={{ __html: `window.__ASYNC_PROPS__ = ${JSON.stringify(JSON.stringify(asyncProps.propsArray))};` }} />
          <script src={process.env.NODE_ENV === 'development' ? 'http://localhost:8080/bundle.js' : '/static/bundle.js'} />
        </body>
      </html>
    );
  }
}

Site.propTypes = {
  app: React.PropTypes.string.isRequired,
  head: React.PropTypes.object,
};

Site.defaultProps = {
  head: {}
};

export default Site;