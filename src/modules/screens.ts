import React from 'react';
import KaikasSignInScreen from 'src/screens/KaikasSignInScreen';
import KlipSignInScreen from 'src/screens/KlipSignInScreen';
import {ListingFeedScreen} from 'src/screens/ListingFeedScreen';
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
};

export type ScreenKeys = keyof typeof SCREENS;
