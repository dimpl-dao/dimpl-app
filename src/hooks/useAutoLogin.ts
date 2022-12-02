import APIS from 'src/modules/apis';
import {promiseFn} from 'src/utils/apiUtils';
import {useQueryClient} from '@tanstack/react-query';
import {useDispatch} from 'react-redux';
import {appLoginAction, Wallet} from 'src/redux/appReducer';

export const useAutoLogin = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const autoLogin = async (
    jwt: string,
    wallet: Wallet,
    onSuccess: Function,
    onFailure: Function,
  ) => {
    const userResponse = await promiseFn({
      url: APIS.user._().url,
      token: jwt,
      method: 'get',
    });
    if (userResponse.success) {
      dispatch(appLoginAction({jwt, wallet}));
      await Promise.all([
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
