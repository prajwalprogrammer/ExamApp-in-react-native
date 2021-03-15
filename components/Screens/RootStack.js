import React,{useEffect} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// import Modal from './Modal'
import DashBoard from '../Screens/Dashboard';
import Exam from '../Screens/Exam';
import Points from '../Screens/Points';
import Subject from '../Screens/Subject';
import Topics from '../Screens/Topics';
import { ActivityIndicator } from 'react-native-paper';
import { StatusBar,View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LoginScreen from '../AuthScreen/LoginScreen/Login'
import RegistrationScreen from '../AuthScreen/Register/Register'
//import {AsyncStorage} from '@react-native-community/async-storage' 
const BootStackScreen = createStackNavigator({
  // SplashScreen1:{
  //   screen:Splash,
  //   navigationOptions:{
  //     headerShown:false
  //   }
  // },
  // LoginScreen:{
  //   screen:Login,
  //   navigationOptions:{
  //     headerShown:false
  //   }
  // },
  // SignupSplash:{
  //   screen:SignUp,
  //   navigationOptions:{
  //     headerShown:false
  //   }},
  DashBoard: {
    screen: DashBoard,
    navigationOptions: {
      headerShown: false,
    },
  },
  AddTran: {
    screen:Subject,
    navigationOptions: {
      headerShown: false,
    },
  },
  
  // AddDb1: {
  //   screen:AddDB,
  //   navigationOptions: {
  //     headerShown: false,
  //   },
  // },
  ShowTran: {
    screen:Exam,
    navigationOptions: {
      headerShown: false,
    },
  }
});
const AuthSTack= createStackNavigator({
  // SplashScreen1:{
  //   screen:Splash,
  //   navigationOptions:{
  //     headerShown:false
  //   }
  // },
  LoginScreen:{
    screen:LoginScreen,
    navigationOptions:{
      headerShown:false
    }
  },
  SignupSplash:{
    screen:RegistrationScreen,
    navigationOptions:{
      headerShown:false
    }},
})
const AuthLoading=({navigation})=>{
  useEffect(() => {
    const loadData=async()=>{
      const isLoggedIn=await AsyncStorage.getItem('isLoggedIn')
      console.log("df" +isLoggedIn)
      navigation.navigate(isLoggedIn !== '1'?'Auth':'App');
    }
    loadData();
  }, [])
  
  return(
<View style={{flex:1,justifyContent:'center',alignItems:'center',BackGroundColor:'yellow'}}>
  <ActivityIndicator />
  <StatusBar barStyle="default" />
</View>
  );
}

export const RootStack= createAppContainer(createSwitchNavigator({
  AuthLoadingScreen:AuthLoading,
  App:BootStackScreen,
  Auth:AuthSTack
},
{
initialRouteName:'AuthLoadingScreen',
}
));

