import useIntersectionObserver from '../../hooks/useIntersectionObserver';

import { useTemplateData } from '../../context/TemplateContext';

import SectionHeader from '../shared/SectionHeader/SectionHeader';
import ScheduleRow from './ScheduleRow/ScheduleRow';

import './Schedule.scss';

const Schedule = () => {
  const { scheduleIntro, scheduleItems, weddingDateDisplay } = useTemplateData();
  const revealRef = useIntersectionObserver();

  const lastIndex = scheduleItems.length - 1;
  const scheduleRows = scheduleItems.map(({ id, time, label, icon }, index) => (
    <ScheduleRow key={id} time={time} label={label} icon={icon} isLast={index === lastIndex} />
  ));

  return (
    <section className="schedule" id="schedule">
      <div className="schedule__inner">
        <SectionHeader eyebrow="El día de la boda" title="Cronograma" />

        <aside className="schedule__aside">
          <p className="schedule__aside-quote">
            "{scheduleIntro}"
          </p>
          <span className="schedule__aside-rule" aria-hidden="true" />
          <span className="schedule__aside-date">{weddingDateDisplay}</span>
        </aside>

        <div ref={revealRef} className="schedule__list">
          {scheduleRows}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
