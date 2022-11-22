import AsyncStorage from '@react-native-async-storage/async-storage';
import {JWT} from 'src/modules/apis';

export type ApiMethod = 'get' | 'post' | 'delete' | 'put' | 'patch';
export type ApiMethodWithToken =
  | 'getWithToken'
  | 'postWithToken'
  | 'deleteWithToken'
  | 'putWithToken'
  | 'patchWithToken';

export type PromiseFnProps = {
  url: string;
  method: ApiMethod;
  body?: object;
  token?: string;
  headers?: object;
};
export type PromiseFnRes = any;
export const promiseFn = async ({url, body, token, method}: PromiseFnProps) => {
  const res = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && {Authorization: 'Bearer ' + token}),
    },
    ...(body && {body: JSON.stringify(body)}),
  });
  const json = await res.json();
  return json;
};
export const promiseFnPure = async ({
  url,
  body,
  method,
  headers,
}: PromiseFnProps) => {
  const res = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body as any,
  });
  return res;
};
export const promiseFnWithToken = async (props: PromiseFnProps) => {
  const jwt = await AsyncStorage.getItem(JWT);
  if (jwt) {
    return await promiseFn({...props, token: jwt});
  }
  return null;
};
