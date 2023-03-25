import { call, put, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { defaultRequest } from '../../axios/instances ';
import { ActionStatus, BookingRequest } from '../../interfases';
import { calendarSelector } from '../selectors';
import { alertActions } from '../slices/alert-slice';
import { calendarActions } from '../slices/calendar-slice';

async function sendReOrderAPI(data: BookingRequest, bookingId: number): Promise<BookingRequest> {
  return defaultRequest.put(`/bookings/${bookingId}`, { data }).then((res) => res.data);
}

export function* sendReOrderSaga(action: PayloadAction<{ data: BookingRequest }>) {
  try {
    const { booking } = yield select(calendarSelector);

    yield call(sendReOrderAPI, action.payload.data, booking.id);

    yield put(calendarActions.successOrderRequest());
    yield put(
      calendarActions.reorderCalendarToggler({ reorderCalendarIsOpen: false, selectedBookId: null, booking: null })
    );

    yield put(
      alertActions.showAlert({
        text: 'Изменения успешно сохранены!',
        status: ActionStatus.success,
      })
    );
  } catch (error) {
    yield put(calendarActions.failedOrderRequest());
    yield put(
      alertActions.showAlert({
        text: 'Изменения не были сохранены. Попробуйте позже!',
        status: ActionStatus.error,
      })
    );
  }
}
