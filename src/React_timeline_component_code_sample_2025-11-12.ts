import React, { useState } from 'react';

interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="timeline">
      {items.map((item, index) => (
        <div key={index} className={`timeline-item ${activeIndex === index ? 'active' : ''}`} onClick={() => setActiveIndex(activeIndex === index ? null : index)}>
          <div className="timeline-item-date">{item.date}</div>
          <div className="timeline-item-content">
            <h3>{item.title}</h3>
            {activeIndex === index && <p>{item.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;

// Example usage:
const timelineItems: TimelineItem[] = [
  { date: '2023-01-01', title: 'Event 1', description: 'Description of event 1' },
  { date: '2023-02-15', title: 'Event 2', description: 'Description of event 2' },
  { date: '2023-03-10', title: 'Event 3', description: 'Description of event 3' },
];

const App = () => {
  return (
    <div>
      <Timeline items={timelineItems} />
    </div>
  );
};

export { App };