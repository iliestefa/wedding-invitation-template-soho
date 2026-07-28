import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './Lightbox.scss';

const SWIPE_THRESHOLD_PX = 50;
const WHEEL_COOLDOWN_MS = 350;
const WHEEL_MIN_DELTA = 8;

const Lightbox = ({ images, startIndex, onClose }) => {
  const [index, setIndex] = useState(startIndex);
  // 1 = avanza (entra desde la derecha) | -1 = retrocede (desde la izquierda)
  const [direction, setDirection] = useState(0);
  const lastWheelTime = useRef(0);
  const touchStart = useRef(null);

  const count = images.length;
  const current = images[index];

  const goTo = (step) => {
    setDirection(step);
    setIndex((prev) => (prev + step + count) % count);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        setDirection(1);
        setIndex((prev) => (prev + 1) % count);
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + count) % count);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, count]);

  const handleWheel = (event) => {
    const now = Date.now();
    const tooSoon = now - lastWheelTime.current < WHEEL_COOLDOWN_MS;
    if (tooSoon || Math.abs(event.deltaY) < WHEEL_MIN_DELTA) return;

    lastWheelTime.current = now;
    goTo(event.deltaY > 0 ? 1 : -1);
  };

  const handleTouchStart = (event) => {
    touchStart.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  };

  const handleTouchEnd = (event) => {
    if (!touchStart.current) return;

    const deltaX = event.changedTouches[0].clientX - touchStart.current.x;
    const deltaY = event.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;

    const mainDelta = Math.abs(deltaY) >= Math.abs(deltaX) ? deltaY : deltaX;
    if (Math.abs(mainDelta) < SWIPE_THRESHOLD_PX) return;

    goTo(mainDelta < 0 ? 1 : -1);
  };

  const stopClick = (event) => event.stopPropagation();

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      onClick={onClose}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        type="button"
        className="lightbox__close"
        onClick={onClose}
        aria-label="Cerrar foto"
      >
        ×
      </button>

      <button
        type="button"
        className="lightbox__nav lightbox__nav--prev"
        onClick={(event) => {
          stopClick(event);
          goTo(-1);
        }}
        aria-label="Foto anterior"
      >
        ‹
      </button>

      <img
        key={current.id}
        className={`lightbox__image ${
          direction === 1
            ? 'lightbox__image--from-right'
            : direction === -1
              ? 'lightbox__image--from-left'
              : ''
        }`}
        src={current.src}
        alt={current.alt}
        onClick={stopClick}
      />

      <button
        type="button"
        className="lightbox__nav lightbox__nav--next"
        onClick={(event) => {
          stopClick(event);
          goTo(1);
        }}
        aria-label="Foto siguiente"
      >
        ›
      </button>

      <span className="lightbox__counter">
        {index + 1} / {count}
      </span>
    </div>
  );
};

Lightbox.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id:  PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
  startIndex: PropTypes.number.isRequired,
  onClose:    PropTypes.func.isRequired,
};

export default Lightbox;
