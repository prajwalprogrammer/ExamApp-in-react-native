import * as React from "react";
import { View, StyleSheet, Button, ActivityIndicator } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import Spinner from "react-native-loading-spinner-overlay";

export default function Video1(props) {
  //alert(JSON.parse(props.Link))
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [Visible, setVisible] = React.useState(null);
  const Show=()=>{
    console.log("Show")
    setVisible(true)
  }
  const Hide=()=>{
    console.log("hide")
    setVisible(false)
  }
  return (
    <View style={styles.container}>
      {/* <Spinner
          visible={Visible}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        /> */}
      {Visible?
        <ActivityIndicator
          size="large"
          color="#000000"
          animating={Visible}
          style={{justifyContent:'center',alignSelf:'center'}}
        />:null}

      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: JSON.parse(props.Link),
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        onLoadStart={() => Show()}
        onLoad={() => Hide()}
        
      />
      {/* <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: "50%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
