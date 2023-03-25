import { call, put, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { defaultRequest } from '../../axios/instances ';
import { ActionStatus, RequestReview, Review } from '../../interfases';
import { commentSelector } from '../selectors';
import { alertActions } from '../slices/alert-slice';
import { commentActions } from '../slices/comments-slice';
import { currentUserActions } from '../slices/current-user-slice';
import { getSingleBookActions } from '../slices/get-single-book';

async function sendReviewAPI(data: RequestReview): Promise<RequestReview> {
  return defaultRequest.post('/comments', data).then((res) => res.data);
}

async function changeReviewAPI(data: RequestReview, commentId: number): Promise<RequestReview> {
  return defaultRequest.put(`/comments/${commentId}`, data).then((res) => res.data);
}

export function* sendReviewSaga(action: PayloadAction<{ data: Review }>) {
  try {
    const { commentId } = yield select(commentSelector);

    if (commentId) {
      yield call(changeReviewAPI, action.payload, commentId);
    } else {
      yield call(sendReviewAPI, action.payload);
    }

    yield put(commentActions.sendCommentSuccess());
    yield put(getSingleBookActions.startFetchingOneBook(Number(action.payload.data.book)));
    yield put(currentUserActions.startFetchingUser());
    yield put(commentActions.modalToggler({ isCommentModalOpen: false, selectedBook: null }));

    yield put(
      alertActions.showAlert({
        text: commentId ? 'Спасибо, что нашли время изменить оценку!' : 'Спасибо, что нашли время оценить книгу!',
        status: ActionStatus.success,
      })
    );
  } catch (error) {
    const { commentId } = yield select(commentSelector);

    yield put(commentActions.sendCommentFaild());
    yield put(commentActions.modalToggler({ isCommentModalOpen: false, selectedBook: null }));
    yield put(
      alertActions.showAlert({
        text: commentId
          ? 'Изменения не были сохранены. Попробуйте позже!'
          : 'Оценка не была отправлена. Попробуйте позже!',
        status: ActionStatus.error,
      })
    );
  }
}
