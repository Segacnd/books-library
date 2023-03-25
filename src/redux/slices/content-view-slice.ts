import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CardsViewType, SortOrder } from '../../interfases';

export type ContentViewState = {
  viewType: CardsViewType;
  menuState: boolean;
  burgerState: boolean;
  commentsState: boolean;
  errorIsOpen: boolean;
  sortType: SortOrder;
  accountModal: boolean;
  isCalendarOpen: boolean;
  isSendCommentOpen: boolean;
};

const initialState: ContentViewState = {
  viewType: CardsViewType.grid,
  // if true - menu is open
  menuState: true,
  burgerState: false,
  commentsState: true,
  errorIsOpen: true,
  sortType: SortOrder.desc,
  accountModal: false,
  isCalendarOpen: false,
  isSendCommentOpen: false,
};

export const viewSlice = createSlice({
  name: 'viewType',
  initialState,
  reducers: {
    calendarToggler: (state, action) => {
      state.isCalendarOpen = action.payload;
    },
    sendCommentToggler: (state, action) => {
      state.isSendCommentOpen = action.payload;
    },
    viewChanger: (state, action: PayloadAction<{ viewType: CardsViewType }>) => {
      state.viewType = action.payload.viewType;
    },
    sortChanger: (state, action: PayloadAction<{ sortType: SortOrder }>) => {
      state.sortType = action.payload.sortType;
    },
    menuToggle: (state, action: PayloadAction<boolean>) => {
      state.menuState = action.payload;
    },
    accountModalToggle: (state, action: PayloadAction<boolean>) => {
      state.accountModal = action.payload;
    },
    burgerToggle: (state, action: PayloadAction<boolean>) => {
      state.burgerState = action.payload;
    },
    commentToggle: (state, action: PayloadAction<boolean>) => {
      state.commentsState = action.payload;
    },
    errorStateChanger: (state, action: PayloadAction<boolean>) => {
      state.errorIsOpen = action.payload;
    },
  },
});

export const { reducer: ContentViewReducer, actions: viewTypeActions } = viewSlice;
