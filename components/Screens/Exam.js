import React, { Component } from "react";
import Quiz from "./PlayLog";
import { StyleSheet, StatusBar, TouchableOpacity, View,Dimensions } from "react-native";
import { Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("window");

export default class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizFinish: false,
      score: 0,
    };
  }
  _onPressBack() {
    const { goBack } = this.props.navigation;
    goBack();
  }
  _quizFinish(score) {
    this.setState({ quizFinish: true, score: score });
  }
  _scoreMessage(score) {
    if (score <= 30) {
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
  }
  render() {
    return (
      <View style={{flex:1, backgroundColor: "#bdbdbd" }}>
        <StatusBar barStyle="light-content" />
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={() => this._onPressBack()}>
            <Text style={styles.toolbarButton}>
              {" "}
              <Ionicons name="chevron-back-circle" size={40} color="white" />
            </Text>
          </TouchableOpacity>
          <Text h3 style={styles.toolbarTitle}>
            Mcq Exam
          </Text>
          <Text h5 style={styles.toolbarButton}></Text>
        </View>
        <LinearGradient
          // Background Linear Gradient
          colors={["#12217A","#3246BF", "#566DF7", "transparent"]}
          // colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.background}
        >
          {this.state.quizFinish ? (
            <View style={styles.container}>
              <View style={styles.circle}>
                {this._scoreMessage(this.state.score)}
              </View>
            </View>
          ) : (
            <Quiz quizFinish={(score) => this._quizFinish(score)} />
          )}
        </LinearGradient>
      </View>
    );
  }
}
const scoreCircleSize = 300;
const styles = StyleSheet.create({
  score: {
    color: "white",
    fontSize: 20,
    fontStyle: "italic",
  },background: {
    position: "relative",
    left: 0,
    right: 0,
    top: 0,
    height: height,
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  toolbar: {
    backgroundColor: "#3246BF",
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: "row",
  },
  toolbarButton: {
    width: 55,
    color: "#fff",
    textAlign: "center",
  },
  toolbarTitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    flex: 1,
  },
});
