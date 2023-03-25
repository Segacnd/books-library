import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SearchInputState = {
  query: string;
};

const initialState: SearchInputState = {
  query: '',
};

export const SearchInputSlice = createSlice({
  name: 'searchInput',
  initialState,
  reducers: {
    inputValueCHanger: (state, action: PayloadAction<{ query: string }>) => {
      state.query = action.payload.query;
    },
  },
});

export const { reducer: SearchInputReducer, actions: searchInputActions } = SearchInputSlice;
