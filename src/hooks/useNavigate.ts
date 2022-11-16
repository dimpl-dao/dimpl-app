import {useNavigation} from '@react-navigation/native';
import {ScreenKeys, SCREENS} from 'src/modules/screens';

type UseNavigateProps = {
  screen: ScreenKeys;
};

export const useNavigate = ({screen}: UseNavigateProps) => {
  const {navigate} = useNavigation();
  const _navigate = (screenProps?: object, beforeNavigateProps?: object) => {
    if (typeof SCREENS[screen].beforeNavigate === 'function') {
      // @ts-ignore
      SCREENS[screen].beforeNavigate(beforeNavigateProps);
    }
    navigate(screen as never, screenProps as never);
  };
  return _navigate;
};
