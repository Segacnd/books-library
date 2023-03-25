import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActionStatus, ChangeDataForm } from '../../interfases';

export type IChangeUserDetailsState = {
  status: ActionStatus;
};

const initialState: IChangeUserDetailsState = {
  status: ActionStatus.init,
};

export const changeUserDetailsSlice = createSlice({
  name: 'changeAvatar',
  initialState,
  reducers: {
    startUpdatingUserDetails(state, action: PayloadAction<{ userDetails: ChangeDataForm; userId: number }>) {
      state.status = ActionStatus.loading;
    },

    successUpdate(state) {
      state.status = ActionStatus.success;
    },

    failedUpdate(state) {
      state.status = ActionStatus.error;
    },
  },
});

export const { reducer: ChangeUserDetailsReducer, actions: changeUserDetailsActions } = changeUserDetailsSlice;
