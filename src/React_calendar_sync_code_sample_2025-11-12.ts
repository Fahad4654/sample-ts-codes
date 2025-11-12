import React, { useState, useEffect } from 'react';

interface Event {
  start: Date;
  end: Date;
  title: string;
}

const useCalendarSync = (calendarId: string) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalendarEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate fetching events from a calendar API
        const fetchedEvents: Event[] = await new Promise((resolve) => {
          setTimeout(() => {
            const sampleEvents: Event[] = [
              { start: new Date(), end: new Date(Date.now() + 3600000), title: 'Meeting 1' },
              { start: new Date(Date.now() + 86400000), end: new Date(Date.now() + 86400000 + 1800000), title: 'Meeting 2' },
            ];
            resolve(sampleEvents);
          }, 500);
        });
        setEvents(fetchedEvents);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch calendar events.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalendarEvents();
  }, [calendarId]);

  return { events, isLoading, error };
};

const CalendarComponent: React.FC = () => {
  const { events, isLoading, error } = useCalendarSync('my-calendar-123');

  if (isLoading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Calendar Events</h1>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.title} - {event.start.toLocaleTimeString()} - {event.end.toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarComponent;