import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import closeIcon from '../../assets/images/icons/close-action-active-icon.svg';
import { BookingRequest } from '../../interfases';
import { calendarSelector, currentUserSelector } from '../../redux/selectors';
import { calendarActions } from '../../redux/slices/calendar-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { DatePicker } from './picker/date-picker';

import styles from './date-picker-component.module.css';

export const ReorderCalendar = () => {
  const { reorderCalendarIsOpen, selectedBookId, booking } = useAppSelector(calendarSelector);
  const { user } = useAppSelector(currentUserSelector);
  const [selectedDate, setSelectedDater] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);
  const bookedDay = booking?.dateOrder ? new Date(booking?.dateOrder).getDate() : undefined;

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

      dispatch(calendarActions.startReorderFetch({ data: requestData }));
    }
  };

  const deleteButtonHandler = () => {
    if (booking) {
      dispatch(calendarActions.startDeleteOrderFetch({ bookingId: booking.id }));
    }
  };

  const handleSelectedCallback = (date: number | null) => {
    setSelectedDater(date);
  };

  const closeCalendar = () => {
    dispatch(
      calendarActions.reorderCalendarToggler({ reorderCalendarIsOpen: false, selectedBookId: null, booking: null })
    );
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && event.target instanceof HTMLElement && !menuRef.current.contains(event.target)) {
        dispatch(
          calendarActions.reorderCalendarToggler({
            reorderCalendarIsOpen: false,
            selectedBookId: null,
            booking: null,
          })
        );
      }
    }
    if (reorderCalendarIsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef, dispatch, reorderCalendarIsOpen]);

  if (!reorderCalendarIsOpen) {
    return null;
  }

  return (
    <div
      className={reorderCalendarIsOpen ? styles.pickerWrapper : styles.hide}
      data-test-id={reorderCalendarIsOpen && 'modal-outer'}
    >
      <div className={styles.pickerLayout} ref={menuRef} data-test-id='booking-modal'>
        <button
          type='button'
          onClick={closeCalendar}
          className={styles.closeModalButton}
          data-test-id={reorderCalendarIsOpen && 'modal-close-button'}
        >
          <img src={closeIcon} alt='close modal' />
        </button>

        <h2 data-test-id={reorderCalendarIsOpen && 'modal-title'}>
          Изменение даты <br /> бронирования
        </h2>

        <DatePicker handleSelectedCallback={handleSelectedCallback} defaultDate={bookedDay} />

        <div className={styles.buttonsWrapper}>
          <div className={styles.button}>
            <button
              type='button'
              disabled={selectedDate === null || bookedDay === selectedDate}
              className={classNames([styles.orderButton], {
                [styles.disabledOrderButton]: selectedDate === null || bookedDay === selectedDate,
              })}
              onClick={buttonHandler}
              data-test-id={reorderCalendarIsOpen && 'booking-button'}
            >
              забронировать
            </button>
          </div>
          <div className={styles.button}>
            <button
              onClick={deleteButtonHandler}
              type='button'
              className={styles.cancelOrder}
              data-test-id='booking-cancel-button'
            >
              отменить бронь
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
