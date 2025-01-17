// // import React from "react";
// // import { StyleSheet, View, TouchableOpacity } from "react-native";
// // import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
// // import { api, GameState } from "../services/api";

// // interface GameBoardProps {
// //   gameState: GameState;
// //   setGameState: React.Dispatch<React.SetStateAction<GameState>>;
// //   isGameStarted: boolean;
// //   onGameEnd: (isWin: boolean) => void;
// //   bet: number;
// //   roomCode: string;
// // }

// // const GameBoard: React.FC<GameBoardProps> = ({
// //   gameState,
// //   setGameState,
// //   isGameStarted,
// //   onGameEnd,
// //   roomCode,
// // }) => {
// //   const handleBoxClick = async (index: number) => {
// //     if (
// //       !isGameStarted ||
// //       gameState.board[index] !== "empty" ||
// //       gameState.isGameOver ||
// //       !gameState.gameId
// //     )
// //       return;

// //     try {
// //       const newGameState = await api.clickBox(
// //         index,
// //         gameState.gameId,
// //         roomCode
// //       );
// //       setGameState(newGameState);

// //       if (newGameState.isGameOver) {
// //         onGameEnd(newGameState.isWin);
// //       }
// //     } catch (error) {
// //       console.error("Error handling box click:", error);
// //     }
// //   };

// //   const renderBoxContent = (status: "empty" | "mine" | "clicked" | "safe") => {
// //     switch (status) {
// //       case "clicked":
// //       case "safe":
// //         return (
// //           <Icon
// //             name="diamond-stone"
// //             size={30}
// //             color="#00e701"
// //           />
// //         );
// //       case "mine":
// //         return (
// //           <Icon
// //             name="bomb"
// //             size={30}
// //             color="#ff4d4d"
// //           />
// //         );
// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <View style={styles.board}>
// //       {gameState.board.map((status, index) => (
// //         <TouchableOpacity
// //           key={index}
// //           style={[
// //             styles.box,
// //             (status === "clicked" || status === "safe") && styles.clickedBox,
// //             (!isGameStarted || gameState.isGameOver) && styles.disabledBox,
// //           ]}
// //           onPress={() => handleBoxClick(index)}
// //           disabled={
// //             !isGameStarted || status !== "empty" || gameState.isGameOver
// //           }
// //           testID="game-box"
// //         >
// //           {renderBoxContent(status)}
// //         </TouchableOpacity>
// //       ))}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   board: {
// //     flexDirection: "row",
// //     flexWrap: "wrap",
// //     width: 250,
// //     height: 250,
// //   },
// //   box: {
// //     width: 50,
// //     height: 50,
// //     borderWidth: 1,
// //     borderColor: "#3f4152",
// //     backgroundColor: "#242B35",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   clickedBox: {
// //     backgroundColor: "#2f3443",
// //   },
// //   disabledBox: {
// //     opacity: 0.5,
// //   },
// // });

// // export default GameBoard;

import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { api, GameState } from "../services/api";

interface GameBoardProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  isGameStarted: boolean;
  onGameEnd: (isWin: boolean) => void;
  bet: number;
  roomCode: string;
}

const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  setGameState,
  isGameStarted,
  onGameEnd,
  roomCode,
}) => {
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
        onGameEnd(newGameState.isWin);
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
          <Icon
            name="diamond-stone"
            size={24}
            color="#7C3AED"
          />
        );
      case "mine":
        return (
          <Icon
            name="bomb"
            size={24}
            color="#ff4d4d"
          />
        );
      default:
        return <Text style={styles.questionMark}>?</Text>;
    }
  };

  return (
    <View style={styles.boardContainer}>
      <View style={styles.board}>
        {gameState.board.map((status, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.box,
              (status === "clicked" || status === "safe") && styles.clickedBox,
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
  );
};

const styles = StyleSheet.create({
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
  },
  disabledBox: {
    opacity: 0.5,
  },
  questionMark: {
    fontSize: 20,
    color: "#7C3AED",
    fontWeight: "600",
  },
});

export default GameBoard;
