import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActionStatus, AuthError, User, UserAuth } from '../../interfases';

export type AuthState = {
  user: User | null;
  error: AuthError | null;
  status: ActionStatus;
  authDetails: UserAuth | null;
  errorStatusCode?: number;
  userId: number | undefined;
};

const initialState: AuthState = {
  user: null,
  error: null,
  status: ActionStatus.init,
  authDetails: null,
  errorStatusCode: undefined,
  userId: undefined,
};

export const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    startFetchingAuth(state, action: PayloadAction<{ authDetails: UserAuth }>) {
      state.authDetails = action.payload.authDetails;
      state.status = ActionStatus.loading;
    },
    getUserData(state, action: PayloadAction<{ user: User }>) {
      state.user = action.payload.user;
      state.authDetails = null;
      state.status = ActionStatus.success;
    },
    setUserId(state, action: PayloadAction<{ id: number | undefined }>) {
      state.userId = action.payload.id;
    },
    deleteUserId(state) {
      state.userId = undefined;
    },
    logout(state) {
      state.user = null;
      state.userId = undefined;
      state.authDetails = null;
      state.status = ActionStatus.init;
    },
    failedFetchingAuth(state, action: PayloadAction<{ errorStatusCode?: number }>) {
      state.errorStatusCode = action.payload.errorStatusCode;
      state.status = ActionStatus.error;
    },
    resetError(state) {
      state.errorStatusCode = undefined;
      state.status = ActionStatus.init;
    },
  },
});

export const { reducer: AuthReducer, actions: authActions } = AuthSlice;
