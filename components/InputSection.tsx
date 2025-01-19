import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, TextInput } from "react-native-paper";

interface InputSectionProps {
  bet: number;
  setBet: (bet: number) => void;
  mines: number;
  setMines: (mines: number) => void;
  startGame: () => void;
  isGameStarted: boolean;
  maxBet: number;
}

const InputSection: React.FC<InputSectionProps> = ({
  bet,
  setBet,
  mines,
  setMines,
  startGame,
  isGameStarted,
  maxBet,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bet amount</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={bet.toString()}
          onChangeText={(text) => setBet(Math.min(parseInt(text) || 0, maxBet))}
          disabled={isGameStarted}
          mode="outlined"
          textColor="white"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mines</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={mines.toString()}
          onChangeText={(text) => setMines(Math.min(parseInt(text) || 0, 24))}
          disabled={isGameStarted}
          mode="outlined"
          textColor="white"
        />
      </View>
     {!isGameStarted && (
  <TouchableOpacity
    style={styles.betButton}
    onPress={startGame}
  >
    <Text style={styles.betButtonText}>Start Game</Text>
  </TouchableOpacity>
)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.7,
    flex: 1,
    fontFamily: "Poppins-Medium",
  },
  input: {
    flex: 2,
    height: 48,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
  },
  betButton: {
    backgroundColor: "#7C3AED",
    width: "40%",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    alignSelf: "center",
  },
  betButtonText: {
    color: "#fff",
    padding:5,
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
});

export default InputSection;
