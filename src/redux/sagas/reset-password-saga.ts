import { call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { defaultRequest } from '../../axios/instances ';
import { ActionStatus, AuthErrorResponse, AuthResponse, ResetPasswordRequest } from '../../interfases';
import { resetPasswordActions } from '../slices/reset-password-slice';

async function resetPasswordDataAPI(resetRequest: ResetPasswordRequest): Promise<AuthResponse | AuthErrorResponse> {
  return defaultRequest.post('/auth/reset-password', resetRequest).then((res) => res.data);
}

export function* resetPasswordSaga(action: PayloadAction<{ resetRequest: ResetPasswordRequest }>) {
  try {
    yield call(resetPasswordDataAPI, action.payload.resetRequest);

    yield put(resetPasswordActions.getResetResponse({ status: ActionStatus.success }));
  } catch (error) {
    yield put(resetPasswordActions.getResetResponse({ status: ActionStatus.error }));
  }
}
