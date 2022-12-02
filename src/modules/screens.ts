import {TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import {Platform} from 'react-native';
import {BidCreateScreen} from 'src/screens/BidCreateScreen';
import {BidListScreen} from 'src/screens/BidListScreen';
import {BidScreen} from 'src/screens/BidScreen';
import {DeliveryAddressCreateScreen} from 'src/screens/DeliveryAddressCreateScreen';
import {DeliveryAddressListScreen} from 'src/screens/DeliveryAddressListScreen';
import KaikasSignInScreen from 'src/screens/KaikasSignInScreen';
import KaikasTransactScreen from 'src/screens/KaikasTransactScreen';
import KlipSignInScreen from 'src/screens/KlipSignInScreen';
import KlipTransactScreen from 'src/screens/KlipTransactScreen';
import {ListingCreateScreen} from 'src/screens/ListingCreateScreen';
import {ListingFeedScreen} from 'src/screens/ListingFeedScreen';
import {ListingListScreen} from 'src/screens/ListingListScreen';
import {ListingScreen} from 'src/screens/ListingScreen';
import {ListingSearchScreen} from 'src/screens/ListingSearchScreen';
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
  ListingSearch: {
    name: 'ListingSearch',
    component: ListingSearchScreen,
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
  BidCreate: {
    name: 'BidCreate',
    component: BidCreateScreen,
    options: {
      ...(Platform.OS === 'ios'
        ? TransitionPresets.ModalSlideFromBottomIOS
        : TransitionPresets.ModalTransition),
      gestureEnabled: false,
    },
  },
  Bid: {
    name: 'Bid',
    component: BidScreen,
  },
  DeliveryAddressCreate: {
    name: 'DeliveryAddressCreate',
    component: DeliveryAddressCreateScreen,
    options: {
      ...(Platform.OS === 'ios'
        ? TransitionPresets.ModalSlideFromBottomIOS
        : TransitionPresets.ModalTransition),
    },
  },
  DeliveryAddressList: {
    name: 'DeliveryAddressList',
    component: DeliveryAddressListScreen,
  },
  BidList: {
    name: 'BidList',
    component: BidListScreen,
  },
};

export type ScreenKeys = keyof typeof SCREENS;
