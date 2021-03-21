import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {BootStack} from './components/Navigation/BootStack'
import Login from './components/AuthScreen/Login1'
import AuthProvider from './components/Navigation/AuthProvider';
import { Login1, Register } from './components/Url';
const App = () => {
  return (
    <AuthProvider>
      <BootStack />
    
    </AuthProvider>
    // <Login />
  );
};

export default App;