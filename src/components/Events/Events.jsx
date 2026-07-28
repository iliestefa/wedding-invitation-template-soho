import { useTemplateData } from '../../context/TemplateContext';

import SectionHeader from '../shared/SectionHeader/SectionHeader';
import EventCard from '../Ceremony/EventCard/EventCard';

import './Events.scss';

const Events = () => {
  const {
    ceremonyTime,
    ceremonyVenueName,
    ceremonyVenueAddress,
    ceremonyMapsLink,
    receptionTime,
    receptionVenueName,
    receptionVenueAddress,
    receptionMapsLink,
  } = useTemplateData();

  return (
    <section className="events" id="ceremony">
      <div className="events__inner">
        <SectionHeader eyebrow="Nos acompañas" title="Ceremonia &amp; Recepción" />

        <div className="events__grid">
          <div className="events__col">
            <EventCard
              eyebrow="Ceremonia Religiosa"
              venueName={ceremonyVenueName}
              time={ceremonyTime}
              address={ceremonyVenueAddress}
              mapsLink={ceremonyMapsLink}
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
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
