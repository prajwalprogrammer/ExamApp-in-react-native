import * as React from "react";
import { View } from "react-native";
import PDFReader from "rn-pdf-reader-js";
import { WebView } from "react-native-webview";
import Spinner from "react-native-loading-spinner-overlay";

export default class Des extends React.Component {
  constructor(params) {
    super(params);
    this.state = { visible: null };
  }
  showSpinner() {
    console.log(this.props.Link);

    console.log("Show Spinner");
    this.setState({ visible: true });
  }

  hideSpinner() {
    console.log("Hide Spinner");
    this.setState({ visible: false });
  }
  render() {
    return (
      // // <View style={{marginBottom:10}}>
      // {/* <PDFReader
      //   source={{
      //     uri: 'https://drive.google.com/file/d/1sLUHGGR5axJ_nYL67fcZKKNfZHuN8t7I/view',
      //   }}
      // /> */}
      <>
        <Spinner
          visible={this.state.visible}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
        <WebView
          source={{ uri: this.props.Link }}
          onLoadStart={() => this.showSpinner()}
          onLoadEnd={() => this.hideSpinner()}
        />
      </>
    );
  }
}
