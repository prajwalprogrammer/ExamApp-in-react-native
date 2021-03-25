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
import {
  TabView,
  TabBar,
  SceneMap,
  NavigationState,
  SceneRendererProps,
} from "react-native-tab-view";

import { Avatar, colors, Text } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import SubjectCard from "./SubjectCard";
import Des from "./Des";
import Video1 from "./Video";
import Exam from "./Exam";
import Data1 from "./PlayLog";
import { GetMcq, getVideo } from "../Url";
import Icon from "react-native-vector-icons/FontAwesome";
import Audio1 from "./Audio";

const height = Dimensions.get("screen").height;

const initialLayout = { width: Dimensions.get("window").width };
export const Topics = ({ route, navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Des" },
    { key: "second", title: "Video" },
    { key: "third", title: "Exam" },
    { key: "four", title: "Audio" },
  ]);
  const [McqList, setMcqList] = useState();
  const [quizFinish, setQuizFinish] = useState(false);
  const [score, setScore] = useState(0);
  const [Data, setData] = useState();
  useEffect(() => {
    const message = navigation.getParam("TopicId");
    // alert(message)
    const fetchAPI = async () => {
      setMcqList(await GetMcq(message));
      setData(await getVideo(message));
      // console.log("McqList"+McqList)
    };
    fetchAPI();
  }, []);

  const ScoreMessage = (score) => {
    // alert("hii")
    if (score > 30) {
      return (
        <View style={styles.innerContainer}>
          <View style={{ flexDirection: "row" }}>
            <Icon name="trophy" size={30} color="white" />
          </View>
          <Text style={styles.score}>You need to work hard</Text>
          <Text style={styles.score}>You scored {score}%</Text>
        </View>
      );
    } else if (score > 30 && score < 60) {
      return (
        <View style={styles.innerContainer}>
          <View style={{ flexDirection: "row" }}>
            <Icon name="trophy" size={30} color="white" />
            <Icon name="trophy" size={30} color="white" />
          </View>
          <Text style={styles.score}>You are good</Text>
          <Text style={styles.score}>Congrats you scored {score}% </Text>
        </View>
      );
    } else if (score >= 60) {
      return (
        <View style={styles.innerContainer}>
          <View style={{ flexDirection: "row" }}>
            <Icon name="trophy" size={30} color="white" />
            <Icon name="trophy" size={30} color="white" />
            <Icon name="trophy" size={30} color="white" />
          </View>
          <Text style={styles.score}>You are the master</Text>
          <Text style={styles.score}>Congrats you scored {score}% </Text>
        </View>
      );
    }
  };

  const quizfinish = (score) => {
    setQuizFinish(true);
    setScore(score);
    console.log(score);
    // this.setState({ quizFinish: true, score: score });
  };

  // const ThirdRoute = () => (
  //   <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
  //     {/* {McqList?<Data1 McQList={McqList} />:null} */}
  //     {quizFinish ? (
  //       <View style={{ alignSelf: "center", marginTop: "40%" }}>
  //         <View style={styles.circle}>{ScoreMessage(score)}</View>
  //       </View>
  //     ) : // <Quiz quizFinish={(score) => this._quizFinish(score)} />
  //     McqList ? (
  //       <Data1 McQList={McqList} quizFinish={(score) => quizfinish(score)} />
  //     ) : null}
  //   </View>
  // );
  // const FirstRoute = () => (Data ? <Des Link={Data[0].lesswisedesc} /> : null);
  // const SecondRoute = () =>
    // Data ? <Video1 Link={JSON.stringify(Data[0].lesswisevideo)} /> : null;
  // const renderScene = SceneMap({
  //   first: FirstRoute,
  //   second: SecondRoute,
  //   third: ThirdRoute,
  //   four: Audio1,
  // });
  const _renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return Data ? <Des Link={Data[0].lesswisedesc} /> : null;
      case "second":
        return Data ? (
          <Video1 Link={JSON.stringify(Data[0].lesswisevideo)} />
        ) : null;
      case "third":
        return (
          <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
            {/* {McqList?<Data1 McQList={McqList} />:null} */}
            {quizFinish ? (
              <View style={{ alignSelf: "center", marginTop: "40%" }}>
                <View style={styles.circle}>{ScoreMessage(score)}</View>
              </View>
            ) : // <Quiz quizFinish={(score) => this._quizFinish(score)} />
            McqList ? (
              <Data1
                McQList={McqList}
                quizFinish={(score) => quizfinish(score)}
              />
            ) : null}
          </View>
        );
      case "four":
        return Data?<Audio1 Link={Data[0].lesswiseaudio} />:null
      default:
        return null;
    }
  };
  return (
    <View style={{}}>
      <StatusBar barStyle='dark-content' />
      <Header style={{ height: 80, borderWidth: 0,backgroundColor:'#336699' }}androidStatusBarColor="#336699">
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
            lazy
            sceneContainerStyle={styles.container}
            navigationState={{ index, routes }}
            renderScene={_renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={(props) => (
              <TabBar {...props} style={{ backgroundColor: "#336699" }} />
            )}
          />
        </LinearGradient>
      </View>
    </View>
  );
};
export default Topics;
const scoreCircleSize = 300;

const styles = StyleSheet.create({
  score: {
    color: "white",
    fontSize: 20,
    fontStyle: "italic",
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    width: scoreCircleSize,
    height: scoreCircleSize,
    borderRadius: scoreCircleSize / 2,
    backgroundColor: "green",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  container: {
    //marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "white",
    // marginBottom:"30%"
  },
  scene: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: "#3f51b5",
  },
  tab: {
    width: 120,
  },
  indicator: {
    backgroundColor: "#ffeb3b",
  },
  label: {
    fontWeight: "400",
  },
});
