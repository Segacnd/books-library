import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActionStatus, Category } from '../../interfases';

export type GetCategoriesState = {
  categories: Category[] | [];
  status: ActionStatus;
};

const initialState: GetCategoriesState = {
  categories: [],

  status: ActionStatus.init,
};

export const GetCategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    startFetchingCategories: (state) => {
      state.status = ActionStatus.loading;
    },
    getCategories: (state, action: PayloadAction<{ categories: Category[] }>) => {
      state.categories = action.payload.categories;
      state.status = ActionStatus.success;
    },
    failedFetchingCategories: (state) => {
      state.status = ActionStatus.error;
    },
  },
});

export const { reducer: GetCategoriesReducer, actions: getCategoriesActions } = GetCategoriesSlice;
