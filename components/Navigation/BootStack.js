import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage,
} from 'react-native';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Subject from '../Screens/Subject';
import Topics from '../Screens/Topics';
import Exam from '../Screens/Exam';
import DashBoard from '../Screens/Dashboard';
import SignUp from '../AuthScreen/SignUp1';

import Login from '../AuthScreen/Login1';
import Points from '../Screens/Points';
import LoginScreen from '../AuthScreen/LoginScreen/Login';
import RegistrationScreen from '../AuthScreen/Register/Register';
import UpdateAccount from '../Screens/UpdateAccount';
import ExamLink from '../Screens/ExamLink';
const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};
const AuthSTack = createStackNavigator({
  LoginScreen: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  SignupSplash: {
    screen: SignUp,
    navigationOptions: {
      headerShown: false,
    },
  },
});
const AppSTack = createStackNavigator({
  DashBoard: {
    screen: DashBoard,
    navigationOptions: {
      headerShown: false,
      headerStyleInterpolator: forFade

    },
  },
  Subject: {
    screen: Subject,
    navigationOptions: {
      headerShown: false,
      headerStyleInterpolator: forFade
    },
  },
  ExamLink: {
    screen: ExamLink,
    navigationOptions: {
      headerShown: false,
      headerStyleInterpolator: forFade

    },
  },
  Update: {
    screen: UpdateAccount,
    navigationOptions: {
      headerShown: false,
      headerStyleInterpolator: forFade

    },
  },
  Points: {
    screen: Points,
    navigationOptions: {
      headerShown: false,
    },
  },
  Topics: {
    screen: Topics,
    navigationOptions: {
      headerShown: false,
    },
  },
});

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class OtherScreen extends React.Component {
  static navigationOptions = {
    title: 'Lots of features here',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppStack =AppSTack;
const AuthStack = AuthSTack;

export const BootStack = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
