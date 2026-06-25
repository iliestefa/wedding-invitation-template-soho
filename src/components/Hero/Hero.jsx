import useParallax from '../../hooks/useParallax';

import { useTemplateData } from '../../context/TemplateContext';

import HeroBackground from './HeroBackground/HeroBackground';
import './Hero.scss';

const Hero = () => {
  const parallaxStyle = useParallax();
  const { coupleNames, weddingDateDisplay } = useTemplateData();

  return (
    <section className="hero" id="hero">
      <HeroBackground parallaxStyle={parallaxStyle} />

      <div className="hero__content">
        <div className="hero__top">
          <p className="hero__eyebrow">Invitación de Boda</p>
          <h1 className="hero__names">{coupleNames}</h1>
          <span className="hero__rule" aria-hidden="true" />
          <p className="hero__date">{weddingDateDisplay}</p>
        </div>

        <div className="hero__bottom">
          <a href="#rsvp" className="hero__cta">
            Confirmar Asistencia
          </a>
        </div>
      </div>

    </section>
  );
};

export default Hero;
