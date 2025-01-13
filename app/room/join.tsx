import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { router } from "expo-router";
import { CodeInput } from "../../components/CodeInput";
import { useLoading } from "../../contexts/LoadingContext";
import { api } from "../../services/api";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JoinRoomScreen() {
  const [error, setError] = useState("");
  const { setLoading } = useLoading();

  const handleCodeComplete = async (code: string) => {
    setError("");
    setLoading(true);
    try {
      await api.joinRoom(code);
      router.push(`/room/${code}`);
    } catch (err) {
      setError("Invalid room code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enter the 6-digit code to join the game:</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <CodeInput onComplete={handleCodeComplete} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0F",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    marginTop: 30,
  },
  error: {
    color: "#ff4d4d",
    textAlign: "center",
    marginBottom: 20,
  },
});
