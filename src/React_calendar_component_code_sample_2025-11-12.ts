import React, { useState } from 'react';

interface CalendarProps {
  onSelectDate: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onSelectDate(selectedDate);
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days: JSX.Element[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(
      <div key={i} className="calendar-day" onClick={() => handleDateClick(i)}>
        {i}
      </div>
    );
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <span>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="calendar-days-header">
        {dayLabels.map((day) => (
          <div key={day} className="calendar-day-label">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-grid">{days}</div>
    </div>
  );
};

export default Calendar;