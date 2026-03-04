import {
  CEREMONY_TIME,
  CEREMONY_VENUE_NAME,
  CEREMONY_VENUE_ADDRESS,
  CEREMONY_MAPS_LINK,
  CEREMONY_MAPS_EMBED_SRC,
  RECEPTION_TIME,
  RECEPTION_VENUE_NAME,
  RECEPTION_VENUE_ADDRESS,
  RECEPTION_MAPS_LINK,
  RECEPTION_MAPS_EMBED_SRC,
} from '../../constants';

import SectionHeader from '../shared/SectionHeader/SectionHeader';
import EventCard from '../Ceremony/EventCard/EventCard';

import './Events.scss';

const Events = () => (
  <section className="events" id="ceremony">
    <div className="events__inner">
      <SectionHeader eyebrow="Nos acompañas" title="Ceremonia &amp; Recepción" />

      <div className="events__grid">
        <div className="events__col">
          <EventCard
            eyebrow="Ceremonia Religiosa"
            venueName={CEREMONY_VENUE_NAME}
            time={CEREMONY_TIME}
            address={CEREMONY_VENUE_ADDRESS}
            mapsLink={CEREMONY_MAPS_LINK}
            mapsEmbedSrc={CEREMONY_MAPS_EMBED_SRC}
          />
        </div>

        <div className="events__divider" aria-hidden="true" />

        <div className="events__col">
          <EventCard
            eyebrow="Fiesta de Recepción"
            venueName={RECEPTION_VENUE_NAME}
            time={RECEPTION_TIME}
            address={RECEPTION_VENUE_ADDRESS}
            mapsLink={RECEPTION_MAPS_LINK}
            mapsEmbedSrc={RECEPTION_MAPS_EMBED_SRC}
          />
        </div>
      </div>
    </div>
  </section>
);

export default Events;
