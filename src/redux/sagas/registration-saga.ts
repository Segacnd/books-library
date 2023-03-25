import { call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { defaultRequest } from '../../axios/instances ';
import { AuthErrorResponse, AuthResponse, RegistrationData } from '../../interfases';
import { registrationActions } from '../slices/registration-slice';

async function sendRegistrationDataAPI(data: RegistrationData): Promise<AuthResponse | AuthErrorResponse> {
  return defaultRequest.post('/auth/local/register', data).then((res) => res.data);
}

export function* registrationSaga(action: PayloadAction<{ registrationDetails: RegistrationData }>) {
  try {
    yield call(sendRegistrationDataAPI, action.payload.registrationDetails);

    yield put(registrationActions.getUserData());
  } catch (error) {
    const axiosError = error as AxiosError;

    yield put(registrationActions.failedFetchingRegistration({ errorStatusCode: axiosError.response?.status }));
  }
}
