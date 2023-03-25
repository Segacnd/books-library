import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActionStatus } from '../../interfases';

export type AlertSliceState = {
  isShow: boolean;
  text: string;
  alertStatus: ActionStatus;
};

const initialState: AlertSliceState = {
  isShow: false,
  text: '',
  alertStatus: ActionStatus.success,
};

export const alertSlice = createSlice({
  name: 'alertSlice',
  initialState,
  reducers: {
    showAlert(state, action: PayloadAction<{ text: string; status: ActionStatus }>) {
      state.isShow = true;
      state.alertStatus = action.payload.status;
      state.text = action.payload.text;
    },
    closeAlert(state) {
      state.isShow = false;
    },
  },
});

export const { reducer: AlertReducer, actions: alertActions } = alertSlice;
