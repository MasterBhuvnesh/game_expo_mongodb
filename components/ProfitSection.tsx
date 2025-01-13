// import React from "react";
// import { StyleSheet, View } from "react-native";
// import { Button, Text } from "react-native-paper";

// interface ProfitSectionProps {
//   profit: number;
//   pointsToGain: number;
//   isGameStarted: boolean;
//   onCashOut: () => void;
// }

// const ProfitSection: React.FC<ProfitSectionProps> = ({
//   profit,
//   pointsToGain,
//   isGameStarted,
//   onCashOut,
// }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.profitText}>Profit: {profit.toFixed(2)}x</Text>
//       <Text style={styles.pointsText}>
//         Points to gain: {pointsToGain.toFixed(4)}
//       </Text>
//       <Button
//         mode="contained"
//         onPress={onCashOut}
//         disabled={!isGameStarted || profit === 0}
//         style={styles.button}
//       >
//         Cash Out
//       </Button>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     padding: 20,
//     alignItems: "center",
//   },
//   profitText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#ffffff",
//   },
//   pointsText: {
//     fontSize: 16,
//     marginBottom: 10,
//     color: "#00e701",
//   },
//   button: {
//     marginTop: 10,
//   },
// });

// export default ProfitSection;

import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

interface ProfitSectionProps {
  profit: number;
  pointsToGain: number;
  isGameStarted: boolean;
  onCashOut: () => void;
}

const ProfitSection: React.FC<ProfitSectionProps> = ({
  profit,
  pointsToGain,
  isGameStarted,
  onCashOut,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.profitText}>Profit: {profit.toFixed(2)}x</Text>
      <Text style={styles.pointsText}>
        Points to gain: {pointsToGain.toFixed(4)}
      </Text>
      <TouchableOpacity
        style={[styles.cashoutButton, !isGameStarted && styles.disabledButton]}
        onPress={onCashOut}
        disabled={!isGameStarted || profit === 0}
      >
        <Text style={styles.cashoutButtonText}>Cash Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  profitText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  pointsText: {
    fontSize: 16,
    color: "#7C3AED",
  },
  cashoutButton: {
    backgroundColor: "#7C3AED",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  cashoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default ProfitSection;
