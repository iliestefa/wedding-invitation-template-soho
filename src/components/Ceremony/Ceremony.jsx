import {
  CEREMONY_TIME,
  CEREMONY_VENUE_NAME,
  CEREMONY_VENUE_ADDRESS,
  CEREMONY_MAPS_LINK,
  CEREMONY_MAPS_EMBED_SRC,
} from '../../constants';

import SectionHeader from '../shared/SectionHeader/SectionHeader';
import EventCard from './EventCard/EventCard';

import './Ceremony.scss';

const Ceremony = () => (
  <section className="ceremony" id="ceremony">
    <div className="ceremony__inner">
      <SectionHeader eyebrow="Nos casamos" title="La Ceremonia" />

      <EventCard
        eyebrow="Ceremonia Religiosa"
        venueName={CEREMONY_VENUE_NAME}
        time={CEREMONY_TIME}
        address={CEREMONY_VENUE_ADDRESS}
        mapsLink={CEREMONY_MAPS_LINK}
        mapsEmbedSrc={CEREMONY_MAPS_EMBED_SRC}
      />
    </div>
  </section>
);

export default Ceremony;
