import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import APIS from 'src/modules/apis';
import {PickedDeliveryAddress} from 'src/types/deliveryAddress';

export const useDeliveryAddressCreate = ({callback}: {callback: Function}) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [deliveryAddress, handleChangeDeliveryAddress] =
    useState<PickedDeliveryAddress | null>(null);
  const [specifics, handleChangeSpecifics] = useState<string>('');
  const {goBack} = useNavigation();
  const errorString = !deliveryAddress
    ? '우편번호를 선택해주세요'
    : !specifics
    ? '상세주소를 입력해주세요'
    : error;
  const deliveryAddressCreate = async (klip: boolean) => {
    if (loading) {
      return;
    }
    if (!errorString && deliveryAddress) {
      try {
        setLoading(true);
        const body = {
          address_ko: deliveryAddress.address,
          address_en: deliveryAddress.addressEnglish,
          zonecode: deliveryAddress.zonecode,
          name: deliveryAddress.buildingName || deliveryAddress.address,
          specifics,
        };
        const {delivery_address} = await (
          APIS.delivery_address._().postWithToken as Function
        )(body);
        if (delivery_address) {
          callback(delivery_address);
        } else {
          new Error();
        }
      } catch {
        setError('주소를 추가하는중 문제가 발생하였습니다');
      } finally {
        setLoading(false);
      }
    } else {
      setError(errorString);
    }
  };
  useEffect(() => {
    setError('');
  }, [deliveryAddress, specifics]);
  return {
    error,
    setError,
    deliveryAddress,
    loading,
    handleChangeDeliveryAddress,
    specifics,
    handleChangeSpecifics,
    deliveryAddressCreate,
  };
};
