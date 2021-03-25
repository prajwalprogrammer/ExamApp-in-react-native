import * as React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { View } from "native-base";
import { Image, Dimensions ,Text} from "react-native";
const width = Dimensions.get("screen").width;
export const Cards=(props)=>  {

    return (
      <View style={{width:width/2}}>
        <Card
          elevation={8}
          style={{
           // width: ,
            borderRadius: 20,
            marginTop: props.mr,
            marginLeft: 7,
            marginRight: 8,
            // marginHorizontal: "%",
            zIndex: 99,
            // alignSelf: this.props.fx,
          }}
        >
          <View style={{ zIndex: 99, height: 80, alignSelf: "center" }}>
            <Image
              source={props.img}
              style={{
                //resizeMode: "contain",
                // backgroundColor: "red",
                height: 120,
                width: 120,
                // flex: 5,
                marginTop: 10,
                resizeMode: "contain",
              }}
            />
          </View>
          <Card.Content
            style={{
              backgroundColor: props.color,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              height: 120,
              zIndex: -1,
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
              alignSelf:'center',
              justifyContent:'center'
            }}
          >
            <View style={{ alignSelf: "center",justifyContent:'center', paddingTop: 40 }}>
              <Title
                style={{
                  fontSize: 25,
                  color: "red",
                  fontFamily: "sans-serif-condensed",
                  alignSelf:'center',
                  justifyContent:'center'
                }}
              >
                {props.name}
              </Title>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  
}
export default Cards;