import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LinkStackNavigation from './LinkStackNavigation';
import AddLinkScreen from '../screens/AddLinkScreen';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="ListStack"
      screenOptions={{
        presentation: 'containedModal',
        headerShown: false,
      }}
    >
      <Stack.Screen name="ListStack" component={LinkStackNavigation} />
      <Stack.Screen name="AddLink" component={AddLinkScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
