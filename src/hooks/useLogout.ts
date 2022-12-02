import {useDispatch} from 'react-redux';
import {appLogoutAction} from 'src/redux/appReducer';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {SCREENS} from 'src/modules/screens';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const logout = async () => {
    dispatch(appLogoutAction());
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: SCREENS.SignIn.name}],
      }),
    );
  };
  return logout;
};
