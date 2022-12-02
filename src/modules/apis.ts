import urljoin from 'url-join';
import querystring from 'querystring';
import {isEmpty, omitBy, isNil} from 'lodash';
import {
  ApiMethod,
  ApiMethodWithToken,
  promiseFn,
  PromiseFnRes,
  promiseFnWithToken,
} from 'src/utils/apiUtils';
import {QueryFunction} from '@tanstack/react-query';

// export const BASE_URL = 'http://localhost:3000';
// const BASE_URL =
//   'http://dimpl-api-load-balancer-179507794.ap-northeast-2.elb.amazonaws.com';
const BASE_URL = 'http://192.168.1.185:3000';

const apiMethods = ['get', 'post', 'delete', 'put', 'patch'] as ApiMethod[];

type QueryFnObject = {
  [key in ApiMethod | ApiMethodWithToken]: QueryFunction<
    PromiseFnRes,
    string[]
  >;
};

const createQueryFnObject = (url: string) => {
  const queryFnObject = {} as QueryFnObject;
  apiMethods.forEach(method => {
    if (method === 'get') {
      queryFnObject[method] = () => promiseFn({url, method});
    } else {
      queryFnObject[method] = (body: object) => promiseFn({url, method, body});
    }
  });
  apiMethods.forEach(method => {
    if (method === 'get') {
      queryFnObject[(method + 'WithToken') as ApiMethodWithToken] = () =>
        promiseFnWithToken({url, method});
    } else {
      queryFnObject[(method + 'WithToken') as ApiMethodWithToken] = (
        body: object,
      ) => promiseFnWithToken({url, method, body});
    }
  });
  return queryFnObject;
};
const toQueryObject = (...args: string[]) => ({
  url: urljoin(...args),
  ...createQueryFnObject(urljoin(...args)),
  key: '',
});
const apiV1 = (path: string) => toQueryObject(BASE_URL, '/api/v1', path);

export const urlParams = (obj: any, nullable?: boolean) => {
  if (nullable) {
    return isEmpty(obj) ? '' : '?' + querystring.stringify(obj);
  }
  const nilRemoved = omitBy(obj, isNil);
  if (isEmpty(nilRemoved)) {
    return '';
  }
  return '?' + querystring.stringify(nilRemoved);
};

const APIS = {
  user: {
    _: () => apiV1('/user'),
  },
  file: {
    image: () => apiV1('/file/image'),
  },
  delivery_address: {
    _: () => apiV1('/delivery_address'),
    list: (limit?: number, cursor?: string) =>
      apiV1(`/delivery_address/list${urlParams({cursor, limit})}`),
  },
  listing: {
    _: (id?: string) => apiV1(`/listing${urlParams({id})}`),
    abi: () => apiV1('/listing/abi'),
    feed: (limit?: number, cursor?: string) =>
      apiV1(`/listing/feed${urlParams({cursor, limit})}`),
    list: (
      status: number,
      klaytnAddress?: number,
      limit?: number,
      cursor?: string,
    ) =>
      apiV1(
        `/listing/list${urlParams({
          status,
          cursor,
          limit,
          klaytn_address: klaytnAddress,
        })}`,
      ),
  },
  bid: {
    abi: () => apiV1('/bid/abi'),
    _: (id?: string) => apiV1(`/bid${urlParams({id})}`),
    list: (
      status: number,
      klaytnAddress?: number,
      limit?: number,
      cursor?: string,
    ) =>
      apiV1(
        `/bid/list${urlParams({
          status,
          cursor,
          limit,
          klaytn_address: klaytnAddress,
        })}`,
      ),
  },
};

type ApiTreeNode = {
  [key: string]: Function | object;
};

const mapFunctionToPath = (data: ApiTreeNode, path: string[]) => {
  data &&
    Object.entries(data).map(([key, v]) => {
      if (typeof v === 'function') {
        const apiKey = [...path, key].join('.');
        data[key] = (...args: any) => ({...v(...args), key: apiKey});
        Object.defineProperty(data[key], '_apiKey', {value: apiKey});
      } else if (typeof v === 'object') {
        mapFunctionToPath(v as ApiTreeNode, [...path, key]);
      }
    });
};
(function () {
  mapFunctionToPath(APIS, ['apis']);
})();

export default APIS;
