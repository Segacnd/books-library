import { takeEvery } from 'redux-saga/effects';

import { authSaga } from './sagas/auth-saga';
import { changeAvatarSaga } from './sagas/change-avatar-saga';
import { changeUserDetailsSaga } from './sagas/change-user-details-saga';
import { deleteOrderSaga } from './sagas/delete-order-saga';
import { forgotPasswordSaga } from './sagas/forgot-password-saga';
import { getAllBookSaga } from './sagas/get-all-book-saga';
import { getCategoriesSaga } from './sagas/get-categories-saga';
import { getCurrentUserSaga } from './sagas/get-current-user-data';
import { getOneBookSaga } from './sagas/get-single-book-saga';
import { logoutSaga } from './sagas/logout-saga';
import { sendOrderSaga } from './sagas/order-saga';
import { sendReOrderSaga } from './sagas/re-order-saga';
import { registrationSaga } from './sagas/registration-saga';
import { resetPasswordSaga } from './sagas/reset-password-saga';
import { sendReviewSaga } from './sagas/send-review-saga';
import { authActions } from './slices/authorization-slice';
import { calendarActions } from './slices/calendar-slice';
import { changeAvatarActions } from './slices/change-avatar-slice';
import { changeUserDetailsActions } from './slices/change-user-detail-slice';
import { commentActions } from './slices/comments-slice';
import { currentUserActions } from './slices/current-user-slice';
import { forgotPasswordActions } from './slices/forgot-pass-slice';
import { getAllBookActions } from './slices/get-all-books-slice';
import { getCategoriesActions } from './slices/get-categories-slice';
import { getSingleBookActions } from './slices/get-single-book';
import { registrationActions } from './slices/registration-slice';
import { resetPasswordActions } from './slices/reset-password-slice';

export function* rootSaga() {
  yield takeEvery(getAllBookActions.startFetchingAllBooks, getAllBookSaga);
  yield takeEvery(getSingleBookActions.startFetchingOneBook, getOneBookSaga);
  yield takeEvery(getCategoriesActions.startFetchingCategories, getCategoriesSaga);
  yield takeEvery(authActions.startFetchingAuth, authSaga);
  yield takeEvery(authActions.logout, logoutSaga);
  yield takeEvery(registrationActions.startFetchingRegistration, registrationSaga);
  yield takeEvery(forgotPasswordActions.startFetchingForgotPassword, forgotPasswordSaga);
  yield takeEvery(resetPasswordActions.startFetchingResetPassword, resetPasswordSaga);
  yield takeEvery(commentActions.sendComment, sendReviewSaga);
  yield takeEvery(calendarActions.startFetchOrder, sendOrderSaga);
  yield takeEvery(calendarActions.startReorderFetch, sendReOrderSaga);
  yield takeEvery(calendarActions.startDeleteOrderFetch, deleteOrderSaga);
  yield takeEvery(currentUserActions.startFetchingUser, getCurrentUserSaga);
  yield takeEvery(changeAvatarActions.startFetchingAvatar, changeAvatarSaga);
  yield takeEvery(changeUserDetailsActions.startUpdatingUserDetails, changeUserDetailsSaga);
}
