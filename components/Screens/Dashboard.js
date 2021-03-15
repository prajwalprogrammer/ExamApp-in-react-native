import React, { useState } from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  AsyncStorage,
  Image,
} from "react-native";
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
export const DashBoard = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Auth");
  };
  return (
    <View style={{}}>
      <StatusBar hidden={false} barStyle='light-content' />
      <Header>
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
            onPress={() => setModalVisible(!isModalVisible)}
            rounded
            title="P"
            size="small"
            titleStyle={{ color: "#eee" }}
            containerStyle={{
              backgroundColor: "#05375a",
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

      <View
        style={{
          marginVertical: 10,
          marginBottom: 15,
          width: "100%",
          flexDirection: "row",
          flexWrap:'wrap'
        }}
      >
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Subject')}>
          <Cards
            name="Subject"
            mr={20}
            img={require("../../assets/out.png")}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Exam')}>
          <Cards
            name="Exam"
            mr={20}
            img={require("../../assets/out.png")}
          />
        </TouchableWithoutFeedback>
        
      </View>
    </View>
  );
};
export default DashBoard;