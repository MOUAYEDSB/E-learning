import React from 'react';
import CalendarDay from './day_calendar';

function CalendarDays() {
  const days = [
    { day: 'S', date: '10' },
    { day: 'M', date: '11' },
    { day: 'T', date: '12' },
    { day: 'W', date: '13' },
    { day: 'T', date: '14', isSelected: true },
    { day: 'F', date: '15' },
    { day: 'S', date: '16' }
  ];

  return (
    <div className="flex mt-8 w-full text-xs font-medium tracking-tight whitespace-nowrap">
      <div className="flex z-10 flex-auto gap-5 items-start my-auto mr-0">
        {days.map((day, index) => (
          <CalendarDay key={index} {...day} />
        ))}
      </div>
      <div className="flex shrink-0 w-10 rounded-3xl bg-indigo-950 h-[72px]" />
    </div>
  );
}

export default CalendarDays;
