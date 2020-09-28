import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';

const Customers = ({navigation}: NavigationStackProp) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <Text>Customers screen</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Customers;
