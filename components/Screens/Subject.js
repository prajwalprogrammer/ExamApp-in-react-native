import React, { useEffect, useState } from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from "react-native";
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
import { LinearGradient } from "expo-linear-gradient";
import Spinner from "react-native-loading-spinner-overlay";

import { Avatar, colors, Text } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Cards from "./Cards";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import SubjectCard from "./SubjectCard";
import { getSubject } from "../Url";
const height = Dimensions.get("screen").height;

export const Subject = ({ route, navigation }) => {
  //const {ClassId}=route.params;
  const [Spin, setSpin] = useState(true)
  const [SubList, setSubList] = useState([]);
  useEffect(() => {
    const message = navigation.getParam("ClassId");
    // alert(message)
    const fetchAPI = async () => {
      setSubList(await getSubject(message));
    };
    fetchAPI();
  }, []);
  var Ire = [];
  for (let i = 0; i < 8; i++) {
    Ire.push(
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Points")}
        key={i}
      >
        <Cards name="Subject" mr={20} img={require("../../assets/out.png")} />
      </TouchableWithoutFeedback>
    );
  }
  return (
    <View style={{}}>
      <StatusBar style="light" />
      <Header style={{ height: 80 }}>
        <Left>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-circle" size={40} color="white" />
          </TouchableWithoutFeedback>
        </Left>
        <Body>
          <Text h3 h3Style={{ color: "white" }}>
            {" "}
            Select Subject
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
          <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
            <View
              style={{
                marginVertical: 10,
                marginBottom: 15,
                width: "100%",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {SubList ? (
                SubList.map((SUB) => {
                  return (
                    <TouchableWithoutFeedback
                      onPress={() =>
                        navigation.navigate("Points", {
                          SubId: SUB.subid,
                        })
                      }
                      key={SUB.subid}
                    >
                      <Cards
                        name={SUB.Subject}
                        mr={20}
                        img={require("../../assets/out.png")}
                      />
                    </TouchableWithoutFeedback>
                  );
                })
              ):(
                <Spinner
                  visible={Spin}
                  textContent={"Loading..."}
                  textStyle={styles.spinnerTextStyle}
                />
              ) }
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </View>
  );
};
export default Subject;
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
  background: {
    position: "relative",
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    //backgroundColor: 'transparent',
    fontSize: 15,
    color: "#fff",
  },
});
