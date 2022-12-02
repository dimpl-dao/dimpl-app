import {CommonActions, useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Linking} from 'react-native';
import {largeBump} from 'src/utils/hapticFeedBackUtils';
import {name as appName} from '../../app.json';
import APIS from 'src/modules/apis';
import {useAutoLogin} from './useAutoLogin';
import {SCREENS} from 'src/modules/screens';
import {kaikasApp2AppRequestUrl} from 'src/utils/uriUtils';
import {Wallet} from 'src/redux/appReducer';

const SERVER_URL = 'https://api.kaikas.io/api/v1/k';

const prepare = {
  auth: ({successLink = null, failLink = null}) => {
    return fetch(`${SERVER_URL}/prepare`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bapp: {
          name: appName,
          callback: {
            success: successLink,
            fail: failLink,
          },
        },
        type: 'auth',
      }),
    }).then(res => res.json());
  },
};
const getResult = (requestKey?: string) => {
  return fetch(`${SERVER_URL}/result/${requestKey}`, {
    method: 'GET',
  }).then(res => res.json());
};

type PrepareResult = {
  expiration_time: number;
  request_key: string;
  status: string;
};

export default function useKaikasLogin() {
  const autoLogin = useAutoLogin();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [prepareAuthResult, setPrepareAuthResult] =
    useState<PrepareResult | null>(null);

  async function requestAuth() {
    setError('');
    const prepareRes = (await prepare.auth({})) as PrepareResult;
    setPrepareAuthResult(prepareRes);
    Linking.openURL(kaikasApp2AppRequestUrl(prepareRes?.request_key));
  }

  async function checkResultAndLogin() {
    if (loading) {
      return;
    }
    largeBump();
    setError('');
    setLoading(true);
    try {
      const authResult = await getResultAuth();
      if (authResult) {
        const verificationResponse = await getVerification({
          klaytnAddress: authResult.klaytn_address,
        });
        if (verificationResponse.success) {
          await autoLogin(
            verificationResponse.jwt,
            Wallet.KAIKAS,
            () => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: SCREENS.Main.name}],
                }),
              );
            },
            () => {
              setError('메세지를 서명하는 도중 문제가 발생하였습니다.');
            },
          );
        }
      }
    } catch (e) {
      setError('메세지를 서명하는 도중 문제가 발생하였습니다.');
    }
    setLoading(false);
  }

  async function getVerification({klaytnAddress}: {klaytnAddress: string}) {
    if (prepareAuthResult) {
      const verificationResponse = await (APIS.user._().put as Function)({
        klaytn_address: klaytnAddress,
        request_key: prepareAuthResult.request_key,
        type: 'kaikas',
      });
      if (verificationResponse.success) {
        return verificationResponse;
      }
    }
    return null;
  }

  async function getResultAuth() {
    const res = await getResult(prepareAuthResult?.request_key);
    if (res.status === 'completed') {
      return res.result;
    }
    if (res.status === 'requested') {
      setError('카이카스 지갑에 주소를 요청하였지만 아직 수락하지 않았습니다.');
      return null;
    }
    return null;
  }

  return {error, loading, prepareAuthResult, requestAuth, checkResultAndLogin};
}
