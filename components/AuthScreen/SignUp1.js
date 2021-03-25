import React, { useState, useContext, Fragment } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { TextInput } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as Yup from "yup";
import { Register,RegisterUser } from "../Url";
import FormButton from "./ButtonFormik";
import ErrorMessage from "./ErrorFormik";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-community/async-storage";
import DropDownPicker from "react-native-dropdown-picker";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label("Name")
    .required()
    .min(2, "Must have at least 2 characters"),
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(10, "mobile No must contain 10 numbers "),
  confirmPassword: Yup.string()
    .max(1, "Too Long!")

    // .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
    .required("Confirm Password is required"),
  Class: Yup.string().required("Select A class"),
});
const SignUp = ({ navigation }) => {
  let controller;
  const [Email, setEmail] = useState("fhg");
  const [Password, setPassword] = useState("");
  const [Password1, setPassword1] = useState("");
  const [InputChange, setInputChange] = useState(false);
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [secureTextEntry1, setsecureTextEntry1] = useState(true);
  const [country, setCountry] = useState("Uk");
  const [value, setValue] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState();

  const TextChange = (value) => {
    if (value.length !== 0) {
      setEmail(value);
      setInputChange(true);
    } else {
      setInputChange(false);
    }
  };
  // const Submit = async () => {
  //   console.log('object');
  //   Register(Email, Password);
  //   await AsyncStorage.setItem('isLoggedIn', '1');
  //   navigation.navigate('App');
  // };
  const handleSubmit = async (values) => {
    if (
      values.email.length > 0 &&
      values.password.length > 0 &&
      values.name.length > 0 &&
      values.confirmPassword.length > 0
    ) {
      // alert(values.Class)
// alert("Unable To SignUp")
      await RegisterUser(
        values.name,
        values.email,
        values.password,
        values.confirmPassword,
        navigation
      );
            // await RegisterUser(values.email, values.password, navigation)
            //.then(
            //   async (res) => {
            //     //await setUser(res);
            //     await AsyncStorage.setItem("@MySuperStore:key", JSON.stringify(res));

            //     await AsyncStorage.setItem("userToken", "abc");
            //     navigation.navigate("App");
            //   }
            // );
      // await AsyncStorage.setItem('isLoggedIn', '1');
      //  navigation.navigate('App');
      // this.props.navigation.navigate('App')
      //  alert('Sucessfull');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.Text}>Welcome Here</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            Class: "",
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          validationSchema={validationSchema}
        >
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
              <Text style={styles.TextFooter}>Name</Text>
              <View style={styles.Action}>
                <FontAwesome
                  name="user-o"
                  color="#05375a"
                  size={20}
                  style={{ marginTop: 12 }}
                />
                <TextInput
                  autoCompleteType="name"
                  onBlur={handleBlur("name")}
                  placeholder="Enter Name"
                  style={styles.TextInput}
                  //name={name}
                  value={values.name}
                  onChangeText={handleChange("name")}

                  // onChange={(value) => setEmail(value)}
                />
              </View>
              <ErrorMessage errorValue={touched.name && errors.name} />
              <Text style={styles.TextFooter}>Email</Text>
              <View style={styles.Action}>
                <FontAwesome
                  name="envelope-o"
                  color="#05375a"
                  size={20}
                  style={{ marginTop: 12 }}
                />
                <TextInput
                  autoCompleteType="email"
                  onBlur={handleBlur("email")}
                  placeholder="Enter E-mail"
                  style={styles.TextInput}
                  autoCapitalize="none"
                  //name={name}
                  value={values.email}
                  onChangeText={handleChange("email")}

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
              <ErrorMessage errorValue={touched.email && errors.email} />
              <Text style={{ ...styles.TextFooter, marginTop: 15 }}>
                Mobile No.
              </Text>
              <View style={styles.Action}>
                <FontAwesome name="phone" color="#05375a" size={20} />
                <TextInput
                  value={values.password}
                  secureTextEntry={secureTextEntry}
                  placeholder="your Mobile No."
                  style={styles.TextInput}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
                <TouchableOpacity
                  onPress={() => setsecureTextEntry(!secureTextEntry)}
                >
                  {secureTextEntry ? (
                    <Feather name="eye-off" color="gray" size={20} />
                  ) : (
                    <Feather name="eye" color="gray" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              <ErrorMessage errorValue={touched.password && errors.password} />
              {/* <FormInput
                name='password'
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                placeholder='Confirm password'
                secureTextEntry
                iconName='lock'
                iconColor='#2C384A'
                onBlur={handleBlur('confirmPassword')}
              /> */}
              <Text style={{ ...styles.TextFooter }}>Class</Text>

              <Picker
                style={{ height: 40, width: "100%",borderColor:'red'}}
                mode="dropdown"
                //prompt={"Select language"}
                itemStyle={{ backgroundColor: "red" ,borderColor:'red'}}
                selectedValue={Number(values.Class)}
                dropdownIconColor="black"
                // onValueChange={(itemValue)=>('Class', itemValue)}
                //  onValueChange={e => {
                //   Formik.setFieldValue("Class", e);
                // }}
                onValueChange={(...args) =>
                  handleChange("Class")(String(args[1]))
                }
              >
                <Picker.Item label="First Year" value={0} key={0} />
                <Picker.Item label="Second Year" value={1} key={1} />
                <Picker.Item label="Third Year" value={2} key={2} />
              </Picker>
              <ErrorMessage errorValue={touched.Class && errors.Class} />

              {/* <DropDownPicker
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                items={[
                  {
                    label: "First Year",
                    value: "Fy",
                  },
                  {
                    label: "Second Year",
                    value: "Sy",
                  },
                ]}
                containerStyle={{ height: 40, marginTop: 10 }}
                controller={(instance) => (controller = instance)}
                onChangeList={(items, callback) => {
                  new Promise((resolve, reject) => resolve(setCountry(items)))
                    .then(() => callback())
                    .catch(() => {});
                }}
                defaultValue={value}
                onChangeItem={(item) => setValue(item.value)}
              /> */}
              <Text style={{ ...styles.TextFooter, marginTop: 15 }}>
                Gender
              </Text>
              <KeyboardAvoidingView style={styles.Action}>
                <FontAwesome name="user-o" color="#05375a" size={20} />
                <TextInput
                  value={values.confirmPassword}
                  //secureTextEntry={secureTextEntry1}
                  placeholder="Gender (M/F)"
                  style={styles.TextInput}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                />
                <TouchableOpacity
                  onPress={() => setsecureTextEntry1(!secureTextEntry1)}
                ></TouchableOpacity>
              </KeyboardAvoidingView>
              <ErrorMessage
                errorValue={touched.confirmPassword && errors.confirmPassword}
              />
              <View style={styles.Button1}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    ...styles.signIn,
                    borderColor: "#4dc2f8",
                    borderWidth: 1,
                    // marginTop: 15,
                  }}
                >
                  <Text style={{ ...styles.TextSign, color: "#4dc2f8" }}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </Fragment>
          )}
        </Formik>
        {/* <DropDownPicker
          items={[
            {
              label: "USA",
              value: "usa",
            },
            {
              label: "UK",
              value: "uk",
            },
            {
              label: "France",
              value: "france",
            },
          ]}
          defaultValue={country}
          containerStyle={{ height: 40 }}
          style={{ backgroundColor: "#fafafa" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => setCountry(item.value)}
        /> */}
        {/* <DropDownPicker
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          items={[
            {
              label: "First Year",
              value: "Fy",
            },
            {
              label: "Second Year",
              value: "Sy",
            },
          ]}
          containerStyle={{ height: 40 }}
          controller={(instance) => (controller = instance)}
          onChangeList={(items, callback) => {
            new Promise((resolve, reject) => resolve(setCountry(items)))
              .then(() => callback())
              .catch(() => {});
          }}
          defaultValue={value}
          onChangeItem={(item) => setValue(item.value)}
        /> */}
        <View style={styles.Button1}>
          <TouchableOpacity
            onPress={() => navigation.navigate("LoginScreen")}
            style={{
              ...styles.signIn,
              borderColor: "#4dc2f8",
              borderWidth: 1,
              // marginTop: 15,
            }}
          >
            <Text style={{ ...styles.TextSign, color: "#4dc2f8" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#05375a",
  },
  Clr_TextPrivate: {
    color: "gray",
  },
  footer: {
    flex: 6,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  Button1: {
    alignItems: "center",
    marginTop: 20,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  Textprivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  TextSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  Text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
  TextFooter: {
    color: "#05375a",
    fontSize: 18,
  },
  TextInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
  },
  Action: {
    marginTop: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
});
