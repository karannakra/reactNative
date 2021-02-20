import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BodyText = (props) => {
  return (
    <View>
      <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
  },
});
export default BodyText;
