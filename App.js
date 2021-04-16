/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import{
  View,
  StyleSheet
} from 'react-native';

import Navigation from './navigator/navigation'
import Login from './screen/Login'
import Profile from './screen/Profile'
import TabNavigator from './navigator/tabNavigator'

const App: () => React$Node = () => {
  return (
    <Navigation />
  );
};

const styles = StyleSheet.create({

});

export default App;
