import { useEffect, useState } from 'react';

import useIntersectionObserver from '../../hooks/useIntersectionObserver';

import { useTemplateData } from '../../context/TemplateContext';

import SectionHeader from '../shared/SectionHeader/SectionHeader';
import Lightbox from './Lightbox/Lightbox';

import './Gallery.scss';

const COLUMN_COUNT_MOBILE = 3;
const COLUMN_COUNT_DESKTOP = 4;
const DESKTOP_QUERY = '(min-width: 1024px)';
// Cada mitad del loop necesita un mínimo de fotos para ser siempre más alta
// que el contenedor y que el loop (translateY -50%) nunca deje espacios
const TRACK_MIN_ITEMS_PER_HALF = 6;
// La duración escala con el contenido para que la velocidad no dependa
// del número de fotos; las columnas que bajan van un poco más lento
const SECONDS_PER_ITEM = 11;
const DOWN_SPEED_FACTOR = 1.15;

const getColumnCount = () =>
  window.matchMedia(DESKTOP_QUERY).matches ? COLUMN_COUNT_DESKTOP : COLUMN_COUNT_MOBILE;

const Gallery = () => {
  const { galleryImages } = useTemplateData();
  const revealRef = useIntersectionObserver();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [columnCount, setColumnCount] = useState(getColumnCount);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    const handleChange = () => setColumnCount(getColumnCount());

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const openLightbox = (imageId) =>
    setLightboxIndex(galleryImages.findIndex((image) => image.id === imageId));

  const columns = Array.from({ length: columnCount }, (_, columnIndex) =>
    galleryImages.filter((_, imageIndex) => imageIndex % columnCount === columnIndex)
  ).filter((columnImages) => columnImages.length > 0);

  const galleryColumns = columns.map((columnImages, columnIndex) => {
    const isDown = columnIndex % 2 === 1;
    const columnKey = columnImages[0]?.id ?? `column-${columnIndex}`;
    const repeats = Math.max(1, Math.ceil(TRACK_MIN_ITEMS_PER_HALF / columnImages.length));
    const halfImages = Array.from({ length: repeats }, () => columnImages).flat();
    const trackImages = [...halfImages, ...halfImages];
    const trackStyle = {
      animationDuration: `${Math.round(halfImages.length * SECONDS_PER_ITEM * (isDown ? DOWN_SPEED_FACTOR : 1))}s`,
    };

    return (
      <div
        key={columnKey}
        className={`gallery__column ${isDown ? 'gallery__column--down' : ''}`}
      >
        <div className="gallery__track" style={trackStyle}>
          {trackImages.map(({ id, src, alt }, imageIndex) => {
            const isOriginal = imageIndex < columnImages.length;

            return (
              <figure
                key={`${id}-${imageIndex}`}
                className="gallery__item"
                aria-hidden={!isOriginal || undefined}
              >
                <button
                  type="button"
                  className="gallery__item-button"
                  onClick={() => openLightbox(id)}
                  tabIndex={isOriginal ? 0 : -1}
                  aria-label={`Ver foto: ${alt}`}
                >
                  <img
                    className="gallery__image"
                    src={src}
                    alt={isOriginal ? alt : ''}
                    loading="lazy"
                  />
                </button>
              </figure>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <section
      className={`gallery ${lightboxIndex !== null ? 'gallery--paused' : ''}`}
      id="gallery"
    >
      <div className="gallery__inner">
        <SectionHeader eyebrow="Galería" title="Momentos Juntos" />

        <div ref={revealRef} className="gallery__grid">
          {galleryColumns}
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
