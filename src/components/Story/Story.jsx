import useIntersectionObserver from '../../hooks/useIntersectionObserver';

import { useTemplateData } from '../../context/TemplateContext';

import SectionHeader from '../shared/SectionHeader/SectionHeader';
import StoryTimelineItem from './StoryTimelineItem/StoryTimelineItem';

import './Story.scss';

const Story = () => {
  const { storyItems, storyIntro, coupleNames } = useTemplateData();
  const introRef = useIntersectionObserver();

  const storyItemsWithAlign = storyItems.map((item, index) => ({
    ...item,
    align: index % 2 === 0 ? 'left' : 'right',
  }));

  return (
    <section className="story" id="story">
      <div className="story__inner">
        <SectionHeader eyebrow="Nuestra Historia" title={coupleNames} />

        <p ref={introRef} className="story__intro">
          {storyIntro}
        </p>

        <div className="story__timeline">
          {storyItemsWithAlign.map(({ id, year, label, text, align }) => (
            <StoryTimelineItem
              key={id}
              year={year}
              label={label}
              text={text}
              align={align}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Story;
