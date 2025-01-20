import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { api, LeaderboardEntry } from "../services/api";
import { useLocalSearchParams } from "expo-router";

export default function LeaderboardScreen() {
  const { roomCode } = useLocalSearchParams(); // Get the room code from the URL
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        if (typeof roomCode === "string") {
          const data = await api.getLeaderboard(roomCode);
          setLeaderboardData(data);
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
        setError("Failed to fetch leaderboard data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [roomCode]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6d28d9" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <MaterialCommunityIcons name="trophy" size={24} color="#ffd700" />
      </View>

      <ScrollView style={styles.leaderboard}>
        {leaderboardData.length > 0 ? (
          leaderboardData.map((entry, index) => (
            <View key={entry.gameId} style={styles.entry}>
              <View style={styles.rankContainer}>
                <Text style={styles.rank}>#{index + 1}</Text>
              </View>
              <Text style={styles.username}>Game ID: {entry.gameId}</Text>
              <Text style={styles.score}>${entry.cashoutAmount.toFixed(2)}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No leaderboard data available.</Text>
        )}
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
  },
  noDataText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});



// // implement logic

// import React, { useEffect, useState } from "react";
// import { View, StyleSheet, ScrollView, ActivityIndicator, Pressable, Alert } from "react-native";
// import { Text } from "react-native-paper";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { leaderboardapi, LeaderboardEntry } from "../services/leaderboard";
// import { useLocalSearchParams } from "expo-router";
// import { getGameIds } from "../utils/storage";
// import axios from "axios";

// export default function LeaderboardScreen() {
//   const { roomCode } = useLocalSearchParams(); // Get the room code from the URL
//   const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const BASE_URL = "http://localhost:8080"; // Replace with your actual backend URL

//   // Fetch cashout amounts for the stored game IDs and sum them
//   const fetchCashoutAmounts = async (roomCode: string) => {
//     try {
//       const gameIds = await getGameIds();
//       const response = await axios.get(
//         `${BASE_URL}/api/${roomCode}/game-cashouts`
//       );

//       const cashoutData = response.data;
//       let totalCashout = 0;

//       gameIds.forEach((gameId) => {
//         if (cashoutData[gameId]) {
//           totalCashout += cashoutData[gameId];
//         }
//       });

//       return totalCashout;
//     } catch (error) {
//       console.error("Error fetching cashout amounts:", error);
//       throw new Error("Failed to fetch cashout amounts");
//     }
//   };

//   // Update leaderboard with the total cashout amount
//   const updateLeaderboard = async () => {
//     try {
//       if (!roomCode || typeof roomCode !== "string") {
//         throw new Error("Invalid room code");
//       }

//       const totalCashout = await fetchCashoutAmounts(roomCode);
//       await leaderboardapi.updateLeaderboard(totalCashout);
//       Alert.alert("Success", "Leaderboard updated successfully!");
//     } catch (error) {
//       console.error("Error updating leaderboard:", error);
//       Alert.alert("Error", "Failed to update leaderboard. Please try again.");
//     }
//   };

//   // Fetch leaderboard data from the external API
//   const fetchLeaderboardData = async () => {
//     try {
//       const data = await leaderboardapi.getExternalLeaderboard();
//       setLeaderboardData(data);
//     } catch (error) {
//       console.error("Failed to fetch leaderboard:", error);
//       setError("Failed to fetch leaderboard data. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLeaderboardData();
//   }, []);

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#6d28d9" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Leaderboard</Text>
//         <MaterialCommunityIcons name="trophy" size={24} color="#ffd700" />
//       </View>

//       <ScrollView style={styles.leaderboard}>
//       {leaderboardData.length > 0 ? (
//   leaderboardData.map((entry, index) => (
//     <View key={entry.gameId} style={styles.entry}>
//       <View style={styles.rankContainer}>
//         <Text style={styles.rank}>#{index + 1}</Text>
//       </View>
//       <Text style={styles.username}>Game ID: {entry.gameId}</Text>
//       <Text style={styles.score}>${entry.cashoutAmount.toFixed(2)}</Text>
//     </View>
//   ))
// ) : (
//   <Text style={styles.noDataText}>No leaderboard data available.</Text>
// )}
//       </ScrollView>

//       <Pressable style={styles.updateButton} onPress={updateLeaderboard}>
//         <Text style={styles.updateButtonText}>Update Leaderboard</Text>
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0a0a0a",
//     padding: 16,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 12,
//     marginBottom: 24,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   leaderboard: {
//     flex: 1,
//   },
//   entry: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "#1a1a1a",
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   rankContainer: {
//     width: 40,
//     height: 40,
//     backgroundColor: "#2a2a2a",
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   rank: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   username: {
//     flex: 1,
//     color: "#fff",
//     fontSize: 16,
//   },
//   score: {
//     color: "#6d28d9",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#0a0a0a",
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#0a0a0a",
//   },
//   errorText: {
//     color: "#ff4444",
//     fontSize: 16,
//   },
//   noDataText: {
//     color: "#fff",
//     fontSize: 16,
//     textAlign: "center",
//     marginTop: 20,
//   },
//   updateButton: {
//     backgroundColor: "#7C3AED",
//     padding: 16,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 16,
//   },
//   updateButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });