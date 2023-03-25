import { call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { defaultRequest } from '../../axios/instances ';
import { ActionStatus, BookingRequest } from '../../interfases';
import { alertActions } from '../slices/alert-slice';
import { calendarActions } from '../slices/calendar-slice';

async function sendDeleteOrderAPI(bookingId: number): Promise<BookingRequest> {
  return defaultRequest.delete(`/bookings/${bookingId}`).then((res) => res.data);
}

export function* deleteOrderSaga(action: PayloadAction<{ bookingId: number }>) {
  try {
    yield call(sendDeleteOrderAPI, action.payload.bookingId);

    yield put(calendarActions.successOrderRequest());
    yield put(
      calendarActions.reorderCalendarToggler({ reorderCalendarIsOpen: false, selectedBookId: null, booking: null })
    );

    yield put(
      alertActions.showAlert({
        text: 'Бронирование книги успешно отменено!',
        status: ActionStatus.success,
      })
    );
  } catch (error) {
    yield put(calendarActions.failedOrderRequest());

    yield put(
      alertActions.showAlert({
        text: 'Не удалось снять бронирование книги. Попробуйте позже!',
        status: ActionStatus.error,
      })
    );
  }
}
