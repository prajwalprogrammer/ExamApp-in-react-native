import axios from "axios";
import { AsyncStorage } from "react-native";
import React, { Component, useContext, useState } from "react";
export const fetchdailydata = async (Email, Password, navigation) => {
  try {
    var obj = { email: Email, mobile: Password };

    const { data } = await axios.post(
      "http://operandtechnologies.com/ReactWebApi/ExamDemo/login.php",
      JSON.stringify(obj)
      // email: Email,
      // mobile: Password,
      // email: 'value@gmail.com',
      // mobile: '902115565',
    );
    if(data ==="Invalid Username or Password Please Try Again")
        return data;
    else{
            const modifiedit = data.map((dailyData) => ({
              id: JSON.parse(dailyData.studid),
              name: dailyData.studname,
              email: dailyData.studemail,
              mobile: JSON.parse(dailyData.studmobile),
              classid: JSON.parse(dailyData.studeclassid),
              gender: dailyData.studgender,
            }));
            console.log("Mod" + modifiedit);
            return modifiedit;
          }
  } catch (error) {
    console.log(error);
  }
};
export const Login1 = async (Email, Password, navigation) => {
  alert(Email + Password);
  //alert('fg');
  var obj = { email: Email, mobile: Password };
  var Data = [];
  await axios
    .post(
      "http://operandtechnologies.com/ReactWebApi/ExamDemo/login.php",
      JSON.stringify(obj)
      // email: Email,
      // mobile: Password,
      // email: 'value@gmail.com',
      // mobile: '902115565',
    )
    .then(async (response) => {
      console.log(
        "hii  " + JSON.stringify(JSON.parse(response.data[0]["studid"]))
      );
      Data.push(JSON.stringify(response.data[0]["studid"]));
      Data.push(JSON.stringify(response.data[0]["studemail"]));
      Data.push(JSON.stringify(response.data[0]["studemail"]));
      Data.push(JSON.stringify(response.data[0]["studmobile"]));
      Data.push(JSON.stringify(response.data[0]["studgender"]));
      Data.push(JSON.stringify(response.data[0]["studeclassid"]));
      //setUser(Data)

      console.log("Data" + Data[0]);

      const modifiedit = response.data.map((dailyData) => ({
        id: JSON.parse(dailyData.studid),
        name: dailyData.studname,
        email: dailyData.studemail,
        mobile: JSON.parse(dailyData.studmobile),
        classid: JSON.parse(dailyData.studeclassid),
        gender: dailyData.studgender,
      }));
      // console.log(modifiedit);
      //   for(var i = 0; i < Data.length; i++) {
      //     var obj = Data[i];

      //     console.log(obj);
      // }
      //alert(response.data);
      // await AsyncStorage.setItem("userToken", "abc");
      //   navigation.navigate("App",{text:"80"});
      // for(x in Data){
      //   console.log(x)
      // }
      // var ARR=Object.values(Data[0])
      // console.log("gghh"+ARR)
      if (response.data === "Data Matched") {
        await AsyncStorage.setItem("userToken", "abc");
        navigation.navigate("App");
      } else {
        alert("Invalid Email or Mobile no.");
      }
      return modifiedit;
    })
    .catch((err) => alert("hgh" + err));
};
export const Register = async (name, email, mobile, gender, navigation) => {
  alert("hii");
  var obj = {
    name: name,
    mobile: mobile,
    email: email,
    gender: gender,
  };
  await axios
    .post(
      "http://operandtechnologies.com/ReactWebApi/ExamDemo/user_registration.php",
      JSON.stringify(obj)

      // name: 'value',
      // mobile: '902115565',
      // email: 'value@gmail.com',
      // gender: 'M',
    )
    .then(async (response) => {
      alert(response.data);
      await AsyncStorage.setItem("userToken", "abc");
      navigation.navigate("App");
      return response.data;
    })
    .catch((err) => alert(err));
};

// email: 'value@gmail.com',
// mobile: '902115565',
export const RegisterUser = async (name, email, mobile, gender, navigation) => {
  try {
    alert("hii");
    var obj = {
      name: name,
      mobile: mobile,
      email: email,
      gender: gender,
    };
    const { data } = await axios.post(
      "http://operandtechnologies.com/ReactWebApi/ExamDemo/user_registration.php",
      JSON.stringify(obj)
      // email: Email,
      // mobile: Password,
      // email: 'value@gmail.com',
      // mobile: '902115565',
    );
        // const modifiedit = {
        // // id: JSON.parse(dailyData.studid),
        //   name: dailyData.studname,
        //   email: dailyData.studemail,
        //   mobile: JSON.parse(dailyData.studmobile),
        // // classid: JSON.parse(dailyData.studeclassid),
        //   gender: dailyData.studgender,
        // };
        // console.log("Mod" + modifiedit);

    return modifiedit;
  } catch (error) {
    console.log(error);
  }
};
export const getSubject = async (classId) => {
  const obj = { classid: classId };
  try {
    const { data } = await axios.post(
      "http://operandtechnologies.com/ReactWebApi/ExamDemo/sub.php",
      JSON.stringify(obj) // email: Email,
      // mobile: Password,
      // email: 'value@gmail.com',
      // mobile: '902115565',
    );
    // console.log(data.subject_list)
    const modifiedit = data.subject_list.map((dailyData) => ({
      Classid: JSON.parse(dailyData.subclassid),
      subid: JSON.parse(dailyData.subjectid),
      Subject: dailyData.subjectname,
    }));
    console.log(modifiedit);
    return modifiedit;
  } catch (error) {
    console.log(error);
  }
};
export const getTopic = async (SubId) => {
  // alert(SubId)
  const obj = { subid: SubId };
  try {
    const { data } = await axios.post(
      "http://operandtechnologies.com/ReactWebApi/ExamDemo/topic.php",
      JSON.stringify(obj) // email: Email,
      // mobile: Password,
      // email: 'value@gmail.com',
      // mobile: '902115565',
    );
    // console.log(data.subject_list)
    const modifiedit = data.topic_list.map((dailyData) => ({
      Topicid: JSON.parse(dailyData.topicid),
      Topicsubid: JSON.parse(dailyData.topicsubid),
      Topic: dailyData.topicname,
    }));
    console.log(modifiedit);
    return modifiedit;
  } catch (error) {
    console.log(error);
  }
};
export const GetMcq = async (TopicId) => {
  const obj = { lessid: TopicId };
  try {
    const { data } = await axios.post(
      "http://operandtechnologies.com/ReactWebApi/ExamDemo/quiz.php",
      JSON.stringify(obj) // email: Email,
      // mobile: Password,
      // email: 'value@gmail.com',
      // mobile: '902115565',
    );
    // console.log(data.subject_list)
    const modifiedit = data.Quiz1;
    //  var Op=modifiedit[0]["1"].option;

    //console.log("modifiedit"+JSON.stringify(modifiedit[0]["1"]))
    Object.keys(modifiedit[0]).map(function (k) {
      var Op = modifiedit[0][k].option;
      var Op1 = modifiedit[0][k].Question;
      var Op2 = modifiedit[0][k].Correct;

      // console.log("Op1"+Op1)
      // console.log("Op2"+Op2)

      //console.log("KKKK"+JSON.stringify(k))
      Object.keys(modifiedit[0]["1"].option).map(function (k1) {
        // console.log("KKKK11"+Op[k1])
      });
    });
    // {
    //   modifiedit[0].map((k)=>console.log("object"+JSON.stringify(k)))
    // }
    return modifiedit;
  } catch (error) {
    console.log(error);
  }
};
export const UpdateUser = async (id, name, email, mobile, classid) => {
  const Obj = {
    studname: name,
    mobile: mobile,
    email: email,
    classid: classid,
    studid: id,
  };
  try {
    const { data } = await axios.post(
      "http://operandtechnologies.com/ReactWebApi/ExamDemo/profileupdate.php",
      JSON.stringify(Obj)
    );
    console.log(data);
    const modifiedit = data.map((dailyData) => ({
      id: JSON.parse(dailyData.studid),
      name: dailyData.studname,
      email: dailyData.studemail,
      mobile: JSON.parse(dailyData.studmobile),
      classid: JSON.parse(dailyData.studeclassid),
      gender: dailyData.studgender,
    }));
    return modifiedit;
  } catch (error) {
    alert(error);
  }
};

export const getVideo = async (TopicId) => {
  try {
    const Obj = { topicid: TopicId };
    const { data } = await axios.post(
      "http://operandtechnologies.com/ReactWebApi/ExamDemo/video.php",
      JSON.stringify(Obj)
    );
    console.log("rtrty" + JSON.stringify(data.topic_list[0]));
    const modifiedit = data.topic_list.map((dailyData) => ({
      lesswiseid: JSON.parse(dailyData.lesswiseid),
      lesswisedesc: dailyData.lesswisedesc,
      lesswiselink: dailyData.lesswiselink,
      lesswiseaudio: dailyData.lesswiseaudio,
      lesswisevideo: dailyData.lesswisevideo,
    }));
    // console.log("object"+JSON.stringify(modifiedit[0].lesswisedesc))
    return modifiedit
  } catch (error) {
    console.log(error);
  }
};
