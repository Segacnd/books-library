import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActionStatus, Review } from '../../interfases';

export type ICommentsState = {
  isCommentModalOpen: boolean;
  selectedBook: number | null;
  status: ActionStatus;
  commentId?: number;
};

const initialState: ICommentsState = {
  isCommentModalOpen: false,
  selectedBook: null,
  status: ActionStatus.init,
};

export const commentSlice = createSlice({
  name: 'commentSlice',
  initialState,
  reducers: {
    sendComment(state, action: PayloadAction<{ data: Review }>) {
      state.status = ActionStatus.loading;
    },
    modalToggler(
      state,
      action: PayloadAction<{
        isCommentModalOpen: boolean;
        selectedBook: number | null;
        commentId?: number;
      }>
    ) {
      const { isCommentModalOpen, selectedBook, commentId } = action.payload;

      state.isCommentModalOpen = isCommentModalOpen;
      state.selectedBook = selectedBook;
      state.commentId = commentId;
    },
    sendCommentFaild(state) {
      state.status = ActionStatus.error;
    },
    sendCommentSuccess(state) {
      state.status = ActionStatus.success;
    },
  },
});

export const { reducer: CommentReducer, actions: commentActions } = commentSlice;
