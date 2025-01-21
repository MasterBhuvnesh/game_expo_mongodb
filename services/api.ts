import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import CashoutModal from "@/components/CashoutModal";

const BASE_URL = "https://minesbackend-production.up.railway.app"; // Replace with your actual backend URL

export type BoxStatus = "empty" | "mine" | "clicked" | "safe";

export interface GameState {
  board: BoxStatus[];
  isGameOver: boolean;
  isWin: boolean;
  multiplier: number;
  gameId?: string;
  isCashOut: boolean;
  cashoutAmount?: number; // Add cashoutAmount property to GameState
}

export interface LeaderboardEntry {
  gameId: string;
  cashoutAmount: number;
}

class ApiService {
  private async getAuthHeader() {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Retrieved token:", token); // Debug log
      if (token) {
        return {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      }
      console.warn("Token is not available in AsyncStorage");
      return {};
    } catch (error) {
      console.error("Error getting auth header:", error);
      return {};
    }
  }

  // Join a room with Authorization header
  async joinRoom(roomCode: string) {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/join-room?code=${roomCode}`,
        {},
        await this.getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error("Error joining room:", error);
      throw error;
    }
  }

  async getRooms() {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/rooms`,
        await this.getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error("Error getting rooms:", error);
      throw error;
    }
  }

  async createRoom() {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/admin/create-room?timeoutMinutes=100&`,
        {},
        await this.getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error("Error creating room:", error);
      throw error;
    }
  }

  async startGame(
    bet: number,
    mines: number,
    roomCode: string
  ): Promise<GameState> {
    try {
      const response = await axios.post(
        `${BASE_URL}/rooms/${roomCode}/games/start`,
        { betAmount: bet, numMines: mines },
        await this.getAuthHeader()
      );

      return {
        board: new Array(25).fill("empty"),
        isGameOver: false,
        isWin: false,
        multiplier: 1.0,
        gameId: response.data.id,
        isCashOut: false,
      };
    } catch (error) {
      console.error("Error starting game:", error);
      throw error;
    }
  }

  async clickBox(
    index: number,
    gameId: string,
    roomCode: string
  ): Promise<GameState> {
    try {
      const response = await axios.post(
        `${BASE_URL}/rooms/${roomCode}/games/move`,
        {
          gameId: gameId,
          move: index,
        },
        await this.getAuthHeader()
      );

      const newBoard = new Array(25).fill("empty");
      response.data.revealed.forEach((pos: number) => {
        newBoard[pos] = "clicked";
      });

      if (response.data.gameState === "LOST") {
        response.data.mines.forEach((pos: number) => {
          newBoard[pos] = "mine";
        });
      }

      return {
        board: newBoard,
        isGameOver: response.data.gameState !== "IN_PROGRESS",
        isWin: response.data.gameState === "WON",
        multiplier: response.data.multiplier,
        gameId: response.data.id,
        isCashOut: false,
      };
    } catch (error) {
      console.error("Error making move:", error);
      throw error;
    }
  }

  async cashout(gameId: string, roomCode: string): Promise<GameState> {
    try {
      const response = await axios.post(
        `${BASE_URL}/rooms/${roomCode}/games/${gameId}/cashout`,
        {},
        await this.getAuthHeader()
      );
      console.log("Cashout Amount:", response.data.cashoutAmount); // Debug log

      const newBoard = new Array(25).fill("empty");

      return {
        board: newBoard,
        isGameOver: true,
        isWin: false,
        multiplier: 1,
        gameId: gameId,
        isCashOut: true,
        cashoutAmount: response.data.cashoutAmount, // Return the cashoutAmount
      };
    } catch (error) {
      console.error("Error cashing out:", error);
      throw error;
    }
  }
  async getLeaderboard(roomCode: string): Promise<LeaderboardEntry[]> {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/${roomCode}/game-cashouts`,
        await this.getAuthHeader()
      );

      // Transform the response object into an array of LeaderboardEntry objects
      const leaderboardData: LeaderboardEntry[] = Object.entries(
        response.data
      ).map(([gameId, cashoutAmount]) => ({
        gameId,
        cashoutAmount: Number(cashoutAmount), // Ensure cashoutAmount is a number
      }));

      // Sort the leaderboard by cashoutAmount in descending order
      leaderboardData.sort((a, b) => b.cashoutAmount - a.cashoutAmount);

      return leaderboardData;
    } catch (error) {
      console.error("Error getting leaderboard:", error);
      throw error;
    }
  }

  initialGameState: GameState = {
    board: new Array(25).fill("empty"),
    isGameOver: false,
    isWin: false,
    multiplier: 1.0,
    isCashOut: false,
  };
}

export const api = new ApiService();
