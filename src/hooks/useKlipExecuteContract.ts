import {useState} from 'react';
import {Linking} from 'react-native';
// @ts-ignore
import {prepare, getResult} from 'klip-sdk';
import {largeBump} from 'src/utils/hapticFeedBackUtils';
import {klipApp2AppRequestUrl} from 'src/utils/uriUtils';
import {name as appName} from '../../app.json';

type PrepareResult = {
  expiration_time: number;
  request_key: string;
  status: string;
} | null;

export default function useKlipExecuteContract() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [prepareResult, setPrepareResult] = useState<PrepareResult>(null);

  async function requestExecuteContract({
    from,
    to,
    value,
    abi,
    params,
  }: {
    from: string;
    to: string;
    value: number;
    abi: string;
    params: (number | string)[];
  }) {
    setError('');
    const prepareRes = (await prepare.executeContract({
      bappName: appName,
      from,
      to,
      value: value.toString(),
      abi: JSON.stringify(abi),
      params: JSON.stringify(params.map(item => item.toString())),
    })) as PrepareResult;
    setPrepareResult(prepareRes);
    if (prepareRes) {
      Linking.openURL(klipApp2AppRequestUrl(prepareRes.request_key));
    }
  }

  async function checkResultAndCallback({callback}: {callback: Function}) {
    if (loading) {
      return;
    }
    largeBump();
    setError('');
    setLoading(true);
    try {
      const authResult = await getResultExecuteContract();
      if (authResult) {
        await callback(authResult);
      }
    } catch (e) {
      setError('메세지를 서명하는 도중 문제가 발생하였습니다.');
    }
    setLoading(false);
  }

  async function getResultExecuteContract() {
    if (!prepareResult) {
      return;
    }
    const res = await getResult(prepareResult.request_key);
    if (res.status === 'completed') {
      return res.result;
    }
    if (res.status === 'requested') {
      setError(
        '카이카스 지갑에 클레이 전송을 요청하였지만 아직 수락하지 않았습니다.',
      );
      return null;
    }
    setPrepareResult(null);
    return null;
  }

  return {
    error,
    loading,
    prepareResult,
    requestExecuteContract,
    checkResultAndCallback,
  };
}
