import React, { useState, useContext, useEffect } from "react";
import { View, StatusBar, SafeAreaView, Image, Button } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import {
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
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
  // console.log(user[0])
  const [PrintedData, setPrintedData] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [Visible, setVisible] = useState(false);
  useEffect(() => {
    async function GetAsync() {
      const myArray = await AsyncStorage.getItem("@MySuperStore:key");
      console.log("myarray" + JSON.parse(myArray));
      setPrintedData(JSON.parse(myArray));
      console.log(PrintedData);
    }
    GetAsync();
  }, []);
  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Auth");
  };
  return (
    <View style={{}}>
      <StatusBar hidden={false} barStyle="light-content" />
      <Header style={{ height: 80 }}>
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
            size="small"
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
          <Cards name="Subject" mr={20} img={require("../../assets/out.png")} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Cards name="Exam" mr={20} img={require("../../assets/out.png")} />
        </TouchableWithoutFeedback>
      </View>
      <View style={{ width: "100%" }}>
        <Image
          source={require("../../assets/operand-removebg.png")}
          resizeMode="contain"
          style={{width:'100%'}}
        />
      </View>
    </View>
  );
};
export default DashBoard;
