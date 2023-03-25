import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActionStatus, ResetPasswordRequest } from '../../interfases';

export type ResetPassword = {
  status: ActionStatus;
  resetData: ResetPasswordRequest | null;
};

const initialState: ResetPassword = {
  status: ActionStatus.init,
  resetData: null,
};

export const ResetPasswordSlice = createSlice({
  name: 'resetPasswordSlice',
  initialState,
  reducers: {
    startFetchingResetPassword(state, action: PayloadAction<{ resetRequest: ResetPasswordRequest }>) {
      state.status = ActionStatus.loading;
      state.resetData = action.payload.resetRequest;
    },
    getResetResponse(state, action: PayloadAction<{ status: ActionStatus }>) {
      state.status = action.payload.status;
    },
    resetData(state) {
      state.status = ActionStatus.init;
      state.resetData = null;
    },
  },
});

export const { reducer: ResetPasswordReducer, actions: resetPasswordActions } = ResetPasswordSlice;
