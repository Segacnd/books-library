import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActionStatus, CurrentUser } from '../../interfases';

export type CurrentUserState = {
  user: CurrentUser | null;
  status: ActionStatus;
};

const initialState: CurrentUserState = {
  user: null,
  status: ActionStatus.init,
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    startFetchingUser(state) {
      state.status = ActionStatus.loading;
    },

    getCurrentUser(state, action: PayloadAction<CurrentUser>) {
      state.user = action.payload;
    },

    successFetch(state) {
      state.status = ActionStatus.success;
    },

    failedFetch(state) {
      state.status = ActionStatus.error;
    },
  },
});

export const { reducer: CurrentUserReducer, actions: currentUserActions } = currentUserSlice;
