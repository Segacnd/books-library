import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActionStatus } from '../../interfases';

export type ForgotPasswordState = {
  status: ActionStatus;
};

const initialState: ForgotPasswordState = {
  status: ActionStatus.init,
};

export const ForgotPasswordSlice = createSlice({
  name: 'forgotPasswordSlice',
  initialState,
  reducers: {
    startFetchingForgotPassword(state, action: PayloadAction<{ email: string }>) {
      state.status = ActionStatus.loading;
    },
    getForgotResponse(state, action: PayloadAction<{ status: ActionStatus }>) {
      state.status = action.payload.status;
    },
  },
});

export const { reducer: ForgotPasswordReducer, actions: forgotPasswordActions } = ForgotPasswordSlice;
