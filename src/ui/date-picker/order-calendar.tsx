import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import closeIcon from '../../assets/images/icons/close-action-active-icon.svg';
import { BookingRequest } from '../../interfases';
import { calendarSelector, currentUserSelector } from '../../redux/selectors';
import { calendarActions } from '../../redux/slices/calendar-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { DatePicker } from './picker/date-picker';

import styles from './date-picker-component.module.css';

export const OrderCalendar = () => {
  const { orderCalendarIsOpen, selectedBookId } = useAppSelector(calendarSelector);
  const { user } = useAppSelector(currentUserSelector);

  const [selectedDate, setSelectedDater] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const today = new Date();
  const currentMonth = today.getMonth() > 9 ? `${today.getMonth() + 1}` : `0${today.getMonth() + 1}`;

  const buttonHandler = () => {
    if (selectedBookId && user?.id) {
      const requestData: BookingRequest = {
        order: true,
        dateOrder: `${today.getFullYear()}-${currentMonth}-${selectedDate}T00:00:00.000Z`,
        book: selectedBookId.toString(),
        customer: user?.id.toString(),
      };

      dispatch(calendarActions.startFetchOrder({ data: requestData }));
    }
  };
  const handleSelectedCallback = (date: number | null) => {
    setSelectedDater(date);
  };

  const closeCalendar = () => {
    dispatch(calendarActions.orderCalendarToggler({ calendarIsOpen: false, selectedBookId: null }));
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && event.target instanceof HTMLElement && !menuRef.current.contains(event.target)) {
        dispatch(calendarActions.orderCalendarToggler({ calendarIsOpen: false, selectedBookId: null }));
      }
    }
    if (orderCalendarIsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef, dispatch, orderCalendarIsOpen]);

  if (!orderCalendarIsOpen) {
    return null;
  }

  return (
    <div
      className={orderCalendarIsOpen ? styles.pickerWrapper : styles.hide}
      aria-hidden='true'
      data-test-id={orderCalendarIsOpen && 'modal-outer'}
    >
      <div className={styles.pickerLayout} ref={menuRef} data-test-id='booking-modal'>
        <button
          type='button'
          className={styles.closeModalButton}
          onClick={closeCalendar}
          data-test-id={orderCalendarIsOpen && 'modal-close-button'}
        >
          <img src={closeIcon} alt='close modal' />
        </button>

        <h2 data-test-id={orderCalendarIsOpen && 'modal-title'}>
          Выбор даты <br /> бронирования
        </h2>

        <DatePicker handleSelectedCallback={handleSelectedCallback} />

        <div className={styles.button}>
          <button
            type='button'
            disabled={selectedDate === null ? true : false}
            onClick={buttonHandler}
            data-test-id={orderCalendarIsOpen && 'booking-button'}
            className={classNames([styles.orderButton], { [styles.disabledOrderButton]: selectedDate === null })}
          >
            забронировать
          </button>
        </div>
      </div>
    </div>
  );
};
