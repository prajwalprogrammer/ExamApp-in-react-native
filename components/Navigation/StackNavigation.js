import * as React from 'react';
import { View, Button, Text, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Subject from '../Screens/Subject'
import Topics from '../Screens/Topics'
import Exam from '../Screens/Exam'
import DashBoard from '../Screens/Dashboard'

import Points from '../Screens/Points'
import LoginScreen from '../AuthScreen/LoginScreen/Login'
import RegistrationScreen from '../AuthScreen/Register/Register'
function Home({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

function Profile({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

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

const Stack = createStackNavigator();

export default function MyStack() {
  return (
     <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerStyleInterpolator: forFade }}
      />
       <Stack.Screen
        name="Signup"
        component={RegistrationScreen}
        options={{ headerStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Dashboard"
        component={DashBoard}
        options={{ headerStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Subject"
        component={Subject}
        options={{ headerStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Topics"
        component={Topics}
        options={{ headerStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Points"
        component={Points}
        options={{ headerStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Exam"
        component={Exam}
        options={{ headerStyleInterpolator: forFade }}
      />
    </Stack.Navigator>
  );
}


