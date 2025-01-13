import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
}

export default function LeaderboardScreen() {
  // Mock data - replace with actual API call
  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, username: "Player1", score: 1000 },
    { rank: 2, username: "Player2", score: 850 },
    { rank: 3, username: "Player3", score: 700 },
    // Add more entries as needed
  ];

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
        {leaderboardData.map((entry) => (
          <View
            key={entry.rank}
            style={styles.entry}
          >
            <View style={styles.rankContainer}>
              <Text style={styles.rank}>#{entry.rank}</Text>
            </View>
            <Text style={styles.username}>{entry.username}</Text>
            <Text style={styles.score}>{entry.score}</Text>
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
