import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

interface CodeInputProps {
  onComplete: (code: string) => void;
}

export const CodeInput: React.FC<CodeInputProps> = ({ onComplete }) => {
  const [code, setCode] = useState("");

  const handleNumberPress = (num: string) => {
    if (code.length < 6) {
      const newCode = code + num;
      setCode(newCode);
      if (newCode.length === 6) {
        onComplete(newCode);
      }
    }
  };

  const handleDelete = () => {
    setCode(code.slice(0, -1));
  };

  const renderNumber = (num: string, letters?: string) => (
    <Pressable
      style={styles.numberButton}
      onPress={() => handleNumberPress(num)}
    >
      <Text style={styles.numberText}>{num}</Text>
      {letters && <Text style={styles.letterText}>{letters}</Text>}
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.codeContainer}>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <View
              key={index}
              style={[
                styles.codeBox,
                code[index] ? styles.codeBoxFilled : null,
              ]}
            >
              <Text style={styles.codeText}>{code[index] || ""}</Text>
            </View>
          ))}
      </View>

      <View style={styles.keypad}>
        <View style={styles.row}>
          {renderNumber("1")}
          {renderNumber("2")}
          {renderNumber("3")}
        </View>
        <View style={styles.row}>
          {renderNumber("4")}
          {renderNumber("5")}
          {renderNumber("6")}
        </View>
        <View style={styles.row}>
          {renderNumber("7")}
          {renderNumber("8")}
          {renderNumber("9")}
        </View>
        <View style={styles.row}>
          <View style={styles.numberButton} />
          {renderNumber("0")}
          <Pressable
            style={styles.numberButton}
            onPress={handleDelete}
          >
            <MaterialCommunityIcons
              name="backspace"
              size={24}
              color="#fff"
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  codeBox: {
    width: 40,
    height: 45,
    borderWidth: 2,
    borderColor: "#333",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  codeBoxFilled: {
    borderColor: "#6366f1",
    backgroundColor: "rgba(99, 102, 241, 0.1)",
  },
  codeText: {
    fontSize: 24,
    color: "#fff",
  },
  keypad: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  numberButton: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  numberText: {
    fontSize: 24,
    color: "#fff",
  },
  letterText: {
    fontSize: 10,
    color: "#666",
    marginTop: 2,
  },
});
