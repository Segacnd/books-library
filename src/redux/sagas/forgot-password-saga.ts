import { call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { defaultRequest } from '../../axios/instances ';
import { ActionStatus } from '../../interfases';
import { forgotPasswordActions } from '../slices/forgot-pass-slice';

async function sendForgotPasswordDataAPI(email: string): Promise<{ ok: boolean }> {
  return defaultRequest.post('/auth/forgot-password', { email }).then((res) => res.data);
}

export function* forgotPasswordSaga(action: PayloadAction<{ email: string }>) {
  try {
    yield call(sendForgotPasswordDataAPI, action.payload.email);

    yield put(forgotPasswordActions.getForgotResponse({ status: ActionStatus.success }));
  } catch (error) {
    yield put(forgotPasswordActions.getForgotResponse({ status: ActionStatus.error }));
  }
}
