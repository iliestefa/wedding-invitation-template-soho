import { SCHEDULE_ITEMS, WEDDING_DATE_DISPLAY } from '../../constants';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

import SectionHeader from '../shared/SectionHeader/SectionHeader';
import ScheduleRow from './ScheduleRow/ScheduleRow';

import './Schedule.scss';

const Schedule = () => {
  const revealRef = useIntersectionObserver();

  const lastIndex = SCHEDULE_ITEMS.length - 1;
  const scheduleRows = SCHEDULE_ITEMS.map(({ id, time, label, icon }, index) => (
    <ScheduleRow key={id} time={time} label={label} icon={icon} isLast={index === lastIndex} />
  ));

  return (
    <section className="schedule" id="schedule">
      <div className="schedule__inner">
        <SectionHeader eyebrow="El día de la boda" title="Cronograma" />

        <aside className="schedule__aside">
          <p className="schedule__aside-quote">
            "Cada momento del día fue pensado con amor para compartirlo con ustedes."
          </p>
          <span className="schedule__aside-rule" aria-hidden="true" />
          <span className="schedule__aside-date">{WEDDING_DATE_DISPLAY}</span>
        </aside>

        <div ref={revealRef} className="schedule__list">
          {scheduleRows}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
