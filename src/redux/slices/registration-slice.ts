import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActionStatus, RegistrationData } from '../../interfases';

export type RegistrationState = {
  registrationData: RegistrationData | null;
  status: ActionStatus;
  errorStatusCode?: number;
};

const initialState: RegistrationState = {
  status: ActionStatus.init,
  registrationData: null,
  errorStatusCode: undefined,
};

export const RegistrationSlice = createSlice({
  name: 'registrationSlice',
  initialState,
  reducers: {
    startFetchingRegistration(state, action: PayloadAction<{ registrationDetails: RegistrationData }>) {
      state.registrationData = action.payload.registrationDetails;
      state.status = ActionStatus.loading;
    },
    getUserData(state) {
      state.registrationData = null;
      state.status = ActionStatus.success;
    },
    failedFetchingRegistration(state, action: PayloadAction<{ errorStatusCode?: number }>) {
      state.errorStatusCode = action.payload.errorStatusCode;
      state.status = ActionStatus.error;
    },
    resetData(state) {
      state.status = ActionStatus.init;
      state.registrationData = null;
      state.errorStatusCode = undefined;
    },
  },
});

export const { reducer: RegistrationReducer, actions: registrationActions } = RegistrationSlice;
