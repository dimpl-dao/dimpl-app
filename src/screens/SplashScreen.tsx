import React, {useEffect} from 'react';
import {Div} from 'src/components/core/Div';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {IMAGES} from 'src/modules/images';
import {useAutoLogin} from 'src/hooks/useAutoLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigate} from 'src/hooks/useNavigate';
import {JWT} from 'src/modules/apis';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {SCREENS} from 'src/modules/screens';

const SplashScreen = () => {
  const backgroundScale = useSharedValue(0.05);
  const logoScale = useSharedValue(0);
  const autoLogin = useAutoLogin();
  const navigation = useNavigation();
  const navToSignIn = useNavigate({screen: SCREENS.SignIn.name});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const backgroundStyle = useAnimatedStyle(() => {
    return {
      width: 1600,
      height: 1600,
      transform: [
        {
          scale: logoScale.value,
        },
      ],
    };
  });
  const logoStyle = useAnimatedStyle(() => {
    return {
      width: 160,
      height: 160,
      borderRadius: 10,
      transform: [
        {
          scale: backgroundScale.value,
        },
      ],
    };
  });
  const logoAnimation = () => {
    logoScale.value = withDelay(1000, withTiming(1, {duration: 1000}));
    backgroundScale.value = withDelay(1200, withTiming(1, {duration: 800}));
  };
  const login = async () => {
    AsyncStorage.getItem(JWT).then(async value => {
      if (value) {
        await autoLogin(
          value,
          () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: SCREENS.Main.name}],
              }),
            );
          },
          () => {
            navToSignIn();
          },
        );
      } else {
        navToSignIn();
      }
    });
  };

  useEffect(() => {
    logoAnimation();
    login();
  }, []);

  return (
    <Div bgWhite flex={1} itemsCenter justifyCenter>
      <Div itemsCenter>
        <Div absolute w50 h50 top={-40} itemsCenter justifyCenter>
          <Animated.Image style={logoStyle} source={IMAGES.logo} />
        </Div>
      </Div>
    </Div>
  );
};

export default SplashScreen;
