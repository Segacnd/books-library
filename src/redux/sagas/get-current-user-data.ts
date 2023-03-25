import { call, put } from 'redux-saga/effects';

import { defaultRequest } from '../../axios/instances ';
import { ActionStatus, CurrentUser } from '../../interfases';
import { alertActions } from '../slices/alert-slice';
import { currentUserActions } from '../slices/current-user-slice';

async function getCurrentUserApi(): Promise<CurrentUser> {
  return defaultRequest.get('/users/me').then((res) => res.data);
}

export function* getCurrentUserSaga() {
  try {
    const res: CurrentUser = yield call(getCurrentUserApi);

    yield put(currentUserActions.getCurrentUser(res));
    yield put(currentUserActions.successFetch());
  } catch (error) {
    yield put(currentUserActions.failedFetch());
    yield put(
      alertActions.showAlert({
        text: 'Что-то пошло не так. Обновите страницу через некоторое время.',
        status: ActionStatus.error,
      })
    );
  }
}
