import React from 'react';
import CalendarHeader from './header_calendar';
import CalendarDays from './days_calendar';

function CalendarComponent() {
  return (
    <section className="flex overflow-hidden flex-col px-5 pt-6 pb-3.5 text-center bg-white rounded-xl max-w-[372px] opacity-[var(--sds-size-stroke-border)]">
      <CalendarHeader />
      <CalendarDays />
    </section>
  );
}

export default CalendarComponent;
