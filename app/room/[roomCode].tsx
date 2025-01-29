import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Pressable,
  ToastAndroid,
  Alert,
} from "react-native";
import { Text } from "react-native-paper";
import { useLocalSearchParams, router } from "expo-router";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { api } from "@/services/api";
import { useLoading } from "@/contexts/LoadingContext";
import GameBoard from "@/components/GameBoard";
import InputSection from "@/components/InputSection";
import ProfitSection from "@/components/ProfitSection";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/contexts/AuthContext";
import CashoutModal from "@/components/CashoutModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function RoomDetailsScreen() {
  const { roomCode } = useLocalSearchParams();
  const { setLoading } = useLoading();
  const { user } = useAuth();
  const [gameState, setGameState] = useState(api.initialGameState);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [bet, setBet] = useState(10);
  const [mines, setMines] = useState(3);
  const [isCashoutModalVisible, setIsCashoutModalVisible] = useState(false);
  const [cashoutAmount, setCashoutAmount] = useState(0);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [timeoutMinutes, setTimeoutMinutes] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<string>("00:00");
  const [coins, setCoins] = useState<number>(0);
  const [alertShown, setAlertShown] = useState(false);
  const [alertShown10Sec, setAlertShown10Sec] = useState(false);
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

  useEffect(() => {
    if (roomCode && typeof roomCode === "string") {
      fetchRoomDetails(roomCode);
    }
  }, [roomCode]);

  const fetchRoomDetails = async (roomCode: string) => {
    try {
      const response = await api.joinRoom(roomCode);
      setCreatedAt(response.createdAt);
      setTimeoutMinutes(response.timeout);
      setAlertShown(false);
      setAlertShown10Sec(false);

      if (response.coins) {
        setCoins(response.coins);
        await AsyncStorage.setItem("coins", response.coins.toString());
      }
    } catch (error: any) {
      console.log("Error fetching room details:", error); // For Debugging
    }
  };

  useEffect(() => {
    if (createdAt && timeoutMinutes) {
      const createdAtDate = new Date(createdAt);
      const localCreatedAt = new Date(
        createdAtDate.getTime() + (5 * 60 + 30) * 60000
      );
      const endTime = new Date(
        localCreatedAt.getTime() + timeoutMinutes * 60000
      );

      const now = new Date();
      if (endTime <= now) {
        setRemainingTime("00:00");
        handleGameEnd(false);
        showEndGameToast();
        redirectToLeaderboard();
        return;
      }

      const interval = setInterval(() => {
        const now = new Date();
        const diff = endTime.getTime() - now.getTime();

        if (diff <= 0) {
          clearInterval(interval);
          setRemainingTime("00:00");
          handleGameEnd(false);
          showEndGameToast();
          redirectToLeaderboard();
          return;
        }

        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setRemainingTime(
          `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
        );

        if (diff <= 60000 && !alertShown) {
          ToastAndroid.show(
            "Only 1 minute left to cash out!",
            ToastAndroid.SHORT
          );
          setAlertShown(true);
        }

        if (diff <= 10000 && !alertShown10Sec) {
          ToastAndroid.show(
            "Last 10 sec left to cash out!",
            ToastAndroid.SHORT
          );
          setAlertShown10Sec(true);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [createdAt, timeoutMinutes, alertShown, alertShown10Sec]);

  const showEndGameToast = () => {
    ToastAndroid.show("Time's up! The game has ended.", ToastAndroid.SHORT);
  };

  const redirectToLeaderboard = () => {
    setTimeout(() => {
      if (typeof roomCode === "string") {
        router.replace(`/leaderboard?roomCode=${roomCode}`);
      }
    }, 3000);
  };
  const handleGameEnd = async (isWin: boolean) => {
    setIsGameStarted(false);

    let updatedCoins = coins;
    if (isWin) {
      if (mines === 24) {
        updatedCoins += bet * 24.75;
      } else {
        updatedCoins += bet * gameState.multiplier;
        console.log(
          "Total Amount , Multiplier",
          updatedCoins,
          gameState.multiplier
        ); // For Debugging
      }
      ToastAndroid.show("Congratulations! You won!", ToastAndroid.SHORT);
    } else {
      updatedCoins -= bet;
    }

    setCoins(updatedCoins);
    await AsyncStorage.setItem("coins", updatedCoins.toString());

    if (updatedCoins <= 0) {
      ToastAndroid.show(
        "You're out of coins! Redirecting to leaderboard...",
        ToastAndroid.SHORT
      );
      setTimeout(() => {
        if (typeof roomCode === "string") {
          router.replace(`/leaderboard?roomCode=${roomCode}`);
        }
      }, 2000);
    }
  };

  const startGame = async () => {
    if (!roomCode || typeof roomCode !== "string") {
      Alert.alert("Error", "Invalid room code");
      return;
    }

    if (bet > coins) {
      ToastAndroid.show("Insufficient coins!", ToastAndroid.SHORT);
      return;
    }

    setLoading(true);
    try {
      const newGameState = await api.startGame(bet, mines, roomCode);
      setGameState(newGameState);
      setIsGameStarted(true);
      console.log("Game ID:", newGameState.gameId); // For Debugging

      const updatedCoins = coins - bet;
      setCoins(updatedCoins);
      await AsyncStorage.setItem("coins", updatedCoins.toString());
    } catch (error) {
      Alert.alert("Error", "Failed to start game. Please try again.");
      console.log("Error starting game:", error); // For Debugging
    } finally {
      setLoading(false);
    }
  };

  const handleCashOut = async () => {
    if (!gameState.gameId || !roomCode || typeof roomCode !== "string") return;

    setLoading(true);
    try {
      const newGameState = await api.cashout(gameState.gameId, roomCode);
      setCashoutAmount(newGameState.cashoutAmount || 0);
      setIsCashoutModalVisible(true);
      setIsGameStarted(false);
      setGameState(newGameState);

      const updatedCoins = coins + (newGameState.cashoutAmount || 0);
      setCoins(updatedCoins);
      await AsyncStorage.setItem("coins", updatedCoins.toString());
    } catch (error) {
      Alert.alert("Error", "Failed to cash out. Please try again.");
      console.log("Error cashing out:", error); // For Debugging
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
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <FontAwesome6
            name="coins"
            size={14}
            color="orange"
          />
          <Text style={{ fontFamily: "Poppins-Medium", fontSize: 14 }}>
            Coins: {coins.toFixed(3)}
          </Text>
        </View>
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
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{remainingTime}</Text>
        <Icon
          name="clock"
          size={20}
          color="#fff"
          style={styles.timerIcon}
        />
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
        <GameBoard
          gameState={gameState}
          setGameState={setGameState}
          isGameStarted={isGameStarted}
          onGameEnd={handleGameEnd}
          bet={bet}
          roomCode={roomCode as string}
          onCashOut={handleCashOut}
        />

        <InputSection
          bet={bet}
          setBet={setBet}
          mines={mines}
          setMines={setMines}
          startGame={startGame}
          isGameStarted={isGameStarted}
          maxBet={coins}
        />

        <ProfitSection
          profit={gameState.multiplier}
          pointsToGain={bet * gameState.multiplier}
          isGameStarted={isGameStarted}
          onCashOut={handleCashOut}
        />
      </Animated.View>

      <CashoutModal
        isVisible={isCashoutModalVisible}
        cashoutAmount={cashoutAmount}
        onClose={() => setIsCashoutModalVisible(false)}
      />
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
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1F1F2B",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  timerText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    marginRight: 8,
  },
  timerIcon: {
    marginLeft: 4,
  },
});
