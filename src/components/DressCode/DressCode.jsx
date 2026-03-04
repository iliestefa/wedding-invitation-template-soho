import {
  DRESS_CODE_STYLE,
  DRESS_CODE_DESCRIPTION,
  DRESS_CODE_WOMEN,
  DRESS_CODE_MEN,
  DRESS_CODE_PALETTE,
  IMAGE_DRESS_CODE,
} from '../../constants';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

import SectionHeader from '../shared/SectionHeader/SectionHeader';
import ColorPaletteSwatches from './ColorPaletteSwatches/ColorPaletteSwatches';

import './DressCode.scss';

const DressCode = () => {
  const revealRef = useIntersectionObserver();

  return (
    <section className="dress-code" id="dresscode">
      <div className="dress-code__image-col" aria-hidden="true">
        <img
          src={IMAGE_DRESS_CODE}
          alt="Código de vestimenta"
          className="dress-code__image"
          loading="lazy"
        />
      </div>

      <div ref={revealRef} className="dress-code__content">
        <SectionHeader eyebrow="Código de Vestimenta" title={DRESS_CODE_STYLE} centered={false} />

        <p className="dress-code__description">{DRESS_CODE_DESCRIPTION}</p>

        <div className="dress-code__categories">
          <div className="dress-code__category">
            <span className="dress-code__category-label">Damas</span>
            <p className="dress-code__category-text">{DRESS_CODE_WOMEN}</p>
          </div>
          <div className="dress-code__category">
            <span className="dress-code__category-label">Caballeros</span>
            <p className="dress-code__category-text">{DRESS_CODE_MEN}</p>
          </div>
        </div>

        <ColorPaletteSwatches palette={DRESS_CODE_PALETTE} />
      </div>
    </section>
  );
};

export default DressCode;
