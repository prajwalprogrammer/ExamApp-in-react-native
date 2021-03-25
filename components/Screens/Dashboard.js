import React, { useState, useContext, useEffect } from "react";
import { View, StatusBar, SafeAreaView, Image, Button ,StyleSheet,Dimensions} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import { LinearGradient } from "expo-linear-gradient";

import {
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
const height = Dimensions.get("screen").height;

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
import { Avatar, colors, Text } from "react-native-elements";
import AwesomeAlert from "react-native-awesome-alerts";

import Cards from "./Cards";
import { AuthContext } from "../Navigation/AuthProvider";
export const DashBoard = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);
  console.log("user" + user[0]);
  const [PrintedData, setPrintedData] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [Visible, setVisible] = useState(false);
  useEffect(() => {
    async function GetAsync() {
      const myArray = await AsyncStorage.getItem("@MySuperStore:key");
      console.log("myarray" + JSON.parse(myArray));
      setPrintedData(JSON.parse(myArray));
      console.log(PrintedData);
      console.log("object" + user);
    }
    GetAsync();
  }, []);
  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Auth");
  };
  return (
    <View style={{}}>
      <StatusBar
        hidden={false}
        barStyle={"dark-content"}
        style={{ backgroundColor: "#336699" }}
      />
      <Header style={{ height: 80, backgroundColor: "#336699" }} androidStatusBarColor="#336699">
        <Left>
          <Image source={require("../../assets/out.png")} />
        </Left>
        <Body>
          <Text h3 h3Style={{ color: "white" }}>
            {" "}
            Dashboard
          </Text>
        </Body>
        <Right>
          <Avatar
            // onPress={() => setModalVisible(!isModalVisible)}
            onPress={() => setVisible(!Visible)}
            rounded
            title={
              PrintedData != null
                ? PrintedData[0].name.charAt(0).toUpperCase()
                : " "
            }
            size="medium"
            titleStyle={{ color: "#eee" }}
            containerStyle={{
              backgroundColor: "red",
              marginRight: "4%",
              marginTop: "1%",
            }}
          />
        </Right>
        <AwesomeAlert
          show={isModalVisible}
          showProgress={false}
          title="LogOut?"
          titleStyle={{ fontSize: 30, fontWeight: "bold", color: "black" }}
          message=" want to logOut?"
          messageStyle={{ fontSize: 20, color: "gray" }}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelButtonStyle={{}}
          cancelText="No, cancel"
          cancelButtonColor="red"
          confirmText="LogOut"
          confirmButtonColor="#05375a"
          onCancelPressed={() => setModalVisible(!isModalVisible)}
          onConfirmPressed={() => logout()}
        />
      </Header>
      {Visible ? (
        <View
          style={{
            justifyContent: "flex-end",
            width: "30%",
            height: 70,
            alignSelf: "center",
            backgroundColor: "green",
            position: "absolute",
            //paddingRight:'30%'
            right: "15%",
            top: "3%",
            borderRadius: 12,
          }}
        >
          <Button
            title="Account"
            onPress={() =>
              navigation.navigate("Update", {
                UserData: PrintedData,
              })
            }
          />

          <Button
            title="Logout"
            color="red"
            onPress={() => setModalVisible(!isModalVisible)}
          />
        </View>
      ) : null}
      <View style={{flex:1}}>
      <LinearGradient
          // Background Linear Gradient
          colors={["#3973ac", "#4080bf", "#538cc6", "transparent"]}
          // colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.background}
        >
      <View
        style={{
          marginVertical: 10,
          marginBottom: 15,
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("Subject", {
              ClassId: PrintedData[0].classid,
            })
          }
        >
          <Cards name="Subject" mr={20} img={require("../../assets/Exam-Content-logo.png")} />
        </TouchableWithoutFeedback>
        {/* <TouchableWithoutFeedback>
          <Cards name="Exam" mr={20} img={require("../../assets/out.png")} />
        </TouchableWithoutFeedback> */}
      </View>
      </LinearGradient>
      </View>
      {/* <View style={{ width: "100%" }}>
        <Image
          source={require("../../assets/operand-removebg.png")}
          resizeMode="contain"
          style={{ width: "100%" }}
        />
      </View> */}
    </View>
  );
};
export default DashBoard;
const styles=StyleSheet.create({
  background: {
    position: "relative",
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
})