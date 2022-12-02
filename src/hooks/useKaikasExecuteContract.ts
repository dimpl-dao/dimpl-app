import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import {Linking} from 'react-native';
import APIS from 'src/modules/apis';
import {largeBump} from 'src/utils/hapticFeedBackUtils';
import {kaikasApp2AppRequestUrl} from 'src/utils/uriUtils';
import {name as appName} from '../../app.json';

// const CHAIN_ID = '1001';
const CHAIN_ID = '8217';
const SERVER_URL = 'https://api.kaikas.io/api/v1/k';

const prepare = {
  executeContract: ({
    from,
    to,
    value,
    abi,
    params,
    successLink,
    failLink,
  }: {
    from?: string;
    to: string;
    value: string;
    abi: string;
    params: string;
    successLink?: string;
    failLink?: string;
  }) => {
    return fetch(`${SERVER_URL}/prepare`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chain_id: CHAIN_ID,
        bapp: {
          name: appName,
          callback: {
            success: successLink,
            fail: failLink,
          },
        },
        type: 'execute_contract',
        transaction: {
          from: from,
          to: to,
          value: value,
          abi: abi,
          params: params,
        },
      }),
    }).then(res => res.json());
  },
};
const getResult = (requestKey: string) => {
  return fetch(`${SERVER_URL}/result/${requestKey}`, {
    method: 'GET',
  }).then(res => res.json());
};

type PrepareResult = {
  expiration_time: number;
  request_key: string;
  status: string;
} | null;

export default function useKaikasExecuteContract() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [prepareResult, setPrepareResult] = useState<PrepareResult>(null);
  const {data} = useQuery({
    queryKey: [APIS.user._().key],
    queryFn: APIS.user._().getWithToken,
    refetchOnMount: false,
  });

  async function requestExecuteContract({
    from = data.user.klaytn_address,
    to,
    value,
    abi,
    params,
  }: {
    from?: string;
    to: string;
    value: number;
    abi: string;
    params: (number | string)[];
  }) {
    setError('');
    const prepareRes = (await prepare.executeContract({
      from,
      to,
      value: value.toString(),
      abi: JSON.stringify(abi),
      params: JSON.stringify(params.map(item => item.toString())),
    })) as PrepareResult;
    setPrepareResult(prepareRes);
    if (prepareRes) {
      Linking.openURL(kaikasApp2AppRequestUrl(prepareRes.request_key));
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
      const res = await getResultExecuteContract();
      if (res) {
        await callback(res);
      }
    } catch (e) {
      setError('메세지를 서명하는 도중 문제가 발생하였습니다.');
    }
    setLoading(false);
  }

  async function getResultExecuteContract() {
    if (!prepareResult) {
      return null;
    }
    const res = await getResult(prepareResult.request_key);
    if (res.status === 'completed') {
      return res.result;
    }
    if (res.status === 'requested') {
      setError('승인이 아직 확인되지 않았습니다. 몇초 후 확인해주세요.');
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
