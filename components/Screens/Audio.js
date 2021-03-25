// import * as React from "react";
// import {
//   Text,
//   View,
// StyleSheet,
// Button,
// Image,
// TouchableOpacity,
// ActivityIndicator,
// } from "react-native";
import { Audio } from "expo-av";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
function App1() {
  const [sound, setSound] = React.useState(null);
  const [Play, setPlay] = React.useState(false);
  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({
      uri:
        "https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3",
    });
    setSound(sound);
    console.log("fdfg" + sound);
    console.log("Playing Sound");
    // await sound.playAsync();
  }

  // React.useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);
  React.useEffect(() => {
    playSound();
  }, []);
  const handlePlayPause = async () => {
    Play ? await sound.pauseAsync() : await sound.playAsync();
    setPlay(!Play);
  };
  return (
    <View style={styles.container}>
      {sound ? (
        <ActivityIndicator
          size="large"
          color="#000000"
          animating={true}
          style={{ justifyContent: "center", alignSelf: "center" }}
        />
      ) : null}
      <Image
        style={styles.albumCover}
        source={{
          uri:
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/og-airpods-max-202011?wid=1200&hei=630&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1603996970000",
        }}
      />
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.control}
          // onPress={this.handlePreviousTrack}
        >
          <AntDesign name="stepbackward" size={48} color="#444" />
          {/* <Ionicons name="ios-skip-backward" size={48} color="#444" /> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.control} onPress={handlePlayPause}>
          {Play ? (
            <Ionicons name="ios-pause" size={48} color="#444" />
          ) : (
            <Ionicons name="ios-play-circle" size={48} color="#444" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.control}
          // onPress={this.handleNextTrack}
        >
          <AntDesign name="stepforward" size={48} color="#444" />
          {/* <Ionicons name="ios-skip-forward" size={48} color="#444" /> */}
        </TouchableOpacity>
      </View>
      {/* {this.renderFileInfo()} */}
    </View>
    // <View style={styles.container}>
    //   <Button title="Play Sound" onPress={playSound} />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  albumCover: {
    width: 250,
    height: 250,
  },
  trackInfo: {
    padding: 40,
    backgroundColor: "#fff",
  },
  trackInfoText: {
    textAlign: "center",
    flexWrap: "wrap",
    color: "#550088",
  },
  largeText: {
    fontSize: 22,
  },
  smallText: {
    fontSize: 16,
  },
  control: {
    margin: 20,
  },
  controls: {
    flexDirection: "row",
  },
});

//https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3


//'<audio id="audio" loop> <source src="http://operandtechnologies.com/ReactWebApi/ExamDemo/audio/audio1.mpeg" type="audio/mp3" /> </audio>'
export default class Audio1 extends React.Component {
  state = {
    playpause: false,
    visible: null,
  };
  _handlePuase() {
    // alert(this.state.playpause);
    this.setState({ playpause: !this.state.playpause });
    this.state.playpause
      ? this.webview.injectJavaScript(
          'document.getElementById("audio").pause();'
        )
      : this.webview.injectJavaScript(
          'document.getElementById("audio").play();'
        );
  }
  showSpinner() {
    //alert(this.props.Link)
    console.log("Show Spinner");
    this.setState({ visible: true });
  }

  hideSpinner() {
    console.log("Hide Spinner");
    this.setState({ visible: false });
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.albumCover}
          source={{
            uri:
              "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/og-airpods-max-202011?wid=1200&hei=630&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1603996970000",
          }}
        />
        {this.state.visible ? (
          <ActivityIndicator
            size="large"
            color="#000000"
            animating={this.state.visible}
            style={{ justifyContent: "center", alignSelf: "center" }}
          />
        ) : null}
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.control}
            // onPress={this.handlePreviousTrack}
          >
            <AntDesign name="stepbackward" size={48} color="#444" />
            {/* <Ionicons name="ios-skip-backward" size={48} color="#444" /> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.control}
            onPress={() => this._handlePuase()}
          >
            {this.state.playpause ? (
              <Ionicons name="ios-pause" size={48} color="#444" />
            ) : (
              <Ionicons name="ios-play-circle" size={48} color="#444" />
            )}
            {/* <Ionicons name="ios-play-circle" size={48} color="#444" /> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.control}
            // onPress={this.handleNextTrack}
          >
            <AntDesign name="stepforward" size={48} color="#444" />
            {/* <Ionicons name="ios-skip-forward" size={48} color="#444" /> */}
          </TouchableOpacity>
        </View>
        <WebView
          ref={(ref) => (this.webview = ref)}
          originWhitelist={["*"]}
          mediaPlaybackRequiresUserAction={false} // Allow autoplay
          useWebKit={true}
          source={{
            html:
              `<audio id="audio" loop> <source src=${this.props.Link} type="audio/mp3" /> </audio>`,
          }}
          onLoadStart={() => this.showSpinner()}
          onLoadEnd={() => this.hideSpinner()}
        />

        {/* <View>
          <TouchableOpacity
            style={{ marginTop: 50 }}
            onPress={() => {
              this.webview.injectJavaScript(
                'document.getElementById("audio").play();'
              );
            }}
          >
            <Text>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 50 }}
            onPress={() => {
              this.webview.injectJavaScript(
                'document.getElementById("audio").pause();'
              );
            }}
          >
            <Text>Pause</Text>
          </TouchableOpacity>
          <WebView
            ref={(ref) => (this.webview = ref)}
            originWhitelist={["*"]}
            mediaPlaybackRequiresUserAction={false} // Allow autoplay
            useWebKit={true}
            source={{
              html:
                '<audio id="audio" loop> <source src="https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3" type="audio/mp3" /> </audio>',
            }}
          />
        </View> */}
      </View>
    );
  }
}
