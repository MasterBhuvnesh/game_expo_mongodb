import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { api, LeaderboardEntry } from "../services/api";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { CurrencyRupeeIcon } from "react-native-heroicons/solid";

export default function LeaderboardScreen() {
  const { roomCode } = useLocalSearchParams(); // Get the room code from the URL
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    try {
      if (typeof roomCode === "string") {
        const data = await api.getLeaderboard(roomCode);
        setLeaderboardData(data);
      }
    } catch (error) {
      setError("No games have been played yet.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [roomCode]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#6d28d9"
        />
      </SafeAreaView>
    );
  }

  if (error) {
    console.log(error);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <MaterialCommunityIcons
          name="trophy"
          size={24}
          color="#ffd700"
        />
      </View>

      <ScrollView
        style={styles.leaderboard}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {leaderboardData.length > 0 ? (
          leaderboardData.map((entry, index) => (
            <View
              key={entry.gameId}
              style={[
                styles.entry,
                index === 0 && {
                  borderColor: "white",
                  borderWidth: 2,
                  padding: 18,
                  shadowColor: "white",
                  shadowOffset: { width: 4, height: 2 },
                  shadowOpacity: 0.9,
                  shadowRadius: 2,
                  elevation: 5,
                },
              ]}
            >
              <View style={styles.rankContainer}>
                <Text style={styles.rank}>{index + 1}</Text>
              </View>
              <Text style={styles.username}>{entry.gameId}</Text>
              <View
                style={{
                  gap: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "white", //debug color
                  borderRadius: 8,
                  padding: 8,
                }}
              >
                <CurrencyRupeeIcon
                  size={18}
                  color="orange"
                />
                <Text
                  style={[
                    styles.score,
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    },
                  ]}
                >
                  {entry.cashoutAmount.toFixed(2)}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No leaderboard data available.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
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
    color: "#fff",
    fontFamily: "Poppins-Bold",
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
    fontSize: 14,
    fontFamily: "Poppins-Bold",
  },
  username: {
    flex: 1,
    color: "#fff",
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    paddingRight: 12,
  },
  score: {
    color: "#6d28d9",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a0a",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a0a",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  noDataText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
