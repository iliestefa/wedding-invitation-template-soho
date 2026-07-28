import { useState } from 'react';

import useIntersectionObserver from '../../hooks/useIntersectionObserver';

import { useTemplateData } from '../../context/TemplateContext';

import SectionHeader from '../shared/SectionHeader/SectionHeader';
import Lightbox from './Lightbox/Lightbox';

import './Gallery.scss';

// Con 13 fotos la grilla cierra exacta en ambos tamaños:
// móvil (3 col): 11×1 + 1 foto 2×2 + 1 foto a fila completa = 18 celdas (6 filas)
// desktop (4 col): 11×1 + 1 foto 2×2 + esa misma como 1×1 = 16 celdas (4 filas)
const FEATURED_SQUARE_INDEX = 0;
const FEATURED_WIDE_INDEX = 7;

const Gallery = () => {
  const { galleryImages } = useTemplateData();
  const revealRef = useIntersectionObserver();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (imageId) =>
    setLightboxIndex(galleryImages.findIndex((image) => image.id === imageId));

  const galleryItems = galleryImages.map(({ id, src, alt }, imageIndex) => {
    const featuredClass =
      imageIndex === FEATURED_SQUARE_INDEX
        ? ' gallery__item--featured'
        : imageIndex === FEATURED_WIDE_INDEX
          ? ' gallery__item--wide'
          : '';

    return (
      <figure key={id} className={`gallery__item${featuredClass}`}>
        <button
          type="button"
          className="gallery__item-button"
          onClick={() => openLightbox(id)}
          aria-label={`Ver foto: ${alt}`}
        >
          <img className="gallery__image" src={src} alt={alt} loading="lazy" />
        </button>
      </figure>
    );
  });

  return (
    <section className="gallery" id="gallery">
      <div className="gallery__inner">
        <SectionHeader eyebrow="Galería" title="Momentos Juntos" />

        <div ref={revealRef} className="gallery__grid">
          {galleryItems}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
};

export default Gallery;
