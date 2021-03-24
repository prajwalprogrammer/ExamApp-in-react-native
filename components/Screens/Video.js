import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import Spinner from "react-native-loading-spinner-overlay";

export default function Video1(props) {
  //alert(JSON.parse(props.Link))
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [Visible, setVisible] = React.useState(null)
  return (
    <View style={styles.container}>
      <Spinner
          visible={Visible}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: JSON.parse(props.Link),
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        onLoadStart={()=>setVisible(true)}
        onLoad={()=>setVisible(false)}
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
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: "100%",
    height: "50%",
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
