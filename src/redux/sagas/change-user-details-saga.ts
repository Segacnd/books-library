import { call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { defaultRequest } from '../../axios/instances ';
import { ActionStatus, ChangeDataForm, CurrentUser } from '../../interfases';
import { alertActions } from '../slices/alert-slice';
import { changeUserDetailsActions } from '../slices/change-user-detail-slice';
import { currentUserActions } from '../slices/current-user-slice';

async function changeUserDetailsApi(userDetails: ChangeDataForm, userId: number): Promise<CurrentUser> {
  return defaultRequest.put(`/users/${userId}`, userDetails).then((res) => res.data);
}

export function* changeUserDetailsSaga(action: PayloadAction<{ userDetails: ChangeDataForm; userId: number }>) {
  try {
    const { userDetails, userId } = action.payload;

    const updatedUser: CurrentUser = yield call(changeUserDetailsApi, userDetails, userId);

    yield put(changeUserDetailsActions.successUpdate());
    yield put(currentUserActions.getCurrentUser(updatedUser));

    yield put(alertActions.showAlert({ text: 'Изменения успешно сохранены!', status: ActionStatus.success }));
  } catch (error) {
    yield put(changeUserDetailsActions.failedUpdate());
    yield put(
      alertActions.showAlert({ text: 'Изменения не были сохранены. Попробуйте позже!', status: ActionStatus.error })
    );
  }
}
