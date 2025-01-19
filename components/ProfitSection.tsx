
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
      
     {(!isGameStarted || profit === 0) ? null : (
  <TouchableOpacity
    style={[styles.cashoutButton, !isGameStarted && styles.disabledButton]}
    onPress={onCashOut}
  >
    <Text style={styles.cashoutButtonText}>Cash Out</Text>
  </TouchableOpacity>
)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    gap: 18,
  },
  profitText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    
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
