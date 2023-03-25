import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActionStatus, Book } from '../../interfases';

export type GetOneBookState = {
  book: Book | null;
  status: ActionStatus;
};

const initialState: GetOneBookState = {
  book: null,

  status: ActionStatus.init,
};

export const GetSingleBookSlice = createSlice({
  name: 'singleBooks',
  initialState,
  reducers: {
    startFetchingOneBook: (state, action: PayloadAction<number>) => {
      state.status = ActionStatus.loading;
      state.book = null;
    },
    getOneBook: (state, action: PayloadAction<{ book: Book }>) => {
      state.book = action.payload.book;
      state.status = ActionStatus.success;
    },
    failedFetchingOneBook: (state) => {
      state.status = ActionStatus.error;
    },
  },
});

export const { reducer: GetSingleBookReducer, actions: getSingleBookActions } = GetSingleBookSlice;
