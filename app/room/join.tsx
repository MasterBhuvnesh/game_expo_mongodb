import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text } from "react-native-paper";
import { router } from "expo-router";
import { CodeInput } from "../../components/CodeInput";
import { useLoading } from "../../contexts/LoadingContext";
import { api } from "../../services/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function JoinRoomScreen() {
  const [error, setError] = useState("");
  const { setLoading } = useLoading();
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  const handleCodeComplete = async (code: string) => {
    if (code.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await api.joinRoom(code);
      router.replace(`/room/${code}`);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to join room. Please try again.";
      setError(errorMessage);
      setErrorStatus(err.response?.status || null);
      // Alert.alert("Error", errorMessage); //debug alert
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.title}>Enter Room Code</Text>
        <Text style={styles.subtitle}>
          {error ? (
            <Text style={styles.error}>
              {error === "Failed to join room. Please try again." &&
              errorStatus === 400
                ? "Room not found. Please check the code and try again."
                : error}
            </Text>
          ) : null}
        </Text>
        <CodeInput onComplete={handleCodeComplete} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0F",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#9CA3AF",
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    marginHorizontal: 20,
    marginTop: 15,
  },
  error: {
    color: "#EF4444",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
  },
});
