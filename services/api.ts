import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "YOUR_BACKEND_URL"; // Replace with your actual backend URL

export type BoxStatus = "empty" | "mine" | "clicked" | "safe";

export interface GameState {
  board: BoxStatus[];
  isGameOver: boolean;
  isWin: boolean;
  multiplier: number;
  gameId?: string;
}

class ApiService {
  private async getToken() {
    return await AsyncStorage.getItem("token");
  }

  private getAuthHeader = async () => {
    const token = await this.getToken();
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  };

  async getRooms() {
    try {
      const response = await axios.get(
        `${BASE_URL}/rooms`,
        await this.getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error("Error getting rooms:", error);
      throw error;
    }
  }

  async createRoom(timeoutMinutes: number) {
    try {
      const response = await axios.post(
        `${BASE_URL}/rooms`,
        { timeoutMinutes },
        await this.getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error("Error creating room:", error);
      throw error;
    }
  }

  async joinRoom(roomCode: string) {
    try {
      const response = await axios.post(
        `${BASE_URL}/rooms/${roomCode}/join`,
        {},
        await this.getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error("Error joining room:", error);
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

      // Convert backend response to frontend state
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
      };
    } catch (error) {
      console.error("Error making move:", error);
      throw error;
    }
  }

  async cashout(gameId: string, roomCode: string): Promise<number> {
    try {
      const response = await axios.post(
        `${BASE_URL}/rooms/${roomCode}/games/${gameId}/cashout`,
        {},
        await this.getAuthHeader()
      );
      return response.data.cashoutAmount;
    } catch (error) {
      console.error("Error cashing out:", error);
      throw error;
    }
  }

  async getRoomDetails(roomCode: string) {
    try {
      const response = await axios.get(
        `${BASE_URL}/rooms/${roomCode}/details`,
        await this.getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error("Error getting room details:", error);
      throw error;
    }
  }

  async getLeaderboard() {
    try {
      const response = await axios.get(
        `${BASE_URL}/leaderboard`,
        await this.getAuthHeader()
      );
      return response.data;
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
  };
}

export const api = new ApiService();
