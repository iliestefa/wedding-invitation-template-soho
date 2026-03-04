import PropTypes from 'prop-types';

import { useTemplateData } from '../../../context/TemplateContext';

import './HeroBackground.scss';

const HeroBackground = ({ parallaxStyle }) => {
  const { imageHero } = useTemplateData();

  return (
    <div className="hero-background" aria-hidden="true">
      <div
        className="hero-background__image"
        style={{
          backgroundImage: `url(${imageHero})`,
          ...parallaxStyle,
        }}
      />
      <div className="hero-background__overlay" />
    </div>
  );
};

HeroBackground.propTypes = {
  parallaxStyle: PropTypes.shape({
    transform: PropTypes.string,
  }).isRequired,
};

export default HeroBackground;
