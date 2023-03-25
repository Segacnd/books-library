import { call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { defaultRequest } from '../../axios/instances ';
import { ActionStatus } from '../../interfases';
import { alertActions } from '../slices/alert-slice';
import { changeAvatarActions } from '../slices/change-avatar-slice';
import { currentUserActions } from '../slices/current-user-slice';

async function uploadAvatarApi(file: File): Promise<{ id: number }> {
  const formData = new FormData();

  formData.append('files', file);

  return defaultRequest
    .post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => res.data);
}

async function changeAvatarApi(userId: number, fileId: number) {
  return defaultRequest.put(`/users/${userId}`, { avatar: fileId }).then((res) => res.data);
}

export function* changeAvatarSaga(action: PayloadAction<{ file: File; userId: number }>) {
  try {
    const res: [{ id: number }] = yield call(uploadAvatarApi, action.payload.file);

    yield call(changeAvatarApi, action.payload.userId, res[0].id);

    yield put(changeAvatarActions.successFetch());
    yield put(currentUserActions.startFetchingUser());

    yield put(alertActions.showAlert({ text: 'Фото успешно сохранено!', status: ActionStatus.success }));
  } catch (error) {
    yield put(changeAvatarActions.failedFetch());
    yield put(
      alertActions.showAlert({
        text: 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!',
        status: ActionStatus.error,
      })
    );
  }
}
