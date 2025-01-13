// import React from "react";
// import { StyleSheet, View } from "react-native";
// import { TextInput, Button, Text } from "react-native-paper";

// interface InputSectionProps {
//   bet: number;
//   setBet: (bet: number) => void;
//   mines: number;
//   setMines: (mines: number) => void;
//   startGame: () => void;
//   isGameStarted: boolean;
//   maxBet: number;
// }

// const InputSection: React.FC<InputSectionProps> = ({
//   bet,
//   setBet,
//   mines,
//   setMines,
//   startGame,
//   isGameStarted,
//   maxBet,
// }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.inputContainer}>
//         <Text style={{ color: "white", width: "20%" }}>Bet:</Text>
//         <TextInput
//           style={styles.input}
//           keyboardType="numeric"
//           value={bet.toString()}
//           onChangeText={(text) => setBet(Math.min(parseInt(text) || 0, maxBet))}
//           disabled={isGameStarted}
//           mode="outlined"
//           textColor="white"
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <Text style={{ color: "white", width: "20%" }}>Mines:</Text>
//         <TextInput
//           style={styles.input}
//           keyboardType="numeric"
//           value={mines.toString()}
//           onChangeText={(text) => setMines(Math.min(parseInt(text) || 0, 24))}
//           disabled={isGameStarted}
//           mode="outlined"
//           textColor="white"
//         />
//       </View>
//       <Button
//         mode="contained"
//         onPress={startGame}
//         disabled={isGameStarted}
//         style={{ padding: 10, margin: 5 }}
//       >
//         Start
//       </Button>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     padding: 20,
//     marginBottom: 5,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 5,
//   },
//   input: {
//     flex: 1,
//     marginLeft: 10,
//     backgroundColor: "#252836",
//   },
// });

// export default InputSection;

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
      <TouchableOpacity
        style={styles.betButton}
        onPress={startGame}
        disabled={isGameStarted}
      >
        <Text style={styles.betButtonText}>Bet</Text>
      </TouchableOpacity>
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
    width: "30%",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    alignSelf: "center",
  },
  betButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
});

export default InputSection;
