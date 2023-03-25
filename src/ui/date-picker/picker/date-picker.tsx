import { useEffect, useState } from 'react';
import classNames from 'classnames';

import arrowDropdown from '../../../assets/images/icons/arrow_drop_down.svg';
import iconArrowDown from '../../../assets/images/icons/icon-arrow-down.svg';
import iconArrowUp from '../../../assets/images/icons/icon-arrow-up.svg';

import {
  dateFormat,
  dayNames,
  findRangeNextMonth,
  findRangePrevMonth,
  findYesterday,
  getSortedDays,
  monthes,
  onlyWeekend,
} from './data-for-picker';

import styles from './date-picker.module.css';

export interface IDatePickerProps {
  handleSelectedCallback: (date: number | null) => void;
  defaultDate?: number;
}

export const DatePicker = ({ handleSelectedCallback, defaultDate }: IDatePickerProps) => {
  const [showAllMonth, setShowAllMont] = useState(false);
  const [currentDay] = useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currenYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<number>(0);

  const today = new Date(currenYear, currentMonth, currentDay);

  const isToday = (day: number) => {
    const providedDate = dateFormat(new Date(currenYear, currentMonth, day));
    const todayDate = dateFormat(new Date());

    return providedDate === todayDate;
  };

  const hollyday = onlyWeekend(currenYear, currentMonth, currentDay);

  const yesterday = findYesterday(currenYear, currentMonth, currentDay);

  const nextDates = findRangeNextMonth(today.getFullYear(), today.getMonth(), 1);
  const prevDates = findRangePrevMonth(today.getFullYear(), today.getMonth(), 1);

  const nextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth((prev) => prev + 1);
    } else {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth((prev) => prev - 1);
    } else {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    }
  };

  const handleSelection = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLElement && event.target.id) {
      if (+event.target.id === currentDay || +event.target.id === yesterday) {
        setSelectedDate(+event.target.id);
        handleSelectedCallback(+event.target.id);
      } else {
        setSelectedDate(0);
        handleSelectedCallback(null);
      }
    }
  };

  const monthHandler = (i: number) => {
    setCurrentMonth(i);
    setShowAllMont(false);
  };

  useEffect(() => {
    if (defaultDate) {
      setSelectedDate(defaultDate);
    }
  }, [defaultDate]);

  return (
    <div className={styles.root} data-test-id='calendar'>
      <div className={styles.pickerHeader}>
        <button
          type='button'
          onClick={() => setShowAllMont((prev) => !prev)}
          className={styles.selectMonth}
          data-test-id='month-select'
        >
          <span>
            {monthes[currentMonth]} {currenYear}
          </span>
          <img src={arrowDropdown} alt='dropdown icon' />
        </button>

        {showAllMonth && (
          <div className={styles.monthList}>
            {monthes.map((el, i) => (
              <p
                className={el === monthes[currentMonth] && styles.activeMonth}
                onClick={() => monthHandler(i)}
                aria-hidden='true'
                key={el}
              >
                {el}
              </p>
            ))}
          </div>
        )}

        <div className={styles.monthChangerButtonWrapper}>
          <button
            className={styles.monthChangerButton}
            onClick={prevMonth}
            data-test-id='button-prev-month'
            type='button'
          >
            <img src={iconArrowUp} alt='previous month button' />
          </button>
          <button
            className={styles.monthChangerButton}
            onClick={nextMonth}
            data-test-id='button-next-month'
            type='button'
          >
            <img src={iconArrowDown} alt='next month button' />
          </button>
        </div>
      </div>
      <div className={styles.pickerBody}>
        <div className={styles.daysGrid}>
          {dayNames.map((day, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <p key={day + i} className={`${styles.days} ${styles.weekDays}`}>
              {day}
            </p>
          ))}
        </div>
        <div className={styles.daysGrid} aria-hidden='true' onClick={handleSelection}>
          {prevDates.map((el, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <p data-test-id='day-button' key={el + i + el} className={styles.days}>
              {el}
            </p>
          ))}

          {getSortedDays(today).map((day, i) => (
            <p
              data-test-id='day-button'
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              id={day}
              className={classNames([styles.days], {
                [styles.currentDay]: isToday(day),
                [styles.activeDay]:
                  (isToday(day) || yesterday === day) && selectedDate === day && !hollyday.includes(day),
                [styles.weekendDay]: hollyday.includes(day),
                [styles.yesterday]:
                  (isToday(yesterday - 1) || isToday(yesterday - 2) || isToday(yesterday - 3)) && yesterday === day,
              })}
            >
              {day}
            </p>
          ))}
          {nextDates.map((el) => (
            <p data-test-id='day-button' key={el} className={styles.days}>
              {el}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
