import { call } from 'redux-saga/effects';
import Cookies from 'js-cookie';

async function removeToken() {
  Cookies.remove('jwt');
  Cookies.remove('userId');
}

export function* logoutSaga() {
  yield call(removeToken);
}
