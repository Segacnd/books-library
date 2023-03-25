import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActionStatus, Booking, BookingRequest } from '../../interfases';

export type ICalendarState = {
  orderCalendarIsOpen: boolean;
  reorderCalendarIsOpen: boolean;
  selectedBookId: number | null;
  booking?: Booking | null;
  orderStatus: ActionStatus;
};

const initialState: ICalendarState = {
  orderCalendarIsOpen: false,
  reorderCalendarIsOpen: false,
  selectedBookId: null,
  booking: null,
  orderStatus: ActionStatus.init,
};

export const calendarSlice = createSlice({
  name: 'calendarSlice',
  initialState,
  reducers: {
    orderCalendarToggler(state, action: PayloadAction<{ calendarIsOpen: boolean; selectedBookId: number | null }>) {
      state.orderCalendarIsOpen = action.payload.calendarIsOpen;
      state.selectedBookId = action.payload.selectedBookId;
    },
    reorderCalendarToggler(
      state,
      action: PayloadAction<{ reorderCalendarIsOpen: boolean; selectedBookId: number | null; booking: Booking | null }>
    ) {
      state.reorderCalendarIsOpen = action.payload.reorderCalendarIsOpen;
      state.selectedBookId = action.payload.selectedBookId;
      state.booking = action.payload.booking;
    },
    startFetchOrder(state, action: PayloadAction<{ data: BookingRequest }>) {
      state.orderStatus = ActionStatus.loading;
    },
    startReorderFetch(state, action: PayloadAction<{ data: BookingRequest }>) {
      state.orderStatus = ActionStatus.loading;
    },
    startDeleteOrderFetch(state, action: PayloadAction<{ bookingId: number }>) {
      state.orderStatus = ActionStatus.loading;
    },
    successOrderRequest(state) {
      state.reorderCalendarIsOpen = false;
      state.orderCalendarIsOpen = false;
      state.orderStatus = ActionStatus.success;
    },
    failedOrderRequest(state) {
      state.orderStatus = ActionStatus.error;
      state.reorderCalendarIsOpen = false;
      state.orderCalendarIsOpen = false;
    },
    resetStatus(state) {
      state.orderStatus = ActionStatus.init;
    },
  },
});

export const { reducer: CalendarReducer, actions: calendarActions } = calendarSlice;
