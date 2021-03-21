import React, { Component, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { BasicButton } from "@phomea/react-native-buttons";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import * as Animatable from "react-native-animatable";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Animbutton from "./Quiz";
import ScoreMessage from "./Exam";
const { width, height } = Dimensions.get("window");
let arrnew = [];
const jsonData = {
  quiz: {
    quiz1: {
      question1: {
        correctoption: "option3",
        options: {
          option1: "Java",
          option2: "PHP",
          option3: "Javascript",
          option4: "IOS",
        },
        question: "React is a ____ library",
      },
      question2: {
        correctoption: "option4",
        options: {
          option1: "XML",
          option2: "YML",
          option3: "HTML",
          option4: "JSX",
        },
        question: "____ tag syntax is used in React",
      },
      question3: {
        correctoption: "option1",
        options: {
          option1: "Single root DOM node",
          option2: "Double root DOM node",
          option3: "Multiple root DOM node",
          option4: "None of the above",
        },
        question: "Application built with just React usually have ____",
      },
      question4: {
        correctoption: "option2",
        options: {
          option1: "mutable",
          option2: "immutable",
          option3: "variable",
          option4: "none of the above",
        },
        question: "React elements are ____",
      },
      question5: {
        correctoption: "option3",
        options: {
          option1: "functions",
          option2: "array",
          option3: "components",
          option4: "json data",
        },
        question:
          "React allows to split UI into independent and reusable pieses of ____",
      },
    },
  },
};
class Quiz extends Component {
  constructor(props) {
    super(props);
    this.qno = 0;
    this.score = 0;

    const jdata = jsonData.quiz.quiz1;
    arrnew = Object.keys(jdata).map(function (k) {
      return jdata[k];
    });
    this.state = {
      question: arrnew[this.qno].question,
      options: arrnew[this.qno].options,
      correctoption: arrnew[this.qno].correctoption,
      countCheck: 0,
    };
  }
  prev() {
    if (this.qno > 0) {
      this.qno--;
      this.setState({
        question: arrnew[this.qno].question,
        options: arrnew[this.qno].options,
        correctoption: arrnew[this.qno].correctoption,
      });
    }
  }
  next() {
    if (this.qno < arrnew.length - 1) {
      this.qno++;

      this.setState({
        countCheck: 0,
        question: arrnew[this.qno].question,
        options: arrnew[this.qno].options,
        correctoption: arrnew[this.qno].correctoption,
      });
    } else {
      this.props.quizFinish((this.score * 100) / 5);
    }
  }
  _answer(status, ans) {
    console.log(this.state.countCheck + status + ans);
    if (status == true) {
      const count = this.state.countCheck + 1;
      this.setState({ countCheck: count });
      if (ans == this.state.correctoption) {
        this.score += 1;
      }
    } else {
      const count = this.state.countCheck - 1;
      this.setState({ countCheck: count });
      if (this.state.countCheck < 1 || ans == this.state.correctoption) {
        this.score -= 1;
      }
    }
    setTimeout(() => this.next(), 1000);
  }
  render() {
    let _this = this;
    const currentOptions = this.state.options;
    const options = Object.keys(currentOptions).map(function (k) {
      return (
        <View key={k} style={{ margin: 10 }}>
          <Animbutton
            countCheck={_this.state.countCheck}
            onColor="#5C6AC0"
            effect={"tada"}
            _onPress={(status) => _this._answer(status, k)}
            text={currentOptions[k]}
          />
        </View>
      );
    });

    return (
      <View
        style={{
          height: height - 350,
          width: width - 40,
          backgroundColor: "#F5FCFF",
          paddingTop: 30,
          alignSelf: "center",
          justifyContent: "center",
          paddingVertical: "20%",
          marginTop: "30%",
          borderRadius: 20,
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.oval}>
              <Text style={styles.welcome}>{this.state.question}</Text>
            </View>
            <View>{options}</View>
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
                width: width,
              }}
            >

              <View>
                <TouchableOpacity onPress={() => this.prev()}>
                  <View
                    style={{
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingRight: 20,
                      paddingLeft: 20,
                      borderRadius: 10,
                      backgroundColor: "green",
                    }}
                  >
                    <AntDesign name="arrowleft" size={30} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={() => this.next()}>
                  <View
                    style={{
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingRight: 20,
                      paddingLeft: 20,
                      borderRadius: 10,
                      backgroundColor: "green",
                    }}
                  >
                    <AntDesign name="arrowright" size={30} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </View> */}
          </View>
        </View>
      </View>
    );
  }
}

export const Data = (props) => {
  // console.log("List"+JSON.stringify(props.McQList.Quiz1))
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [Bg, setBg] = useState(false);
  const [Tx, setTx] = useState(false);

  var da = Object.values(jsonData.quiz.quiz1);
  // var da1 = JSON.stringify(props.McQList.Quiz1);
  // console.log("Da1" + da1);
  var Op = da[currentQuestion].options;
  // var Op1 = da1[0].option;

  var correctAns = da[currentQuestion].correctoption;
  // var correctAns1 = da1[0].Correct;

  const handleAnswerOptionClick = (Correct, Selected) => {
    if (Correct === Selected) {
      setScore(score + 1);
    }
    var nextQuestion = currentQuestion + 1;
    if (nextQuestion < Object.keys(jsonData.quiz.quiz1).length) {
      setTimeout(() => setCurrentQuestion(nextQuestion), 1000);
    } else {
      setShowScore(true);
      props.quizFinish((score * 100) / 5);
    }
  };
  return (
    <View
      style={{
        height: height - 350,
        width: width - 40,
        backgroundColor: "#F5FCFF",
        paddingTop: 30,
        alignSelf: "center",
        justifyContent: "center",
        paddingVertical: "20%",
        marginTop: "30%",
        borderRadius: 20,
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.oval}>
            <Text style={styles.welcome}>{da[currentQuestion].question}</Text>
            {/* <Text style={styles.welcome}>{da1[0].Question}</Text> */}
          </View>
          <View>
            {Object.keys(da[currentQuestion].option).map(function (k) {
              return (
                // <TouchableWithoutFeedback
                //   onPress={() => handleAnswerOptionClick(correctAns, k)}
                // >
                //   <Animatable.View
                //     style={{
                //       margin: 10,
                //       paddingTop: 10,
                //       height: 40,
                //       width: "100%",
                //       alignSelf: "center",
                //       paddingBottom: 10,
                //       paddingRight: 20,
                //       paddingLeft: 20,
                //       backgroundColor: "#bdbdbd",
                //       borderRadius: 10,
                //     }}
                //   >
                //   <Text
                //       style={{
                //         color: "#696969",
                //         fontWeight: "bold",
                //         alignSelf: "center",
                //         fontSize: 20,
                //       }}
                //     >
                //       {Op[k]}
                //     </Text>
                <BasicButton
                  onPress={() => handleAnswerOptionClick(correctAns, k)}
                  title={Op[k]}
                  // title={Op1[k]}
                  color="black"
                  textStyle={{
                    color: Tx ? "#696969" : "black",
                    fontWeight: "bold",
                    alignSelf: "center",
                    fontSize: 20,
                  }}
                  buttonStyle={{
                    margin: 10,
                    paddingTop: 10,
                    width: width - 200,
                    alignSelf: "center",
                    paddingBottom: 10,
                    paddingRight: 20,
                    paddingLeft: 20,
                    backgroundColor: Bg ? "#bdbdbd" : "white",
                    borderRadius: 10,
                  }}
                />
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};
export const Data1 = (props) => {
  // console.log("List"+JSON.stringify(props.McQList[0]["1"]))
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [Bg, setBg] = useState(false);
  const [Tx, setTx] = useState(false);

  //      var da = JSON.stringify(props.McQList);
  //    console.log("Da"+da)
  //    var Op = props.McQList;
  // console.log("object"+Op)
  // var correctAns = da[currentQuestion].correctoption;
  // Object.keys((Op[0])).map(function (k) {
  //   console.log(k)
  // })
  const Message = (score) => {
    if (score > 30) {
      return (
        <View style={{ flex: 1, backgroundColor: "#bdbdbd" }}>
          <StatusBar barStyle="light-content" />
          <View style={styles.toolbar}>
            <TouchableOpacity onPress={() => this._onPressBack()}>
              <Text style={styles.toolbarButton}>
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
            colors={["#12217A", "#3246BF", "#566DF7", "transparent"]}
            // colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={styles.background}
          >
            <View style={styles.innerContainer}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="trophy" size={30} color="white" />
              </View>
              <Text style={styles.score}>You need to work hard</Text>
              <Text style={styles.score}>You scored {score}%</Text>
            </View>
          </LinearGradient>
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

  const handleAnswerOptionClick = (Correct, Selected) => {
    // alert(Object.keys(props.McQList).length)
    if (Correct === Selected) {
      setScore(score + 1);
    }
    var nextQuestion = currentQuestion + 1;
    if (nextQuestion < Object.keys(props.McQList).length) {
      setTimeout(() => setCurrentQuestion(nextQuestion), 1000);
    } else {
      // setShowScore(true);
      alert(score);
      Message((score * 100) / 5);
    }
  };
  return (
    <View
      style={{
        height: height - 250,
        width: width - 40,
        backgroundColor: "#F5FCFF",
        paddingTop: 30,
        alignSelf: "center",
        justifyContent: "center",
        paddingVertical: "20%",
        marginTop: "10%",
        borderRadius: 20,
      }}
    >
      <View style={styles.container}>
        {Object.keys(props.McQList[currentQuestion]).map(function (k) {
          var Op = props.McQList[currentQuestion][k].option;
          var Op1 = props.McQList[currentQuestion][k].Question;
          var correctAns = props.McQList[currentQuestion][k].Correct;

          console.log("Op1" + Op1);
          console.log("Op2" + correctAns);
          return (
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={styles.oval}>
                <Text style={styles.welcome}>{Op1}</Text>
              </View>
              {Object.keys(props.McQList[currentQuestion][k].option).map(
                function (k1) {
                  console.log("KKKK11" + Op[k1]);
                  return (
                    <BasicButton
                      onPress={() => handleAnswerOptionClick(correctAns, k1)}
                      // title={Op[k]}
                      title={Op[k1]}
                      color="black"
                      textStyle={{
                        color: Tx ? "#696969" : "black",
                        fontWeight: "bold",
                        alignSelf: "center",
                        fontSize: 20,
                      }}
                      buttonStyle={{
                        margin: 10,
                        paddingTop: 10,
                        width: width - 200,
                        alignSelf: "center",
                        paddingBottom: 10,
                        paddingRight: 20,
                        paddingLeft: 20,
                        backgroundColor: Bg ? "#bdbdbd" : "white",
                        borderRadius: 10,
                      }}
                    />
                  );
                }
              )}
            </View>
            //   <>
            //  {
            //    Object.keys(props.McQList[0]["1"].option).map(function (k1) {
            //     console.log("KKKK11" + Op[k1]);

            //   })}
            //   </>
          );
          // console.log("KKKK" + JSON.stringify(k));
          Object.keys(props.McQList[0]["1"].option).map(function (k1) {
            console.log("KKKK11" + Op[k1]);
          });
        })}
        {/* <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={styles.oval}>
                <Text style={styles.welcome}>{props.McQList[0]["1"].Question}</Text>
              </View> */}
        {/* <View>
                 {Object.keys(da1[0].option).map(function (k) {
                   return (
                         // <TouchableWithoutFeedback
                         //   onPress={() => handleAnswerOptionClick(correctAns, k)}
                         // >
                         //   <Animatable.View
                         //     style={{
                         //       margin: 10,
                         //       paddingTop: 10,
                         //       height: 40,
                         //       width: "100%",
                         //       alignSelf: "center",
                         //       paddingBottom: 10,
                         //       paddingRight: 20,
                         //       paddingLeft: 20,
                         //       backgroundColor: "#bdbdbd",
                         //       borderRadius: 10,
                         //     }}
                         //   >
                         //   <Text
                         //       style={{
                         //         color: "#696969",
                         //         fontWeight: "bold",
                         //         alignSelf: "center",
                         //         fontSize: 20,
                         //       }}
                         //     >
                         //       {Op[k]}
                         //     </Text>
                       <BasicButton
                       onPress={() => handleAnswerOptionClick(correctAns, k)}
                       // title={Op[k]}
                       title={Op1[k]}
                         color="black"
                         textStyle={{
                           color:Tx? "#696969":"black",
                           fontWeight: "bold",
                           alignSelf: "center",
                           fontSize: 20,
                         }}
                         buttonStyle={{
                           margin: 10,
                           paddingTop: 10,
                           width: width - 200,
                           alignSelf: "center",
                           paddingBottom: 10,
                           paddingRight: 20,
                           paddingLeft: 20,
                           backgroundColor:Bg? "#bdbdbd":'white',
                           borderRadius: 10,
                         }}
                       />
                   );
                 })}
               </View> */}
      </View>
    </View>
  );
};
export default Data1;
const styles = StyleSheet.create({
  oval: {
    // height: 150,
    width: (width * 80) / 100,
    borderRadius: 20,
    backgroundColor: "green",
   // marginTop: "-30%",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  welcome: {
    fontSize: 20,
    margin: 15,
    color: "white",
    alignSelf: "center",
    marginTop: "10%",
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  score: {
    color: "white",
    fontSize: 20,
    fontStyle: "italic",
  },
  background: {
    position: "relative",
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container1: {
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
