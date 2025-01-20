import AsyncStorage from "@react-native-async-storage/async-storage";

// Store a game ID in AsyncStorage
export const storeGameId = async (gameId: string) => {
  try {
    const existingGameIds = await AsyncStorage.getItem("gameIds");
    const gameIds = existingGameIds ? JSON.parse(existingGameIds) : [];
    gameIds.push(gameId);
    await AsyncStorage.setItem("gameIds", JSON.stringify(gameIds));
  } catch (error) {
    console.error("Error storing game ID:", error);
  }
};

// Retrieve all stored game IDs from AsyncStorage
export const getGameIds = async (): Promise<string[]> => {
  try {
    const gameIds = await AsyncStorage.getItem("gameIds");
    return gameIds ? JSON.parse(gameIds) : [];
  } catch (error) {
    console.error("Error retrieving game IDs:", error);
    return [];
  }
};