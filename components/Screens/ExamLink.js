import React, { useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Linking,
  TouchableWithoutFeedback,
} from "react-native";
const height = Dimensions.get("screen").height;
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-elements";
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
import { Ionicons } from "@expo/vector-icons";

const ExamLink = ({navigation}) => {
  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <Button
        //type="outline"
        type="clear"
        title={children}
        titleStyle={{
          fontWeight: "bold",
          fontSize: 19,
          color: "#6e4a75",
          paddingLeft: 10,
        }}
        containerStyle={{
          borderRadius: 20,
          borderColor: "red",
          backgroundColor: "#b6d3cc",
          marginHorizontal: 15,
          marginTop: 30,
          width: "80%",
          alignSelf: "center",
        }}
        onPress={handlePress}
      />
    );
  };
  return (
    <>
      <Header
        style={{ height: 80, backgroundColor: "#336699" }}
        androidStatusBarColor="#336699"
      >
        <Left>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-circle" size={40} color="white" />
          </TouchableWithoutFeedback>
        </Left>
        <Body>
          <Text style={{ color: "white", fontSize: 30,fontWeight:'bold'}}>Exam</Text>
        </Body>
      </Header>
      <LinearGradient
        // Background Linear Gradient
        colors={["#3973ac", "#4080bf", "#538cc6", "transparent"]}
        // colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={styles.background}
      >
        {/* <Button style={{marginTop:30,width:"80%" }} full rounded><Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Test 1</Text></Button>
    <Button style={{marginTop:30,width:"80%" }} full rounded><Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Test 2</Text></Button> */}
        <OpenURLButton url={"https://forms.gle/Whyc1Jbr27arXy5p8"}>
          Test 1
        </OpenURLButton>
        <OpenURLButton url={"https://forms.gle/eTG8BJdpeiK1tGJ59"}>
          Test 2
        </OpenURLButton>
      </LinearGradient>
    </>
  );
};

export default ExamLink;

const styles = StyleSheet.create({
  background: {
    position: "relative",
    left: 0,
    right: 0,
    top: 0,
    height: height,
    justifyContent: 'flex-start',
  },
});
