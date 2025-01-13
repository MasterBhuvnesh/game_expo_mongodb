// import React, { useState, useEffect } from "react";
// import { View, StyleSheet } from "react-native";
// import { Text, Button } from "react-native-paper";
// import { useLocalSearchParams, router } from "expo-router";
// import { api } from "../../services/api";
// import { useLoading } from "../../contexts/LoadingContext";
// import GameBoard from "../../components/GameBoard";
// import InputSection from "../../components/InputSection";
// import ProfitSection from "../../components/ProfitSection";
// import { StatusBar } from "expo-status-bar";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function RoomScreen() {
//   const { roomCode } = useLocalSearchParams();
//   const [gameState, setGameState] = useState(api.initialGameState);
//   const [isGameStarted, setIsGameStarted] = useState(false);
//   const [bet, setBet] = useState(10);
//   const [mines, setMines] = useState(3);
//   const { setLoading } = useLoading();

//   const startGame = async () => {
//     setLoading(true);
//     try {
//       const newGameState = await api.startGame(bet, mines, roomCode as string);
//       setGameState(newGameState);
//       setIsGameStarted(true);
//     } catch (error) {
//       console.error("Error starting game:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGameEnd = (isWin: boolean) => {
//     setIsGameStarted(false);
//     // Implement win/lose logic
//   };

//   const handleCashOut = async () => {
//     if (!gameState.gameId) return;

//     setLoading(true);
//     try {
//       const cashoutAmount = await api.cashout(
//         gameState.gameId,
//         roomCode as string
//       );
//       setIsGameStarted(false);
//       setGameState(api.initialGameState);
//       // Show cashout amount to user
//     } catch (error) {
//       console.error("Error cashing out:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar style="auto" />
//       <Text style={styles.title}>Room: {roomCode}</Text>

//       <GameBoard
//         gameState={gameState}
//         setGameState={setGameState}
//         isGameStarted={isGameStarted}
//         onGameEnd={handleGameEnd}
//         bet={bet}
//         roomCode={roomCode as string}
//       />
//       <ProfitSection
//         profit={gameState.multiplier}
//         pointsToGain={bet * gameState.multiplier}
//         isGameStarted={isGameStarted}
//         onCashOut={handleCashOut}
//       />
//       <InputSection
//         bet={bet}
//         setBet={setBet}
//         mines={mines}
//         setMines={setMines}
//         startGame={startGame}
//         isGameStarted={isGameStarted}
//         maxBet={1000} // Adjust as needed
//       />
//       <Button
//         mode="outlined"
//         onPress={() => router.back()}
//         style={styles.button}
//       >
//         Leave Room
//       </Button>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1F2937",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     color: "#ffffff",
//     marginBottom: 20,
//     textAlign: "center",
//     fontFamily: "Poppins-Bold",
//   },
//   button: {
//     marginTop: 20,
//   },
// });

import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useLocalSearchParams, router } from "expo-router";
import { api } from "../../services/api";
import { useLoading } from "../../contexts/LoadingContext";
import GameBoard from "../../components/GameBoard";
import InputSection from "../../components/InputSection";
import ProfitSection from "../../components/ProfitSection";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

export default function RoomScreen() {
  const { roomCode } = useLocalSearchParams();
  const [gameState, setGameState] = useState(api.initialGameState);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [bet, setBet] = useState(10);
  const [mines, setMines] = useState(3);
  const { setLoading } = useLoading();

  const startGame = async () => {
    setLoading(true);
    try {
      const newGameState = await api.startGame(bet, mines, roomCode as string);
      setGameState(newGameState);
      setIsGameStarted(true);
    } catch (error) {
      console.error("Error starting game:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGameEnd = (isWin: boolean) => {
    setIsGameStarted(false);
  };

  const handleCashOut = async () => {
    if (!gameState.gameId) return;

    setLoading(true);
    try {
      const cashoutAmount = await api.cashout(
        gameState.gameId,
        roomCode as string
      );
      setIsGameStarted(false);
      setGameState(api.initialGameState);
    } catch (error) {
      console.error("Error cashing out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>Mines</Text>
        <View style={styles.leaderboardButton}>
          <Text style={styles.leaderboardText}>Leaderboard</Text>
          <Icon
            name="star-four-points"
            size={16}
            color="#fff"
            style={styles.sparkle}
          />
        </View>
      </View>

      <GameBoard
        gameState={gameState}
        setGameState={setGameState}
        isGameStarted={isGameStarted}
        onGameEnd={handleGameEnd}
        bet={bet}
        roomCode={roomCode as string}
      />
      <InputSection
        bet={bet}
        setBet={setBet}
        mines={mines}
        setMines={setMines}
        startGame={startGame}
        isGameStarted={isGameStarted}
        maxBet={1000}
      />
      <ProfitSection
        profit={gameState.multiplier}
        pointsToGain={bet * gameState.multiplier}
        isGameStarted={isGameStarted}
        onCashOut={handleCashOut}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "Poppins-Bold",
  },
  leaderboardButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7C3AED",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  leaderboardText: {
    color: "#fff",
    marginRight: 4,
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  sparkle: {
    marginLeft: 4,
  },
});
