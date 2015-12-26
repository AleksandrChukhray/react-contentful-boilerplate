import React from 'react';
import ApiClient from '../../middleware/api-client';

class ResponsiveImage extends React.Component {
  constructor(props) {
    super(props);

    let ratios = this.props.ratio && this.props.ratio.split('x');
    this.state = {
      ratio: ratios ? ratios[1] / ratios[0] : null
    };
  }

  createRendition(rendition) {
    const { image } = this.props;
    const { ratio } = this.state;
    const { options } = rendition;

    const { fields } = this.state.asyncData && this.state.asyncData.image
      ? this.state.asyncData.image
      : image;

    const variables = {
      ...options,
      'h': ratio && options.w ? Math.round(ratio / options.w) : null,
      'fit': ratio ? 'thumb' : options.fit
    };

    const urlParams = Object.keys(variables)
      .map(key => variables[key] ? `${key}=${variables[key]}` : false)
      .filter(i => !!i).join('&');

    return `${fields.file.url}?${urlParams}`;
  }

  componentDidMount() {
    const { image } = this.props;

    if (!image.fields) {
      const api = new ApiClient();

      api.resolve({ image: api.getAsset(image.sys) })
        .then(asyncData => this.setState({ asyncData }));
    }
  }

  render() {
    const { image, renditions, className } = this.props;
    const { ratio } = this.state;
    const { fields } = this.state.asyncData && this.state.asyncData.image
      ? this.state.asyncData.image
      : image;

    const initialRendition = renditions.pop();

    if (!fields) {
      return null;
    }

    return (
      <picture className={className}>
        {renditions.length > 0 && renditions.map((rendition, index) => 
          <source 
            srcSet={this.createRendition(rendition)} 
            media={rendition.query}
            key={`${image.sys.id}--${index}`}/>
        )}
        {initialRendition && <img srcSet={this.createRendition(initialRendition)} />}
      </picture>
    );
  }
}

ResponsiveImage.propsTypes = {
  ratio: React.PropTypes.string,
  renditions: React.PropTypes.array,
  image: React.PropTypes.object,
  className: React.PropTypes.string,
};

ResponsiveImage.defaultProps = {
  className: ''
};

export default ResponsiveImage;