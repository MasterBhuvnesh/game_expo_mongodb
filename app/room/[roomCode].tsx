// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Animated, Pressable } from "react-native";
// import { Text } from "react-native-paper";
// import { useLocalSearchParams, router } from "expo-router";
// import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { api } from "@/services/api";
// import { useLoading } from "@/contexts/LoadingContext";
// import GameBoard from "@/components/GameBoard";
// import InputSection from "@/components/InputSection";
// import ProfitSection from "@/components/ProfitSection";
// import { StatusBar } from "expo-status-bar";
// import { SafeAreaView } from "react-native-safe-area-context";

// interface RoomDetails {
//   owner: string;
//   timeLimit: number;
//   prizes: {
//     first: number;
//     second: number;
//     third: number;
//   };
// }

// export default function RoomDetailsScreen() {
//   const { roomCode } = useLocalSearchParams();
//   const { setLoading } = useLoading();
//   const [details, setDetails] = useState<RoomDetails | null>(null);
//   const [gameState, setGameState] = useState(api.initialGameState);
//   const [isGameStarted, setIsGameStarted] = useState(false);
//   const [bet, setBet] = useState(10);
//   const [mines, setMines] = useState(3);
//   const fadeAnim = React.useRef(new Animated.Value(0)).current;
//   const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

 

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
//     } catch (error) {
//       console.error("Error cashing out:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLeaderboardPress = () => {
//     if (typeof roomCode === "string") {
//       router.push(`/leaderboard?roomCode=${roomCode}`);
//     }
//   };

//   if (!details) return null;

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar style="light" />
//       <View style={styles.header}>
//         <Text style={styles.title}>Mines</Text>
//         <Pressable
//           style={styles.leaderboardButton}
//           onPress={handleLeaderboardPress}
//         >
//           <Text style={styles.leaderboardText}>Leaderboard</Text>
//           <Icon
//             name="star-four-points"
//             size={16}
//             color="#fff"
//             style={styles.sparkle}
//           />
//         </Pressable>
//       </View>

//       <Animated.View
//         style={[
//           styles.content,
//           {
//             opacity: fadeAnim,
//             transform: [{ scale: scaleAnim }],
//           },
//         ]}
//       >
//         <View style={styles.iconContainer}>
//           {/* <LinearGradient
//             colors={["#bf00ff", "#8000ff"]}
//             style={styles.iconBackground}
//           >
//             <Icon
//               name="diamond-stone"
//               size={50}
//               color="#fff"
//               style={styles.icon}
//             />
//           </LinearGradient> */}
//         </View>


//         <GameBoard
//           gameState={gameState}
//           setGameState={setGameState}
//           isGameStarted={isGameStarted}
//           onGameEnd={handleGameEnd}
//           bet={bet}
//           roomCode={roomCode as string}
//         />

//         <InputSection
//           bet={bet}
//           setBet={setBet}
//           mines={mines}
//           setMines={setMines}
//           startGame={startGame}
//           isGameStarted={isGameStarted}
//           maxBet={1000}
//         />

//         <ProfitSection
//           profit={gameState.multiplier}
//           pointsToGain={bet * gameState.multiplier}
//           isGameStarted={isGameStarted}
//           onCashOut={handleCashOut}
//         />
//       </Animated.View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0A0A0F",
//     padding: 20,
//     justifyContent: "center",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 24,
//   },
//   title: {
//     fontSize: 24,
//     color: "#fff",
//     fontFamily: "Poppins-Bold",
//   },
//   leaderboardButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#7C3AED",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//   },
//   leaderboardText: {
//     color: "#fff",
//     marginRight: 4,
//     fontSize: 14,
//     fontFamily: "Poppins-Medium",
//   },
//   sparkle: {
//     marginLeft: 4,
//   },
//   content: {
//     alignItems: "center",
//     width: "100%",
//   },
//   iconContainer: {
//     marginBottom: 40,
//   },
//   iconBackground: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   icon: {
//     transform: [{ rotate: "45deg" }],
//   },
//   infoBox: {
//     width: "100%",
//     backgroundColor: "rgba(255, 255, 255, 0.1)",
//     borderRadius: 15,
//     padding: 20,
//     marginBottom: 40,
//   },
//   infoRow: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     color: "#4a9eff",
//     marginBottom: 5,
//   },
//   ownerName: {
//     fontSize: 24,
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   value: {
//     fontSize: 20,
//     color: "#fff",
//   },
//   prizesList: {
//     marginTop: 5,
//   },
// });



import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated, Pressable, Alert } from "react-native";
import { Text } from "react-native-paper";
import { useLocalSearchParams, router } from "expo-router";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { api } from "@/services/api";
import { useLoading } from "@/contexts/LoadingContext";
import GameBoard from "@/components/GameBoard";
import InputSection from "@/components/InputSection";
import ProfitSection from "@/components/ProfitSection";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/contexts/AuthContext";

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
  const { user } = useAuth();
  const [gameState, setGameState] = useState(api.initialGameState);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [bet, setBet] = useState(10);
  const [mines, setMines] = useState(3);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const startGame = async () => {
    if (!roomCode || typeof roomCode !== 'string') {
      Alert.alert('Error', 'Invalid room code');
      return;
    }

    setLoading(true);
    try {
      const newGameState = await api.startGame(bet, mines, roomCode);
      setGameState(newGameState);
      setIsGameStarted(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to start game. Please try again.');
      console.error("Error starting game:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleBoxClick = async (index: number) => {
  //   if (!gameState.gameId || !roomCode || typeof roomCode !== 'string') return;

  //   setLoading(true);
  //   try {
  //     const newGameState = await api.clickBox(index, gameState.gameId, roomCode);
  //     setGameState(newGameState);

  //     if (newGameState.isGameOver) {
  //       handleGameEnd(newGameState.isWin);
  //     }
  //   } catch (error) {
  //     Alert.alert('Error', 'Failed to make move. Please try again.');
  //     console.error("Error making move:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleGameEnd = (isWin: boolean) => {
    setIsGameStarted(false);
    if (isWin) {
      Alert.alert('Congratulations!', 'You won! Would you like to play again?');
    }
  };

  const handleCashOut = async () => {
    if (!gameState.gameId || !roomCode || typeof roomCode !== 'string') return;

    setLoading(true);
    try {
      const cashoutAmount = await api.cashout(gameState.gameId, roomCode);
      Alert.alert('Success', `Successfully cashed out ${cashoutAmount} coins!`);
      setIsGameStarted(false);
      setGameState(api.initialGameState);
    } catch (error) {
      Alert.alert('Error', 'Failed to cash out. Please try again.');
      console.error("Error cashing out:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLeaderboardPress = () => {
    if (typeof roomCode === "string") {
      router.push(`/leaderboard?roomCode=${roomCode}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>Mines</Text>
        <Pressable
          style={styles.leaderboardButton}
          onPress={handleLeaderboardPress}
        >
          <Text style={styles.leaderboardText}>Leaderboard</Text>
          <Icon
            name="star-four-points"
            size={16}
            color="#fff"
            style={styles.sparkle}
          />
        </Pressable>
      </View>

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
          {/* <LinearGradient
            colors={["#bf00ff", "#8000ff"]}
            style={styles.iconBackground}
          >
            <Icon
              name="diamond-stone"
              size={50}
              color="#fff"
              style={styles.icon}
            />
          </LinearGradient> */}
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
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0F",
    padding: 20,
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
  }
});