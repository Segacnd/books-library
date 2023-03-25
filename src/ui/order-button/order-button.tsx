import classNames from 'classnames';

import { NORMALIZE_DATE } from '../../constants';
import { Booking } from '../../interfases';
import { calendarActions } from '../../redux/slices/calendar-slice';
import { useAppDispatch } from '../../redux/store';

import styles from './orderButton.module.css';

export type ButtonProps = {
  booking?: Booking | null;
  delivery?: any;
  userId?: string;
  bookId: number;
};

export const OrderButton = ({ booking, delivery, userId, bookId }: ButtonProps) => {
  const dispatch = useAppDispatch();
  const convertedDate = new Date(Date.parse(delivery?.dateHandedTo.toString()));

  const buttonHandler = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (!booking && !delivery) {
      dispatch(calendarActions.orderCalendarToggler({ calendarIsOpen: true, selectedBookId: bookId }));
    }
    if (booking?.customerId === Number(userId)) {
      dispatch(
        calendarActions.reorderCalendarToggler({ reorderCalendarIsOpen: true, selectedBookId: bookId, booking })
      );
    }
  };

  const buttonTextFn = () => {
    let buttonText = 'забронировать';

    if (booking) {
      buttonText = 'забронирована';
    }

    if (delivery) {
      buttonText = `занята до ${NORMALIZE_DATE.format(convertedDate)}`;
    }

    return buttonText;
  };

  return (
    <button
      data-test-id='booking-button'
      type='button'
      disabled={(booking && booking?.customerId !== Number(userId)) || delivery ? true : false}
      onClick={buttonHandler}
      className={classNames([styles.button], {
        [styles.notMeOrder]: (booking && booking?.customerId !== Number(userId)) || delivery,
        [styles.isMeOrder]: booking && booking?.customerId === Number(userId),
      })}
    >
      {buttonTextFn()}
    </button>
  );
};
