import { call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';

import { defaultRequest } from '../../axios/instances ';
import { AuthErrorResponse, AuthResponse, UserAuth } from '../../interfases';
import { authActions } from '../slices/authorization-slice';

async function saveToken(token: string, id: number) {
  Cookies.set('jwt', token);
  Cookies.set('userId', `${id}`);
}

async function sendAuthAPI(data: UserAuth): Promise<AuthResponse | AuthErrorResponse> {
  return defaultRequest.post('/auth/local', data).then((res) => res.data);
}

export function* authSaga(action: PayloadAction<{ authDetails: UserAuth }>) {
  try {
    const response: AuthResponse | AuthErrorResponse = yield call(sendAuthAPI, action.payload.authDetails);

    if ('user' in response) {
      yield put(authActions.getUserData({ user: response.user }));
      yield put(authActions.setUserId({ id: response.user.id }));
      yield call(saveToken, response.jwt, response.user.id);
    }
  } catch (error) {
    const axiosError = error as AxiosError;

    yield put(authActions.failedFetchingAuth({ errorStatusCode: axiosError.response?.status }));
  }
}
