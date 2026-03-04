import { STORY_ITEMS, STORY_INTRO, COUPLE_NAMES } from '../../constants';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

import SectionHeader from '../shared/SectionHeader/SectionHeader';
import StoryTimelineItem from './StoryTimelineItem/StoryTimelineItem';

import './Story.scss';

const storyItemsWithAlign = STORY_ITEMS.map((item, index) => ({
  ...item,
  align: index % 2 === 0 ? 'left' : 'right',
}));

const Story = () => {
  const introRef = useIntersectionObserver();

  return (
    <section className="story" id="story">
      <div className="story__inner">
        <SectionHeader eyebrow="Nuestra Historia" title={COUPLE_NAMES} />

        <p ref={introRef} className="story__intro">
          {STORY_INTRO}
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
