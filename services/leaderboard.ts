import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";



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

  // Fetch leaderboard data from the external API
  async getExternalLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/leaderboard",
        await this.getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching external leaderboard:", error);
      throw error;
    }
  }

  // Update leaderboard with cashout amount
  async updateLeaderboard(cashoutAmount: number) {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/leaderboard",
        { cashoutAmount },
        await this.getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error("Error updating leaderboard:", error);
      throw error;
    }
  }


}

export const leaderboardapi = new ApiService();