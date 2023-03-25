import { ActionStatus } from '../interfases';

import { RootState } from './store';

export const oneBookSelector = (state: RootState) => state.oneBook;
export const viewerSelector = (state: RootState) => state.viewer;
export const categoriesSelector = (state: RootState) => state.categories;
export const getAllBookSelector = (state: RootState) => state.getAll;
export const searchInputSelector = (state: RootState) => state.searchInput;
export const AlertSelector = (state: RootState) => state.alert;
export const forgorPasswordSelector = (state: RootState) => state.forgotPassword;
export const registrationSelector = (state: RootState) => state.registration;
export const resetPasswordSelector = (state: RootState) => state.resetPassword;
export const authSelector = (state: RootState) => state.auth;
export const calendarSelector = (state: RootState) => state.calendarController;
export const commentSelector = (state: RootState) => state.commentController;
export const currentUserSelector = (state: RootState) => state.currentUser;
export const changeAvatarSelector = (state: RootState) => state.changeAvatar;
export const changeUserDetailsSelector = (state: RootState) => state.changeUserDetails;

export const isLoadingStatus = (state: RootState) =>
  [
    state.oneBook.status,
    state.categories.status,
    state.getAll.status,
    state.auth.status,
    state.registration.status,
    state.forgotPassword.status,
    state.resetPassword.status,
    state.commentController.status,
    state.calendarController.orderStatus,
    state.currentUser.status,
    state.changeAvatar.status,
    state.changeUserDetails.status,
  ].includes(ActionStatus.loading);
