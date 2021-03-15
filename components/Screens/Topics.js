import * as React from "react";
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
import { TabView, SceneMap } from "react-native-tab-view";

import { Avatar, colors,Text } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import SubjectCard from "./SubjectCard";
import Des from "./Des";
import Video from "./Video";
import Exam from './Exam'
const height = Dimensions.get("screen").height;

const initialLayout = { width: Dimensions.get("window").width };
export const Topics = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Des" },
    { key: "second", title: "Video" },
    {key:"third",title:"Exam"}
  ]);

  const renderScene = SceneMap({
    first: Des,
    second: Video,
    third: Exam
  });

  return (
    <View style={{}}>
      <StatusBar style="light" />
      <Header style={{ marginVertical: 10 }}>
        <Left>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-circle" size={40} color="white" />
          </TouchableWithoutFeedback>
        </Left>
        <Body>
          <Text h3 h3Style={{ color: "white" }}>
            Tutorial
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
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            style={styles.container}
          />
        </LinearGradient>
      </View>
    </View>
  );
};
export default Topics;
const styles = StyleSheet.create({
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
  container: {
    //marginTop: StatusBar.currentHeight,
    backgroundColor:'white'
  },
  scene: {
    flex: 1,
  },
});
