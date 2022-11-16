import {CommonActions, useNavigation} from '@react-navigation/native';
// @ts-ignore
import {prepare, getResult} from 'klip-sdk';
import {useState} from 'react';
import {Linking} from 'react-native';
import {largeBump} from 'src/utils/hapticFeedBackUtils';
import {klipApp2AppRequestUrl} from 'src/utils/uriUtils';
import {name as appName} from '../../app.json';
import APIS from 'src/modules/apis';
import {useAutoLogin} from './useAutoLogin';
import {SCREENS} from 'src/modules/screens';

type PrepareResult = {
  expiration_time: number;
  request_key: string;
  status: string;
};

export default function useKlipLogin() {
  const autoLogin = useAutoLogin();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [prepareAuthResult, setPrepareAuthResult] =
    useState<PrepareResult | null>(null);

  async function requestAuth() {
    setError('');
    const prepareRes = (await prepare.auth({
      bappName: appName,
    })) as PrepareResult;
    setPrepareAuthResult(prepareRes);
    Linking.openURL(klipApp2AppRequestUrl(prepareRes?.request_key));
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
        if (verificationResponse) {
          await autoLogin(
            verificationResponse.jwt,
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
      const {data: verificationResponse} = await (
        APIS.user._().put as Function
      )({
        account: klaytnAddress,
        request_key: prepareAuthResult.request_key,
        type: 'klip',
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
      setError('클립 지갑에 주소를 요청하였지만 아직 수락하지 않았습니다.');
      return null;
    }
    setPrepareAuthResult(null);
    return null;
  }

  return {error, loading, prepareAuthResult, requestAuth, checkResultAndLogin};
}
