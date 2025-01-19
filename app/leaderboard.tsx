import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { api, LeaderboardEntry } from "../services/api";
import { useLocalSearchParams } from "expo-router";

export default function LeaderboardScreen() {
  const { roomCode } = useLocalSearchParams(); // Get the room code from the URL
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        if (typeof roomCode === "string") {
          const data = await api.getLeaderboard(roomCode);
          setLeaderboardData(data);
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, [roomCode]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <MaterialCommunityIcons
          name="trophy"
          size={24}
          color="#ffd700"
        />
      </View>

      <ScrollView style={styles.leaderboard}>
        {leaderboardData.map((entry, index) => (
          <View
            key={entry.gameId}
            style={styles.entry}
          >
            <View style={styles.rankContainer}>
              <Text style={styles.rank}>#{index + 1}</Text>
            </View>
            <Text style={styles.username}>Game ID: {entry.gameId}</Text>
            <Text style={styles.score}>{entry.cashoutAmount}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  leaderboard: {
    flex: 1,
  },
  entry: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    marginBottom: 8,
  },
  rankContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#2a2a2a",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rank: {
    color: "#fff",
    fontWeight: "bold",
  },
  username: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  score: {
    color: "#6d28d9",
    fontSize: 16,
    fontWeight: "bold",
  },
});
