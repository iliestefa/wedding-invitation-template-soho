import useParallax from '../../hooks/useParallax';

import { useTemplateData } from '../../context/TemplateContext';

import HeroBackground from './HeroBackground/HeroBackground';
import HeroScrollIndicator from './HeroScrollIndicator/HeroScrollIndicator';

import './Hero.scss';

const Hero = () => {
  const parallaxStyle = useParallax();
  const { coupleNames, weddingDateDisplay, ceremonyVenueName } = useTemplateData();

  return (
    <section className="hero" id="hero">
      <HeroBackground parallaxStyle={parallaxStyle} />

      <div className="hero__content">
        <p className="hero__eyebrow">Invitación de Boda</p>

        <h1 className="hero__names">{coupleNames}</h1>

        <span className="hero__rule" aria-hidden="true" />

        <p className="hero__date">{weddingDateDisplay}</p>

        <p className="hero__venue">{ceremonyVenueName}</p>

        <a href="#rsvp" className="hero__cta">
          Confirmar Asistencia
        </a>
      </div>

      <HeroScrollIndicator />
    </section>
  );
};

export default Hero;
