import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '~/screens/Home';
import Customers from '~/screens/Customers';

const Stack = createStackNavigator();

export const AppRoutesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{title: 'POC 360'}}
      />
      <Stack.Screen
        name="CustomersScreen"
        component={Customers}
        options={{title: 'POC 360'}}
      />
    </Stack.Navigator>
  );
};
