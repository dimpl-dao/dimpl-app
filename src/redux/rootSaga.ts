import {all} from 'redux-saga/effects';
import watchAuth from './appSaga';

export default function* rootSaga() {
  yield all([watchAuth()]);
}
