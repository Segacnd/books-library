import { call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { defaultRequest } from '../../axios/instances ';
import { ActionStatus, BookingRequest } from '../../interfases';
import { alertActions } from '../slices/alert-slice';
import { calendarActions } from '../slices/calendar-slice';

async function sendOrderAPI(data: BookingRequest): Promise<BookingRequest> {
  return defaultRequest.post('/bookings', { data }).then((res) => res.data);
}

export function* sendOrderSaga(action: PayloadAction<{ data: BookingRequest }>) {
  try {
    yield call(sendOrderAPI, action.payload.data);

    yield put(calendarActions.successOrderRequest());
    yield put(calendarActions.orderCalendarToggler({ calendarIsOpen: false, selectedBookId: null }));

    yield put(
      alertActions.showAlert({
        text: 'Книга забронирована. Подробности можно посмотреть на странице Профиль',
        status: ActionStatus.success,
      })
    );
  } catch (error) {
    yield put(calendarActions.failedOrderRequest());
    yield put(
      alertActions.showAlert({
        text: 'Что-то пошло не так, книга не забронирована. Попробуйте позже!',
        status: ActionStatus.error,
      })
    );
  }
}
