import  { useState } from 'react';
import { assets } from '../../../assets/assets';
import './Calendar.css'; // Import the CSS file

// Helper function to get the number of days in a month
const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper function to get the first day of the month (0 = Sunday, 6 = Saturday)
const getFirstDayOfMonth = (month, year) => {
  return new Date(year, month, 1).getDay();
};

// Helper function to generate the dates for the current week
const generateWeekDates = (currentMonth, currentYear, currentWeek) => {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const totalDays = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);

  // Calculate the first date of the current week
  const weekStartDate = currentWeek * 7 - firstDayOfMonth + 1;
  const dates = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = weekStartDate + i;

    if (currentDate > 0 && currentDate <= totalDays) {
      dates.push({ day: daysOfWeek[i], date: currentDate });
    } else {
      dates.push({ day: daysOfWeek[i], date: null }); // Empty slots for days outside the current month
    }
  }

  return dates;
};

// Main Calendar Component
const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [currentWeek, setCurrentWeek] = useState(Math.floor((today.getDate() - 1) / 7));

  const handlePreviousWeek = () => {
    if (currentWeek === 0) {
      const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const totalDaysInPreviousMonth = getDaysInMonth(previousMonth, previousYear);
      const lastWeekOfPreviousMonth = Math.floor((totalDaysInPreviousMonth - 1) / 7);
      setCurrentMonth(previousMonth);
      setCurrentYear(previousYear);
      setCurrentWeek(lastWeekOfPreviousMonth);
    } else {
      setCurrentWeek(currentWeek - 1);
    }
  };

  const handleNextWeek = () => {
    const totalDays = getDaysInMonth(currentMonth, currentYear);
    const totalWeeks = Math.ceil(totalDays / 7);
    if (currentWeek === totalWeeks - 1) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      setCurrentMonth(nextMonth);
      setCurrentYear(nextYear);
      setCurrentWeek(0);
    } else {
      setCurrentWeek(currentWeek + 1);
    }
  };

  const handleDateSelect = (date) => {
    if (date) setSelectedDate(date);
  };

  const dates = generateWeekDates(currentMonth, currentYear, currentWeek);
  const monthYearDisplay = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <img src={assets.arrowleft} alt="Previous" onClick={handlePreviousWeek} className="calendar-arrow" />
        <div className="calendar-month">{monthYearDisplay}</div>
        <img src={assets.arrowright} alt="Next" onClick={handleNextWeek} className="calendar-arrow" />
      </div>
      <div className="calendar-week">
        {dates.map(({ day, date }) => (
          <div key={day + (date || '')} className="calendar-day" onClick={() => handleDateSelect(date)}>
            <div className="calendar-day-label">{day}</div>
            <div className={`calendar-date ${date === selectedDate ? 'selected' : ''}`}>
              {date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;