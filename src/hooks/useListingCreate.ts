import {CommonActions, useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import APIS from 'src/modules/apis';
import {SCREENS} from 'src/modules/screens';
import useImagesUpload, {AttachableRecord} from './useImagesUpload';
import {useNavigate} from './useNavigate';

export const useListingCreate = () => {
  const [loading, setLoading] = useState({kaikas: false, klip: false});
  const [title, handleChangeTitle] = useState<string>('');
  const [description, handleChangeDescription] = useState<string>('');
  const [price, handleChangePrice] = useState<string>('');
  const [deposit, handleChangeDeposit] = useState<string>('');
  const [deliveryTime, handleChangeDeliveryTime] = useState<string>('');
  const navigation = useNavigation();
  const {
    images,
    error,
    setError,
    handleAddImages,
    handleRemoveImage,
    uploadAllSelectedFiles,
  } = useImagesUpload({
    fileLimit: 10,
    attachedRecord: AttachableRecord.Listing,
  });
  const navToKaikasTransact = useNavigate({
    screen: SCREENS.KaikasTransact.name,
  });
  const navToKlipTransact = useNavigate({screen: SCREENS.KlipTransact.name});
  const errorString = !title
    ? '제목을 작성해주세요'
    : !description
    ? '설명을 작성해주세요'
    : !price || parseFloat(price) === 0
    ? '가격을 적어주세요'
    : !deposit || parseFloat(deposit) === 0
    ? '보증금을 적어주세요'
    : parseFloat(deposit) / parseFloat(price) < 0.03
    ? '보증금은 가격의 최소 3%여야 합니다'
    : !deliveryTime
    ? '최대 소요 배송기한을 적어주세요'
    : images.length === 0
    ? '이미지를 하나 이상 첨부해주세요'
    : error;
  const listingCreate = async (klip: boolean) => {
    if (loading.kaikas || loading.klip) {
      return;
    }
    if (!errorString) {
      try {
        setLoading(
          klip ? {kaikas: false, klip: true} : {kaikas: true, klip: false},
        );
        const signedImageIds = await uploadAllSelectedFiles();
        const body = {
          title,
          description,
          price: parseFloat(price) * 10e18,
          deposit: parseFloat(deposit) * 10e18,
          remonstrable_block_interval: parseInt(deliveryTime) * 86400,
          images: signedImageIds,
        };
        const {listing} = await (APIS.listing._().postWithToken as Function)(
          body,
        );
        const {contract_address, create} = await (
          APIS.listing.abi().get as Function
        )();
        const params = {
          to: contract_address,
          abi: create,
          value: listing.deposit,
          params: [
            listing.price,
            BigInt(`0x${listing.id.replaceAll('-', '')}`),
            listing.remonstrable_block_interval,
          ],
          callback: () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {name: SCREENS.Main.name},
                  {name: SCREENS.Listing.name, params: {id: listing.id}},
                ],
              }),
            );
          },
        };
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
  const listingCreateWithKlip = () => {
    listingCreate(true);
  };
  const listingCreateWithKaikas = () => {
    listingCreate(false);
  };
  useEffect(() => {
    setError('');
  }, [title, description, price, deposit, images.length, deliveryTime]);
  return {
    error,
    title,
    loading,
    handleChangeTitle,
    description,
    handleChangeDescription,
    price,
    handleChangePrice,
    deposit,
    handleChangeDeposit,
    deliveryTime,
    handleChangeDeliveryTime,
    images,
    handleAddImages,
    handleRemoveImage,
    listingCreateWithKlip,
    listingCreateWithKaikas,
  };
};
