import { call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { defaultRequest } from '../../axios/instances ';
import { ActionStatus, Book } from '../../interfases';
import { alertActions } from '../slices/alert-slice';
import { getSingleBookActions } from '../slices/get-single-book';

async function getOneBookApi(id: number): Promise<Book> {
  return defaultRequest.get(`/books/${id}`).then((res) => res.data);
}

export function* getOneBookSaga(action: PayloadAction<number>) {
  try {
    const res: Book = yield call(() => getOneBookApi(action.payload));

    yield put(getSingleBookActions.getOneBook({ book: res }));
  } catch (error) {
    yield put(getSingleBookActions.failedFetchingOneBook());
    yield put(
      alertActions.showAlert({
        text: 'Что-то пошло не так. Обновите страницу через некоторое время.',
        status: ActionStatus.error,
      })
    );
  }
}
