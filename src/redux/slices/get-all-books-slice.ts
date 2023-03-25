import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActionStatus, BookPreview } from '../../interfases';

export type GetAllBooksState = {
  books: BookPreview[] | [];
  status: ActionStatus;
};

const initialState: GetAllBooksState = {
  books: [],
  status: ActionStatus.init,
};

export const GetAllBookSlice = createSlice({
  name: 'allBooks',
  initialState,
  reducers: {
    startFetchingAllBooks: (state) => {
      state.status = ActionStatus.loading;
      state.books = [];
    },
    getAllBooks: (state, action: PayloadAction<{ books: BookPreview[] }>) => {
      state.books = action.payload.books;
      state.status = ActionStatus.success;
    },
    failedFetchingAllBooks: (state) => {
      state.status = ActionStatus.error;
    },
  },
});

export const { reducer: GetAllBookReducer, actions: getAllBookActions } = GetAllBookSlice;
