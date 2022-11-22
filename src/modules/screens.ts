import {TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import {Platform} from 'react-native';
import KaikasSignInScreen from 'src/screens/KaikasSignInScreen';
import KaikasTransactScreen from 'src/screens/KaikasTransactScreen';
import KlipSignInScreen from 'src/screens/KlipSignInScreen';
import KlipTransactScreen from 'src/screens/KlipTransactScreen';
import {ListingCreateScreen} from 'src/screens/ListingCreateScreen';
import {ListingFeedScreen} from 'src/screens/ListingFeedScreen';
import {ListingListScreen} from 'src/screens/ListingListScreen';
import {ListingScreen} from 'src/screens/ListingScreen';
import {MainScreen} from 'src/screens/MainScreen';
import {ProfileScreen} from 'src/screens/ProfileScreen';
import {ProposalFeedScreen} from 'src/screens/ProposalFeedScreen';
import SignInScreen from 'src/screens/SignInScreen';
import SplashScreen from 'src/screens/SplashScreen';

type Screen = {
  name: string;
  component: React.FC;
  options?: object;
  initialParams?: object;
  beforeNavigate?: Function;
};

type Screens = {
  [key: string]: Screen;
};

export const SCREENS: Screens = {
  Splash: {
    name: 'Splash',
    component: SplashScreen,
  },
  Main: {
    name: 'Main',
    component: MainScreen,
    options: {},
    initialParams: {},
    beforeNavigate: () => {},
  },
  ListingFeed: {
    name: 'ListingFeed',
    component: ListingFeedScreen,
    options: {},
    initialParams: {},
  },
  ProposalFeed: {
    name: 'ProposalFeed',
    component: ProposalFeedScreen,
    options: {},
    initialParams: {},
  },
  Profile: {
    name: 'Profile',
    component: ProfileScreen,
    options: {},
    initialParams: {},
  },
  SignIn: {
    name: 'SignIn',
    component: SignInScreen,
    options: {},
    initialParams: {},
  },
  KaikasSignIn: {
    name: 'KaikasSignIn',
    component: KaikasSignInScreen,
    options: {},
    initialParams: {},
  },
  KlipSignIn: {
    name: 'KlipSignIn',
    component: KlipSignInScreen,
    options: {},
    initialParams: {},
  },
  ListingCreate: {
    name: 'ListingCreate',
    component: ListingCreateScreen,
    options: {
      ...(Platform.OS === 'ios'
        ? TransitionPresets.ModalSlideFromBottomIOS
        : TransitionPresets.ModalTransition),
      gestureEnabled: false,
    },
  },
  KaikasTransact: {
    name: 'KaikasTransact',
    component: KaikasTransactScreen,
    options: {
      gestureEnabled: false,
    },
  },
  KlipTransact: {
    name: 'KlipTransact',
    component: KlipTransactScreen,
    options: {
      gestureEnabled: false,
    },
  },
  ListingList: {
    name: 'ListingList',
    component: ListingListScreen,
  },
  Listing: {
    name: 'Listing',
    component: ListingScreen,
  },
};

export type ScreenKeys = keyof typeof SCREENS;
