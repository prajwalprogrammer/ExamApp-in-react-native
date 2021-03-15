import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {BootStack} from './components/Navigation/BootStack'
import Login from './components/AuthScreen/Login1'
const App = () => {
  return (
    <BootStack />
    // <Login />
  );
};

export default App;