import PropTypes from 'prop-types';

import useIntersectionObserver from '../../../hooks/useIntersectionObserver';

import './EventCard.scss';

const EventCard = ({ eyebrow, venueName, time, address, mapsLink }) => {
  const revealRef = useIntersectionObserver();

  return (
    <div ref={revealRef} className="event-card">
      <div className="event-card__header">
        <span className="event-card__eyebrow">{eyebrow}</span>
        <h3 className="event-card__venue">{venueName}</h3>
        <span className="event-card__rule" aria-hidden="true" />
      </div>

      <dl className="event-card__details">
        <div className="event-card__detail">
          <dt className="event-card__detail-label">Hora</dt>
          <dd className="event-card__detail-value">{time}</dd>
        </div>
        <div className="event-card__detail">
          <dt className="event-card__detail-label">Dirección</dt>
          <dd className="event-card__detail-value">{address}</dd>
        </div>
      </dl>

      <a
        className="event-card__maps-button"
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver ubicación de ${venueName} en Google Maps`}
      >
        <svg
          className="event-card__maps-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        Ver ubicación
      </a>
    </div>
  );
};

EventCard.propTypes = {
  eyebrow:   PropTypes.string.isRequired,
  venueName: PropTypes.string.isRequired,
  time:      PropTypes.string.isRequired,
  address:   PropTypes.string.isRequired,
  mapsLink:  PropTypes.string.isRequired,
};

export default EventCard;
