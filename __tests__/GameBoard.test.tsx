import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import GameBoard from "../components/GameBoard";
import { api } from "../services/api";

jest.mock("../services/api", () => ({
  api: {
    clickBox: jest.fn(),
  },
}));

describe("GameBoard", () => {
  const mockGameState = {
    board: Array(25).fill("empty"),
    isGameOver: false,
    isWin: false,
    multiplier: 1,
    gameId: "123",
  };

  const mockSetGameState = jest.fn();
  const mockOnGameEnd = jest.fn();

  it("renders correctly", () => {
    const { getAllByTestId } = render(
      <GameBoard
        gameState={mockGameState}
        setGameState={mockSetGameState}
        isGameStarted={true}
        onGameEnd={mockOnGameEnd}
        bet={10}
        roomCode="ABC123"
      />
    );

    const boxes = getAllByTestId("game-box");
    expect(boxes).toHaveLength(25);
  });

  it("handles box click correctly", async () => {
    const newGameState = {
      ...mockGameState,
      board: [...mockGameState.board],
    };
    newGameState.board[0] = "clicked";
    (api.clickBox as jest.Mock).mockResolvedValue(newGameState);

    const { getAllByTestId } = render(
      <GameBoard
        gameState={mockGameState}
        setGameState={mockSetGameState}
        isGameStarted={true}
        onGameEnd={mockOnGameEnd}
        bet={10}
        roomCode="ABC123"
      />
    );

    const boxes = getAllByTestId("game-box");
    fireEvent.press(boxes[0]);

    expect(api.clickBox).toHaveBeenCalledWith(0, "123", "ABC123");
    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for state update
    expect(mockSetGameState).toHaveBeenCalledWith(newGameState);
  });

  it("disables boxes when game is not started", () => {
    const { getAllByTestId } = render(
      <GameBoard
        gameState={mockGameState}
        setGameState={mockSetGameState}
        isGameStarted={false}
        onGameEnd={mockOnGameEnd}
        bet={10}
        roomCode="ABC123"
      />
    );

    const boxes = getAllByTestId("game-box");
    boxes.forEach((box) => {
      expect(box).toBeDisabled();
    });
  });
});
