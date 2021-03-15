import React, { useContext, useState, Fragment } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import { Login1 } from '../Url';

//import {AsyncStorage} from '@react-native-community/async-storage'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Container, Header, Content, Badge, Icon, Button } from 'native-base';

import FormButton from './ButtonFormik';
import ErrorMessage from './ErrorFormik';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(4, 'Password must have more than 4 characters '),
});

const Login = ({ navigation }) => {
  const [Email, setEmail] = useState('value@gmail.com');
  const [Password, setPassword] = useState('902115565');
  const [InputChange, setInputChange] = useState(false);
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const TextChange = (value) => {
    if (value.length !== 0) {
      setEmail(value);
      setInputChange(true);
    } else {
      setInputChange(false);
    }
  };
  const Submit = async () => {
    console.log('object');
    // await AsyncStorage.setItem("isLoggedIn","1");
    // navigation.navigate("App")
  };
  const handleSubmit = async (values) => {
    if (values.email.length > 0 && values.password.length > 0) {
      alert(values.email)
      var data = await Login1(values.email,values.password,navigation);
          values.email='',
          values.password=''
      // this.props.navigation.navigate('App')
      // alert('Sucessfull');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.Text}>Welcome Here</Text> */}
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          validationSchema={validationSchema}>
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting,
          }) => (
            <Fragment>
              <Text style={styles.TextFooter}>Email</Text>

              {/* <FormInput
                name="email"
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder="Enter email"
                autoCompleteType="email"
                autoCapitalize="none"
                iconName="user-o"
                iconColor="#2C384A"
                onBlur={handleBlur('email')}
                autoFocus
                
              /> */}
              <View style={styles.Action}>
                <FontAwesome
                  name="user-o"
                  color="#05375a"
                  size={20}
                  style={{ marginTop: 12 }}
                />
                <TextInput
                  autoCompleteType="email"
                  onBlur={handleBlur('email')}
                  placeholder="Enter E-mail"
                  style={styles.TextInput}
                  autoCapitalize="none"
                  //name={name}
                  value={values.email}
                  onChangeText={handleChange('email')}

                  // onChange={(value) => setEmail(value)}
                />

                {isValid ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="red" size={20} />
                  </Animatable.View>
                )}
              </View>
              {/* {isSubmitting ? (
                    <Animatable.View animation="bounceIn">
                      <Feather name="check-circle" color="green" size={20} />
                    </Animatable.View>
                  ) : null} */}

              <ErrorMessage errorValue={touched.email && errors.email} />
              <Text style={styles.TextFooter}>Mobile No</Text>
              {/* <FormInput
                
                name="password"
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="Enter password"
                secureTextEntry
                iconName="lock"
                iconColor="#2C384A"
                onBlur={handleBlur('password')}
              /> */}
              <View style={styles.Action}>
                <FontAwesome name="lock" color="#05375a" size={20} />
                <TextInput
                  secureTextEntry={secureTextEntry}
                  placeholder="Enter your Mobile No"
                  style={styles.TextInput}
                  onChangeText={handleChange('password')}
                />
                <TouchableOpacity
                  onPress={() => setsecureTextEntry(!secureTextEntry)}>
                  {secureTextEntry ? (
                    <Feather name="eye-off" color="gray" size={20} />
                  ) : (
                    <Feather name="eye" color="gray" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              <ErrorMessage errorValue={touched.password && errors.password} />
              <View style={styles.Button1}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    ...styles.signIn,
                    borderColor: '#4dc2f8',
                    borderWidth: 1,
                    // marginTop: 15,
                  }}>
                  <Text style={{ ...styles.TextSign, color: '#4dc2f8' }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </Fragment>
          )}
        </Formik>

        <View style={styles.Button1}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignupSplash')}
            style={{
              ...styles.signIn,
              borderColor: '#4dc2f8',
              borderWidth: 1,
              // marginTop: 15,
            }}>
            <Text style={{ ...styles.TextSign, color: '#4dc2f8' }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#05375a',
  },
  footer: {
    flex: 2,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  logo: {
    // width:heightlogo,
    // height:heightlogo,
    alignSelf: 'center',
    marginTop: '40%',
  },
  Button1: {
    alignItems: 'center',
    marginVertical: 20,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  TextSign: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  Text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  TextFooter: {
    color: '#05375a',
    fontSize: 18,
  },
  TextInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
  },
  Action: {
    marginTop: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
});
