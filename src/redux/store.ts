import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';

import { AlertReducer } from './slices/alert-slice';
import { AuthReducer } from './slices/authorization-slice';
import { CalendarReducer } from './slices/calendar-slice';
import { ChangeAvatarReducer } from './slices/change-avatar-slice';
import { ChangeUserDetailsReducer } from './slices/change-user-detail-slice';
import { CommentReducer } from './slices/comments-slice';
import { ContentViewReducer } from './slices/content-view-slice';
import { CurrentUserReducer } from './slices/current-user-slice';
import { ForgotPasswordReducer } from './slices/forgot-pass-slice';
import { GetAllBookReducer } from './slices/get-all-books-slice';
import { GetCategoriesReducer } from './slices/get-categories-slice';
import { GetSingleBookReducer } from './slices/get-single-book';
import { RegistrationReducer } from './slices/registration-slice';
import { ResetPasswordReducer } from './slices/reset-password-slice';
import { SearchInputReducer } from './slices/search-input-slice';
import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    currentUser: CurrentUserReducer,
    viewer: ContentViewReducer,
    getAll: GetAllBookReducer,
    oneBook: GetSingleBookReducer,
    categories: GetCategoriesReducer,
    searchInput: SearchInputReducer,
    alert: AlertReducer,
    auth: AuthReducer,
    registration: RegistrationReducer,
    forgotPassword: ForgotPasswordReducer,
    resetPassword: ResetPasswordReducer,
    calendarController: CalendarReducer,
    commentController: CommentReducer,
    changeAvatar: ChangeAvatarReducer,
    changeUserDetails: ChangeUserDetailsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

sagaMiddleware.run(rootSaga);
