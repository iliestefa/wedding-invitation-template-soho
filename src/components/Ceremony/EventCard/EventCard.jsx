import PropTypes from 'prop-types';

import useIntersectionObserver from '../../../hooks/useIntersectionObserver';
import MapEmbed from '../../shared/MapEmbed/MapEmbed';

import './EventCard.scss';

const EventCard = ({ eyebrow, venueName, time, address, mapsLink, mapsEmbedSrc, timeRows }) => {
  const revealRef = useIntersectionObserver();
  const rows = timeRows ?? [{ label: 'Hora', value: time }];

  return (
    <div ref={revealRef} className="event-card">
      <div className="event-card__header">
        <span className="event-card__eyebrow">{eyebrow}</span>
        <h3 className="event-card__venue">{venueName}</h3>
        <span className="event-card__rule" aria-hidden="true" />
      </div>

      <dl className="event-card__details">
        {rows.map(({ label, value }) => (
          <div key={label} className="event-card__detail">
            <dt className="event-card__detail-label">{label}</dt>
            <dd className="event-card__detail-value">{value}</dd>
          </div>
        ))}
        <div className="event-card__detail">
          <dt className="event-card__detail-label">Dirección</dt>
          <dd className="event-card__detail-value">{address}</dd>
        </div>
      </dl>

      <MapEmbed src={mapsEmbedSrc} title={`Mapa de ${venueName}`} mapsLink={mapsLink} />
    </div>
  );
};

EventCard.propTypes = {
  eyebrow:      PropTypes.string.isRequired,
  venueName:    PropTypes.string.isRequired,
  time:         PropTypes.string,
  address:      PropTypes.string.isRequired,
  mapsLink:     PropTypes.string.isRequired,
  mapsEmbedSrc: PropTypes.string.isRequired,
  timeRows:     PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
  })),
};

EventCard.defaultProps = {
  time:     '',
  timeRows: null,
};

export default EventCard;
