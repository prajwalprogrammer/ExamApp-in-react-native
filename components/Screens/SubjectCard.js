import {  Button, Card, Title, Paragraph } from "react-native-paper";
import React from "react";
import { StyleSheet, Text, View,Dimensions } from "react-native";
import { ListItem, Avatar } from 'react-native-elements'
const width = Dimensions.get("screen").width;

const SubjectCard = () => {
  return (
    <ListItem
      containerStyle={styles.mid111}
      friction={90} //
      tension={100} // These props are passed to the parent component (here TouchableScale)
      activeScale={0.95} //
      // linearGradientProps={{
      //   colors: ["#c3cfe2", "#f5f7fa"],
      //   // start: { x: 1, y: 0 },
      //   // end: { x: 0.2, y: 0 },
      // }}
      // ViewComponent={LinearGradient} // Only if no expo
    >
      {/* <Avatar rounded source={{ uri: avatar_url }} /> */}
      <ListItem.Content>
        <ListItem.Title
          style={{ color: "black", fontWeight: "bold", fontSize: 30 ,alignSelf:'center'}}
        >
          <Text>gggiii</Text>
        </ListItem.Title>
      </ListItem.Content>
     
    </ListItem>
  );
};

export default SubjectCard;

const styles = StyleSheet.create({
  mid111: {
    marginVertical: "4%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 6,
    width:width-30
  },
});
