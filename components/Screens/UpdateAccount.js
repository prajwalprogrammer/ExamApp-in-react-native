import React, { useEffect, useState, Fragment } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar } from "react-native-paper";
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Picker } from "@react-native-picker/picker";

import ErrorMessage from "../AuthScreen/ErrorFormik";
import {
  List,
  ListItem,
  Container,
  Content,
  Header,
  Title,
  Body,
  Left,
  Right,
} from "native-base";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
const height = Dimensions.get("screen").height;

import { Text } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-community/async-storage";

import { UpdateUser } from "../Url";
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label("Name")
    .required()
    .min(2, "Must have at least 2 characters"),
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),

  Class: Yup.string().required("Select A class"),
});
const UpdateAccount = ({ route, navigation }) => {
  const [User, setUser] = useState();
  const message = navigation.getParam("UserData");
  // useEffect(() => {
  //    message = navigation.getParam('UserData');
  //   setUser(message)
  console.log(message[0]);
  // }, [])
  const handleSubmit = async (values) => {
    if (values.email.length > 0 && values.name.length > 0) {
      alert(values.Class + values.email + values.name);
      UpdateUser(
        message[0].id,
        values.name,
        values.email,
        message[0].mobile,
        values.Class
      )
      .then(
        async (res) => {
         // await setUser(res);
          await AsyncStorage.setItem(
            "@MySuperStore:key",
            JSON.stringify(res)
          )})
    }
  };
  return (
    <View>
      <StatusBar style="light" />
      <Header style={{  height: 80  }}>
        <Left>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-circle" size={40} color="white" />
          </TouchableWithoutFeedback>
        </Left>
        <Body>
          <Text h3 h3Style={{ color: "white" }}>
            Update Profile
          </Text>
        </Body>
      </Header>
      <View style={{ flex: 1 }}>
        <LinearGradient
          // Background Linear Gradient
          colors={["#12217A", "#3246BF", "#566DF7", "transparent"]}
          // colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.background}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            <Avatar.Image
              size={120}
              source={require("../../assets/UserMale.png")}
            />
            <Text style={{ color: "white", fontSize: 20 }}>
              {message[0].name}
            </Text>
          </View>
          <KeyboardAvoidingView
            style={{
              flex: 4,
              marginVertical: 10,
              marginBottom: 15,
              width: "100%",
              paddingHorizontal: "10%",
            }}
            behavior="padding"
          >
            <Formik
              initialValues={{
                name: message[0].name,
                email: message[0].email,

                Class: message[0].classid,
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
                      color="white"
                      size={20}
                      style={{ marginTop: 12 }}
                    />
                    <TextInput
                      autoCompleteType="name"
                      onBlur={handleBlur("name")}
                      placeholder="Enter Name"
                      placeholderTextColor="#eee"
                      style={styles.TextInput}
                      //name={name}
                      value={values.name}
                      onChangeText={handleChange("name")}
                      // onChange={(value) => setEmail(value)}
                    />
                  </View>
                  <ErrorMessage errorValue={touched.name && errors.name} />

                  <Text style={{ ...styles.TextFooter, marginTop: 15 }}>
                    Email
                  </Text>
                  <View style={styles.Action}>
                    <FontAwesome
                      name="envelope-o"
                      color="white"
                      size={20}
                      style={{ marginTop: 12 }}
                    />
                    <TextInput
                      autoCompleteType="email"
                      onBlur={handleBlur("email")}
                      placeholder="Enter E-mail"
                      placeholderTextColor="#eee"
                      style={styles.TextInput}
                      autoCapitalize="none"
                      //name={name}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      // onChange={(value) => setEmail(value)}
                    />
                  </View>
                  <ErrorMessage errorValue={touched.email && errors.email} />

                  <Text style={{ ...styles.TextFooter, marginTop: 15 }}>
                    Mobile No.
                  </Text>
                  <View style={styles.Action}>
                    <FontAwesome name="phone" color="white" size={20} />
                    <TextInput
                      value={JSON.stringify(message[0].mobile)}
                      placeholder="Enter your Mobile No."
                      placeholderTextColor="#eee"
                      editable={false}
                      style={styles.TextInput}
                      // onChangeText={handleChange("password")}
                      //onBlur={handleBlur("password")}
                    />
                  </View>

                  <Text style={{ ...styles.TextFooter, marginTop: 15 }}>
                    Class
                  </Text>
                  <View style={styles.Action}>
                    <FontAwesome name="phone" color="white" size={20} />

                    <Picker
                      style={{
                        color: "white",
                        height: 40,
                        width: "100%",
                        borderColor: "red",
                        fontWeight:'bold',
                      
                      }}
                      mode="dropdown"
                      //prompt={"Select language"}
                      itemStyle={{ backgroundColor: "red", borderColor: "red" }}
                      selectedValue={Number(values.Class)}
                      dropdownIconColor="white"
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
                  </View>
                  {/* <ErrorMessage
                    errorValue={touched.Class && errors.Class}
                  /> */}

                  <View style={styles.Button1}>
                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={{
                        ...styles.signIn,
                        borderColor: "#4dc2f8",
                        borderWidth: 1,
                        // marginTop: 15,
                        backgroundColor:'#4dc2f8'

                      }}
                    >
                      <Text style={{ ...styles.TextSign, color: "#ffffff" }}>
                        Update Profile
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Fragment>
              )}
            </Formik>
            <View style={styles.Button1}>
              <TouchableOpacity
              onPress={()=>navigation.goBack()}
                style={{
                  ...styles.signIn,
                  borderColor: "#4dc2f8",
                  borderWidth: 1,
                  // marginTop: 15,
                  backgroundColor:'#4dc2f8'
                }}
              >
                <Text style={{ ...styles.TextSign, color: "#ffffff" }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>

        {/* <View style={{flex:3}}>

        </View>
        <View style={styles.footer}>

        <View style={styles.Action}>
          <FontAwesome name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Enter your Mobile No"
            style={styles.TextInput}
            // onChangeText={handleChange("password")}
            />
            </View>
        </View> */}
      </View>
    </View>
  );
};

export default UpdateAccount;

const styles = StyleSheet.create({
  signIn: {
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  TextSign: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  Button1: {
    alignItems: "center",
    marginVertical: 10,
  },
  footer: {
    flex: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "black",
  },
  background: {
    position: "relative",
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  TextFooter: {
    color: "white",
    fontSize: 15,
  },
  TextInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  Action: {
    marginTop: 15,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
});
