import {useState} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import APIS from 'src/modules/apis';
import {SCREENS} from 'src/modules/screens';
import {Wallet} from 'src/redux/appReducer';
import {RootState} from 'src/redux/rootReducer';
import {Listing} from 'src/types/listing';
import {useNavigate} from './useNavigate';

export const useBidSelect = ({listingHashId}: {listingHashId: string}) => {
  const {wallet} = useSelector(
    (root: RootState) => ({wallet: root.app.wallet}),
    shallowEqual,
  );
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const navToKaikasTransact = useNavigate({
    screen: SCREENS.KaikasTransact.name,
  });
  const navToKlipTransact = useNavigate({screen: SCREENS.KlipTransact.name});
  const bidSelect = async (bidHashId: string) => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const {contract_address, select} = await (
        APIS.bid.abi().get as Function
      )();
      const params = {
        to: contract_address,
        abi: select,
        value: '0',
        params: [listingHashId, bidHashId],
      };
      console.log(params);
      wallet === Wallet.KLIP
        ? navToKlipTransact(params)
        : navToKaikasTransact(params);
    } catch {
      setError(
        '구매 제안을 선책하는중 문제가 발생했습니다. 다음에 다시 시도해주세요.',
      );
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    error,
    setError,
    bidSelect,
  };
};
