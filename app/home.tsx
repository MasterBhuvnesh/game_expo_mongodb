import React, { useState } from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { router } from "expo-router";
import { LoadingScreen } from "../components/LoadingScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleEnterRoom = () => {
    router.push("/room/join");
  };

  if (isLoading) {
    return <LoadingScreen onFinish={handleLoadingComplete} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Hi {user?.name || "Player"},</Text>
      <Text style={styles.subText}>
        Welcome to the arena, be ready with coins to bet
      </Text>

      <Pressable onPress={handleEnterRoom}>
        <LinearGradient
          colors={["#4f46e5", "#7c3aed"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <Image
            source={require("../assets/images/mines.png")}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Mines</Text>
            <Text style={styles.cardButton}>Enter the Room</Text>
          </View>
        </LinearGradient>
      </Pressable>

      <View style={[styles.card, styles.comingSoonCard]}>
        <Image
          source={require("../assets/images/upcoming.png")}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>More Games</Text>
          <Text style={styles.comingSoonText}>Coming Soon...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B020F",
    padding: 20,
    gap: 20,
  },
  welcomeText: {
    fontSize: 32,
    color: "#fff",
    marginBottom: 8,
    fontFamily: "Poppins-Bold",
  },
  subText: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 30,
    fontFamily: "Poppins-Regular",
  },
  card: {
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: "white",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  cardContent: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  cardTitle: {
    fontSize: 28,
    color: "#fff",
    fontFamily: "Poppins-Bold",
  },
  cardButton: {
    fontSize: 18,
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
  comingSoonCard: {
    backgroundColor: "#2d1b69",
  },
  comingSoonText: {
    fontSize: 18,
    color: "#fff",
    opacity: 0.7,
    fontFamily: "Poppins-Regular",
  },
});