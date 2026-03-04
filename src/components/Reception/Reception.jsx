import {
  RECEPTION_TIME,
  RECEPTION_VENUE_NAME,
  RECEPTION_VENUE_ADDRESS,
  RECEPTION_MAPS_LINK,
  RECEPTION_MAPS_EMBED_SRC,
} from '../../constants';

import SectionHeader from '../shared/SectionHeader/SectionHeader';
import EventCard from '../Ceremony/EventCard/EventCard';

import './Reception.scss';

const Reception = () => (
  <section className="reception" id="reception">
    <div className="reception__inner">
      <SectionHeader eyebrow="Festejemos juntos" title="La Recepción" />

      <EventCard
        eyebrow="Fiesta de Recepción"
        venueName={RECEPTION_VENUE_NAME}
        time={RECEPTION_TIME}
        address={RECEPTION_VENUE_ADDRESS}
        mapsLink={RECEPTION_MAPS_LINK}
        mapsEmbedSrc={RECEPTION_MAPS_EMBED_SRC}
      />
    </div>
  </section>
);

export default Reception;
