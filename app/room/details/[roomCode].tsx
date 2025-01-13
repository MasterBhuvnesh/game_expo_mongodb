import React, { useEffect } from "react";
import { View, StyleSheet, Animated, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { api } from "../../../services/api";
import { useLoading } from "../../../contexts/LoadingContext";

interface RoomDetails {
  owner: string;
  timeLimit: number;
  prizes: {
    first: number;
    second: number;
    third: number;
  };
}

export default function RoomDetailsScreen() {
  const { roomCode } = useLocalSearchParams();
  const { setLoading } = useLoading();
  const [details, setDetails] = React.useState<RoomDetails | null>(null);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    const loadRoomDetails = async () => {
      setLoading(true);
      try {
        const response = await api.getRoomDetails(roomCode as string);
        setDetails(response);
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 8,
            useNativeDriver: true,
          }),
        ]).start();
      } catch (error) {
        console.error("Error loading room details:", error);
        router.back();
      } finally {
        setLoading(false);
      }
    };

    loadRoomDetails();
  }, [roomCode]);

  const handleStart = () => {
    router.push(`/room/${roomCode}/game`);
  };

  if (!details) return null;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={["#bf00ff", "#8000ff"]}
            style={styles.iconBackground}
          >
            <MaterialCommunityIcons
              name="diamond-stone"
              size={50}
              color="#fff"
              style={styles.icon}
            />
          </LinearGradient>
        </View>

        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Owner of Arena :</Text>
            <Text style={styles.ownerName}>{details.owner}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Time :</Text>
            <Text style={styles.value}>{details.timeLimit} min</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Winner Prizes :</Text>
            <View style={styles.prizesList}>
              <Text style={styles.value}>1st - {details.prizes.first}k</Text>
              <Text style={styles.value}>2nd - {details.prizes.second}k</Text>
              <Text style={styles.value}>3rd - {details.prizes.third}k</Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={handleStart}
          style={styles.startButtonContainer}
        >
          <LinearGradient
            colors={["#bf00ff", "#8000ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.startButton}
          >
            <Text style={styles.startButtonText}>Start</Text>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0F",
    padding: 20,
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    width: "100%",
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    transform: [{ rotate: "45deg" }],
  },
  infoBox: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 40,
  },
  infoRow: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#4a9eff",
    marginBottom: 5,
  },
  ownerName: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  value: {
    fontSize: 20,
    color: "#fff",
  },
  prizesList: {
    marginTop: 5,
  },
  startButtonContainer: {
    width: "100%",
  },
  startButton: {
    width: "100%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
