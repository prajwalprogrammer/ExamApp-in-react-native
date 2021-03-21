import React,{useEffect,useState} from "react";
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
import {  TabView,
  TabBar,
  SceneMap,
  NavigationState,
  SceneRendererProps } from "react-native-tab-view";

import { Avatar, colors,Text } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import SubjectCard from "./SubjectCard";
import Des from "./Des";
import Video1 from "./Video";
import Exam from './Exam'
import Data1 from "./PlayLog";
import {GetMcq } from '../Url';
const height = Dimensions.get("screen").height;

const initialLayout = { width: Dimensions.get("window").width };
export const Topics = ({ route,navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Des" },
    { key: "second", title: "Video" },
    {key:"third",title:"Exam"}
  ]);
  const [McqList, setMcqList] = useState()
  useEffect(() => {
    const message = navigation.getParam('TopicId');
  // alert(message)
    const fetchAPI = async () => {
      setMcqList(await GetMcq(message))
     // console.log("McqList"+McqList)
    };
    fetchAPI();
    
  }, [])
  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }}>
     {McqList?<Data1 McQList={McqList} />:null}
      </View>

  );
  const renderScene = SceneMap({
    first: Des,
    second: Video1,
    third: FirstRoute
  });
  
  
  return (
    <View style={{}}>
      <StatusBar style="light" />
      <Header style={{ height: 80,borderWidth:0 }}>
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
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={props => <TabBar {...props} style={{backgroundColor: '#12217A'}}/>}
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
    flex:1,
    backgroundColor:'white',
   // marginBottom:"30%"
  },
  scene: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#3f51b5',
  },
  tab: {
    width: 120,
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
  label: {
    fontWeight: '400',
  },
});
