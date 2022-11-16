import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS} from './modules/screens';

const RootStack = createStackNavigator();

export const Navigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName={SCREENS.Splash.name}
      screenOptions={{headerShown: false}}>
      {Object.entries(SCREENS).map(([k, v], _i) => (
        <RootStack.Screen
          key={k}
          name={v.name}
          component={v.component}
          options={v.options}
          initialParams={v.initialParams}
        />
      ))}
    </RootStack.Navigator>
  );
};
