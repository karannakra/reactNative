import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import DefaultStyles from "../constants/default-style";
import MyMainButton from "../components/MyMainButton";
import BodyText from "../components/BodyText";
import { ScreenOrientation } from "expo";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum == exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};
const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);
const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [currHeight, setCurrHeight] = useState(Dimensions.get("window").height);

  const GameScreen = (props) => {
    ScreenOrientation.lockAsync;
  };
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { onGameOver, userChoice } = props;
  useEffect(() => {
    Dimensions.addEventListener("change", updateLayouts);
    return () => {
      Dimensions.removeEventListener("change", updateLayouts);
    };
  }, []);
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, onGameOver, userChoice]);

  const updateLayouts = () => {
    setCurrHeight(Dimensions.get("window").height);
  };

  const nextGuessHandler = (direction) => {
    if (
      (direction == "LOWER" && currentGuess < userChoice) ||
      (direction == "GREATER" && currentGuess > userChoice)
    ) {
      Alert.alert("don't! lie", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction == "LOWER") {
      currentHigh.current = currentGuess;
    }
    if (direction == "GREATER") {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds((curRounds) => rounds + 1);
    setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]);
  };
  if (currHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Opponent's Guess</Text>
        <View style={styles.control}>
          <MyMainButton onPress={nextGuessHandler.bind(this, "LOWER")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MyMainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MyMainButton onPress={nextGuessHandler.bind(this, "GREATER")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MyMainButton>
        </View>
        <View style={styles.listContainer}>
          {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}
          <FlatList
            contentContainerStyle={styles.list}
            keyExtractor={(item) => item.toString()}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MyMainButton onPress={nextGuessHandler.bind(this, "LOWER")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MyMainButton>
        <MyMainButton onPress={nextGuessHandler.bind(this, "GREATER")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MyMainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item.toString()}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 30 : 5,
    width: 350,
    maxWidth: "90%",
  },
  listItem: {
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  listContainer: {
    flex: 1,
    width: "60%",
  },
  control: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
export default GameScreen;
