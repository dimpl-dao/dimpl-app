import {call, takeEvery} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEYS} from 'src/modules/storageKeys';
import {appActions, Wallet} from './appReducer';

async function setJwt(jwt: string) {
  await AsyncStorage.setItem(STORAGE_KEYS.jwt, jwt);
}
async function setWallet(wallet: Wallet) {
  await AsyncStorage.setItem(STORAGE_KEYS.wallet, wallet);
}
async function removeJwt() {
  await AsyncStorage.removeItem(STORAGE_KEYS.jwt);
}

function* loginSaga(action: {jwt: string; wallet: Wallet}) {
  yield call(setJwt, action.jwt);
  yield call(setWallet, action.wallet);
}

function* logoutSaga() {
  yield call(removeJwt);
}

export default function* watchAuth() {
  yield takeEvery(appActions.LOGIN as any, loginSaga);
  yield takeEvery(appActions.LOGOUT as any, logoutSaga);
}
