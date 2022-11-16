import APIS, {JWT} from 'src/modules/apis';
import {promiseFn} from 'src/utils/apiUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQueryClient} from '@tanstack/react-query';

export const useAutoLogin = () => {
  const queryClient = useQueryClient();
  const autoLogin = async (
    jwt: string,
    onSuccess: Function,
    onFailure: Function,
  ) => {
    const {data: userResponse} = await promiseFn({
      url: APIS.user._().url,
      token: jwt,
      method: 'get',
    });
    if (userResponse.success) {
      await AsyncStorage.setItem(JWT, userResponse.jwt);
      await Promise.all([
        queryClient.prefetchQuery(
          [APIS.listing.feed().key],
          APIS.listing.feed().getWithToken,
        ),
        queryClient.prefetchQuery(
          [APIS.user._().key],
          APIS.user._().getWithToken,
        ),
        ,
      ]);
      onSuccess();
    } else {
      onFailure();
    }
  };
  return autoLogin;
};
