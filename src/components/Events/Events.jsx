import { useTemplateData } from '../../context/TemplateContext';

import SectionHeader from '../shared/SectionHeader/SectionHeader';
import EventCard from '../Ceremony/EventCard/EventCard';

import './Events.scss';

const Events = () => {
  const {
    eventsMode,
    ceremonyTime,
    ceremonyVenueName,
    ceremonyVenueAddress,
    ceremonyMapsLink,
    ceremonyMapsEmbedSrc,
    receptionTime,
    receptionVenueName,
    receptionVenueAddress,
    receptionMapsLink,
    receptionMapsEmbedSrc,
  } = useTemplateData();

  const mode = eventsMode ?? 'separate';

  return (
    <section className="events" id="ceremony">
      <div className="events__inner">
        <SectionHeader
          eyebrow="Nos acompañas"
          title={mode === 'reception-only' ? 'Recepción' : 'Ceremonia & Recepción'}
        />

        {mode === 'separate' && (
          <div className="events__grid">
            <div className="events__col">
              <EventCard
                eyebrow="Ceremonia Religiosa"
                venueName={ceremonyVenueName}
                time={ceremonyTime}
                address={ceremonyVenueAddress}
                mapsLink={ceremonyMapsLink}
                mapsEmbedSrc={ceremonyMapsEmbedSrc}
              />
            </div>

            <div className="events__divider" aria-hidden="true" />

            <div className="events__col">
              <EventCard
                eyebrow="Fiesta de Recepción"
                venueName={receptionVenueName}
                time={receptionTime}
                address={receptionVenueAddress}
                mapsLink={receptionMapsLink}
                mapsEmbedSrc={receptionMapsEmbedSrc}
              />
            </div>
          </div>
        )}

        {mode === 'same' && (
          <div className="events__single">
            <div className="events__times">
              <div className="events__time">
                <span className="events__time-value">{ceremonyTime}</span>
                <span className="events__time-label">Ceremonia</span>
              </div>
              <span className="events__times-divider" aria-hidden="true" />
              <div className="events__time">
                <span className="events__time-value">{receptionTime}</span>
                <span className="events__time-label">Recepción</span>
              </div>
            </div>

            <EventCard
              eyebrow="Ceremonia & Recepción"
              venueName={receptionVenueName}
              timeRows={[]}
              address={receptionVenueAddress}
              mapsLink={receptionMapsLink}
              mapsEmbedSrc={receptionMapsEmbedSrc}
            />
          </div>
        )}

        {mode === 'reception-only' && (
          <div className="events__single">
            <EventCard
              eyebrow="Fiesta de Recepción"
              venueName={receptionVenueName}
              time={receptionTime}
              address={receptionVenueAddress}
              mapsLink={receptionMapsLink}
              mapsEmbedSrc={receptionMapsEmbedSrc}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
