import {CommonActions, useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import APIS from 'src/modules/apis';
import {SCREENS} from 'src/modules/screens';
import {DeliveryAddress} from 'src/types/deliveryAddress';
import {useNavigate} from './useNavigate';

export const useBidCreate = ({
  listingId,
  listingHashId,
  price,
}: {
  listingId: string;
  listingHashId: string;
  price: string;
}) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState({kaikas: false, klip: false});
  const [deliveryAddress, handleChangeDeliveryAddress] =
    useState<DeliveryAddress>();
  const [description, handleChangeDescription] = useState<string>('');
  const [deposit, handleChangeDeposit] = useState<string>('');
  const navigation = useNavigation();
  const navToDeliveryAddressCreate = useNavigate({
    screen: SCREENS.DeliveryAddressCreate.name,
  });
  const navToKaikasTransact = useNavigate({
    screen: SCREENS.KaikasTransact.name,
  });
  const callback = (payload: DeliveryAddress) => {
    handleChangeDeliveryAddress(payload);
    navigation.goBack();
  };
  const navToKlipTransact = useNavigate({screen: SCREENS.KlipTransact.name});
  const navToDeliveryAddressList = useNavigate({
    screen: SCREENS.DeliveryAddressList.name,
  });
  const addDeliveryAddress = () => {
    navToDeliveryAddressCreate({callback});
  };
  const selectDeliveryAddress = () => {
    navToDeliveryAddressList({callback});
  };
  const errorString = !deliveryAddress
    ? '배송지를 작성해주세요'
    : !deposit || parseFloat(deposit) === 0
    ? '보증금을 적어주세요'
    : parseFloat(deposit) / (parseFloat(price) / 1e18) < 0.03
    ? '보증금은 가격의 최소 3%여야 합니다'
    : error;
  const bidCreate = async (klip: boolean) => {
    if (loading.kaikas || loading.klip) {
      return;
    }
    if (!errorString && deliveryAddress) {
      try {
        setLoading(
          klip ? {kaikas: false, klip: true} : {kaikas: true, klip: false},
        );
        const body = {
          delivery_address_id: deliveryAddress.id,
          description,
          listing_id: listingId,
          deposit: parseFloat(deposit) * 1e18,
        };
        const {bid} = await (APIS.bid._().postWithToken as Function)(body);
        const {contract_address, create} = await (
          APIS.bid.abi().get as Function
        )();
        const params = {
          to: contract_address,
          abi: create,
          value: parseFloat(deposit) * 1e18 + parseFloat(price),
          params: [
            listingHashId,
            BigInt(`0x${bid.id.replaceAll('-', '')}`).toString(10),
          ],
          callback: () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {name: SCREENS.Main.name},
                  {name: SCREENS.Bid.name, params: {id: bid.id}},
                ],
              }),
            );
          },
        };
        console.log(params);
        klip ? navToKlipTransact(params) : navToKaikasTransact(params);
      } catch {
        setError(
          '제품을 올리는중 문제가 발생했습니다. 다음에 다시 시도해주세요.',
        );
      } finally {
        setLoading({kaikas: false, klip: false});
      }
    } else {
      setError(errorString);
    }
  };
  const bidCreateWithKlip = () => {
    bidCreate(true);
  };
  const bidCreateWithKaikas = () => {
    bidCreate(false);
  };
  useEffect(() => {
    setError('');
  }, [deliveryAddress, description, price, deposit]);
  return {
    error,
    deliveryAddress,
    loading,
    handleChangeDeliveryAddress,
    description,
    handleChangeDescription,
    deposit,
    handleChangeDeposit,
    bidCreateWithKlip,
    bidCreateWithKaikas,
    addDeliveryAddress,
    selectDeliveryAddress,
  };
};
