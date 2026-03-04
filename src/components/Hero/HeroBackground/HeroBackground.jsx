import PropTypes from 'prop-types';

import { IMAGE_HERO } from '../../../constants';

import './HeroBackground.scss';

const HeroBackground = ({ parallaxStyle }) => (
  <div className="hero-background" aria-hidden="true">
    <div
      className="hero-background__image"
      style={{
        backgroundImage: `url(${IMAGE_HERO})`,
        ...parallaxStyle,
      }}
    />
    <div className="hero-background__overlay" />
  </div>
);

HeroBackground.propTypes = {
  parallaxStyle: PropTypes.shape({
    transform: PropTypes.string,
  }).isRequired,
};

export default HeroBackground;
