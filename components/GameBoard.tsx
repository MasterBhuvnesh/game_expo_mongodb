import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  Image,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { api, GameState } from "../services/api";

interface GameBoardProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  isGameStarted: boolean;
  onGameEnd: (isWin: boolean) => void;
  bet: number;
  roomCode: string;
  onCashOut: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  setGameState,
  isGameStarted,
  onGameEnd,
  roomCode,
  onCashOut,
}) => {
  const [gameStartAlertShown, setGameStartAlertShown] = useState(false);

  useEffect(() => {
    if (isGameStarted && !gameStartAlertShown) {
      Alert.alert("Game Started", "Good luck! Choose your path carefully.", [
        { text: "OK", onPress: () => setGameStartAlertShown(true) },
      ]);

      // alert("Game Started \n Good luck! Choose your path carefully."); // Debug log
      console.log("Game Started", "Good luck! Choose your path carefully."); // Debug log
    }
  }, [isGameStarted, gameStartAlertShown]);

  const handleBoxClick = async (index: number) => {
    if (
      !isGameStarted ||
      gameState.board[index] !== "empty" ||
      gameState.isGameOver ||
      !gameState.gameId
    )
      return;

    try {
      const newGameState = await api.clickBox(
        index,
        gameState.gameId,
        roomCode
      );
      setGameState(newGameState);

      if (newGameState.isGameOver) {
        // Show all mines if game is over
        const updatedBoard = newGameState.board.map((status) =>
          status === "mine" ? "mine" : status
        );
        setGameState((prevState) => ({ ...prevState, board: updatedBoard }));
        if (newGameState.isWin) {
          Alert.alert("You Win!", "Congratulations, you found the treasure!");
          // alert("You Win : Congratulations, you found the treasure!"); // Debug log
          console.log("You Win!", "Congratulations, you found the treasure!"); // Debug log
          onGameEnd(true);
        } else {
          Alert.alert("Game Over!", "You hit a bomb!");
          // alert("Game Over! : You hit a bomb!"); // Debug log
          console.log("Game Over!", "You hit a bomb!"); // Debug log
          onGameEnd(false);
        }
      }
    } catch (error) {
      console.error("Error handling box click:", error);
    }
  };

  const renderBoxContent = (status: "empty" | "mine" | "clicked" | "safe") => {
    switch (status) {
      case "clicked":
      case "safe":
        return (
          // <Icon
          //   name="diamond-stone"
          //   size={24}
          //   color="#7C3AED"
          // />
          <Image
            source={require("../assets/images/diamond.png")}
            style={{ width: 24, height: 24 }}
          />
        );
      case "mine":
        return (
          // <Icon
          //   name="bomb"
          //   size={24}
          //   color="red"
          // />
          <Image
            source={require("../assets/images/bomb.png")}
            style={{ width: 24, height: 24 }}
          />
        );
      default:
        return <Text style={styles.questionMark}></Text>;
    }
  };

  return (
    <View style={styles.container}>
      {(!isGameStarted || gameState.isGameOver) && (
        <Text
          style={{
            color: "#fff",
            fontSize: 14,
            marginBottom: 8,
            textAlign: "center",
            fontFamily: "Poppins-Medium",
            padding: 8,
          }}
        >
          Touch is locked until game starts
        </Text>
      )}
      <View style={styles.boardContainer}>
        <View style={styles.board}>
          {gameState.board.map((status, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.box,
                (status === "clicked" || status === "safe") &&
                  styles.clickedBox,
                status === "mine" && styles.mineBox,
                (!isGameStarted || gameState.isGameOver) && styles.disabledBox,
              ]}
              onPress={() => handleBoxClick(index)}
              disabled={
                !isGameStarted || status !== "empty" || gameState.isGameOver
              }
              testID="game-box"
            >
              {renderBoxContent(status)}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  boardContainer: {
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    marginBottom: 24,
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    aspectRatio: 1,
    justifyContent: "center",
  },
  box: {
    width: "18%",
    height: "18%",
    borderWidth: 1,
    margin: 1.5,
    borderColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  clickedBox: {
    backgroundColor: "rgba(124, 58, 237, 0.2)",
    borderColor: "#7C3AED",
  },
  mineBox: {
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    borderColor: "#EF4444",
  },
  disabledBox: {
    opacity: 0.8,
  },
  questionMark: {
    fontSize: 20,
    color: "#7C3AED",
    fontWeight: "600",
  },
});

export default GameBoard;
