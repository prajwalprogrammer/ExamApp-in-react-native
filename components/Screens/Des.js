import * as React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { View } from "react-native";
import PDFReader from "rn-pdf-reader-js";

export const Des = () => {
  return (
    <View style={styles.container}>
      <PDFReader
        source={{
          uri:
            "http://www.crectirupati.com/sites/default/files/lecture_notes/Operating%20Systems%20Lecture%20Notes.pdf",
        }}
      />
    </View>
  );
};
export default Des;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
});
