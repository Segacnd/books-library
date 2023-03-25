import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActionStatus } from '../../interfases';

export type IChangeAvatarState = {
  file: File | null;
  status: ActionStatus;
};

const initialState: IChangeAvatarState = {
  file: null,
  status: ActionStatus.init,
};

export const changeAvatarSlice = createSlice({
  name: 'changeAvatar',
  initialState,
  reducers: {
    startFetchingAvatar(state, action: PayloadAction<{ file: File; userId: number }>) {
      state.status = ActionStatus.loading;
    },

    successFetch(state) {
      state.status = ActionStatus.success;
    },

    failedFetch(state) {
      state.status = ActionStatus.error;
    },
  },
});

export const { reducer: ChangeAvatarReducer, actions: changeAvatarActions } = changeAvatarSlice;
