import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SCREENS} from 'src/modules/screens';
import {Home, User} from 'react-native-feather';
import {COLORS} from 'src/modules/styles';

const Tab = createBottomTabNavigator();

export const MainScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName={SCREENS.Main.name}
      screenOptions={{
        lazy: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name={'홈'}
        component={SCREENS.ListingFeed.component}
        options={{
          tabBarActiveTintColor: COLORS.black,
          tabBarIcon: ({focused}) => (
            <Home
              width={22}
              height={22}
              strokeWidth={2}
              color={focused ? COLORS.black : COLORS.gray.DEFAULT}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name={'포럼'}
        component={SCREENS.ProposalFeed.component}
        options={{
          tabBarActiveTintColor: COLORS.black,
          tabBarIcon: ({focused}) => (
            <Hash
              width={22}
              height={22}
              strokeWidth={2}
              color={focused ? COLORS.black : COLORS.gray.DEFAULT}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name={'나의 딤플'}
        component={SCREENS.Profile.component}
        options={{
          tabBarActiveTintColor: COLORS.black,
          tabBarIcon: ({focused}) => (
            <User
              width={22}
              height={22}
              strokeWidth={2}
              color={focused ? COLORS.black : COLORS.gray.DEFAULT}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
