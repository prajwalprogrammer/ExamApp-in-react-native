import axios from 'axios';
import { AsyncStorage } from 'react-native';
export const Login1 = async (Email, Password, navigation) => {
  alert(Email + Password);
  //alert('fg');
  var obj = { email: Email, mobile: Password };

  await axios
    .post(
      'http://operandtechnologies.com/ReactWebApi/ExamDemo/login.php',
      JSON.stringify(obj)
      // email: Email,
      // mobile: Password,
      // email: 'value@gmail.com',
      // mobile: '902115565',
    )
    .then(async (response) => {
      alert('fg');

      //alert(response.data);
      if (response.data === 'Data Matched') {
        await AsyncStorage.setItem('userToken', 'abc');
        navigation.navigate('App');
      } else {
        alert('Invalid Email or Mobile no.');
      }
      return response.data;
    })
    .catch((err) => alert('hgh' + err));
};
export const Register = async (name, email, mobile, gender, navigation) => {
  var obj = {
    name: name,
    mobile: mobile,
    email: email,
    gender: gender,
  };
  await axios
    .post(
      'http://operandtechnologies.com/ReactWebApi/ExamDemo/user_registration.php',
      JSON.stringify(obj)

      // name: 'value',
      // mobile: '902115565',
      // email: 'value@gmail.com',
      // gender: 'M',
    )
    .then(async (response) => {
      alert(response.data);
      await AsyncStorage.setItem('userToken', 'abc');
      navigation.navigate('App');
      return response.data;
    })
    .catch((err) => alert(err));
};

// email: 'value@gmail.com',
// mobile: '902115565',
