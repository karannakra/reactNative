import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";

import Card from "../components/Card";
import Colors from "../constants/color";
import Input from "../components/TextInput";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MyMainButton from "../components/MyMainButton";

export default function StartGameScreen(props) {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [avaibleDeviceWidth, setAvailableWidth] = useState(
    Dimensions.get("window").width / 4
  );

  const [selectedNumber, setSelectedNumber] = useState();

  useEffect(() => {
    Dimensions.removeEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  }, []);
  const updateLayout = () => {
    setAvailableWidth(Dimensions.get("window").width / 4);
  };

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };
  const resetHandler = () => {
    setConfirmed(false);
    setEnteredValue("");
  };
  const confirmInputHandler = () => {
    const choosenNumber = parseInt(enteredValue);
    if (
      isNaN(choosenNumber) ||
      choosenNumber <= 0 ||
      choosenNumber > 99 ||
      choosenNumber == ""
    ) {
      Alert.alert(
        "Invalid Number!",
        "number has to be number between 1 and 99",
        [{ text: "Ok", style: "destructive", onPress: resetHandler }]
      );
      return;
    }
    setEnteredValue("");
    setSelectedNumber(choosenNumber);
    setConfirmed(true);
    Keyboard.dismiss();
  };
  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MyMainButton onPress={() => props.startGameHandler(selectedNumber)}>
          START GAME
        </MyMainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a new Game!</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Select a Number</BodyText>
              <Input
                styles={styles.input}
                blurOnSubmit
                autoCapitalise="none"
                autCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={{ width: avaibleDeviceWidth }}>
                  <Button
                    title="Reset"
                    onPress={resetHandler}
                    color={Colors.accent}
                  />
                </View>
                <View style={{ width: avaibleDeviceWidth }}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  inputContainer: {
    width: "80%",
    minWidth: 300,
    maxWidth: "95%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },

  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
