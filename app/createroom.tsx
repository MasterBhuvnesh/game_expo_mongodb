import React, { useState } from "react";
import { View, StyleSheet, Pressable, ToastAndroid } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useLoading } from "@/contexts/LoadingContext";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = process.env.BASE_URL;

export default function CreateRoomScreen() {
  const { setLoading } = useLoading();
  const [timeoutMinutes, setTimeoutMinutes] = useState<string>("");
  const [coins, setCoins] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const handleCreateRoom = async () => {
    if (!timeoutMinutes || !coins) {
      ToastAndroid.show("Please fill all fields!", ToastAndroid.SHORT);
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        ToastAndroid.show(
          "Token is not available in AsyncStorage",
          ToastAndroid.SHORT
        );
        setLoading(false);
        return;
      }
      const response = await axios.post(
        `${BASE_URL}/api/admin/create-room?timeoutMinutes=${timeoutMinutes}&coins=${coins}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      ToastAndroid.show("Room created successfully!", ToastAndroid.SHORT);
      setCode(response.data.code);
    } catch (error) {
      ToastAndroid.show(
        "Failed to create room. Please try again.",
        ToastAndroid.SHORT
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <LinearGradient
        colors={["#1F2937", "#111827"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.roomCode}>{code}</Text>

        <Text style={styles.title}>Create Room</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            label="Timeout (in minutes)"
            value={timeoutMinutes}
            onChangeText={setTimeoutMinutes}
            keyboardType="numeric"
            mode="outlined"
            theme={{ colors: { primary: "#7C3AED", background: "#1F2937" } }}
          />
          <TextInput
            style={styles.input}
            label="Coins"
            value={coins}
            onChangeText={setCoins}
            keyboardType="numeric"
            mode="outlined"
            theme={{ colors: { primary: "#7C3AED", background: "#1F2937" } }}
          />
          <Pressable
            onPress={handleCreateRoom}
            style={styles.button}
          >
            <LinearGradient
              colors={["#7C3AED", "#4F46E5"]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.buttonText}>Create Room</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    marginBottom: 30,
  },
  form: {
    gap: 20,
  },
  input: {
    backgroundColor: "#1F2937",
  },
  button: {
    borderRadius: 10,
    overflow: "hidden",
  },
  buttonGradient: {
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  roomCode: {
    color: "#fff",
    fontSize: 36,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 40,
  },
});
