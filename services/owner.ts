import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://backend-bt2q.onrender.com"; // Replace with your actual backend URL

/**
 * Checks if the user stored in AsyncStorage has the role `ROLE_OWNER` or `ROLE_ADMIN`.
 * @returns {Promise<boolean>} - Returns `true` if the user has `ROLE_OWNER` or `ROLE_ADMIN`, otherwise `false`.
 */
export async function isOwnerOrAdmin(): Promise<boolean> {
  try {
    // Step 1: Fetch the list of users from the API
    const response = await axios.get(`${BASE_URL}/getallusers`);
    const users = response.data;

    // Step 2: Retrieve the name stored in AsyncStorage
    const storedName = await AsyncStorage.getItem("name");

    if (!storedName) {
      console.warn("No name found in AsyncStorage");
      return false; // If no name is stored, return false
    }

    // Step 3: Find the user with the stored name
    const user = users.find((u: any) => u.name === storedName);

    if (!user) {
      console.warn(`User with name ${storedName} not found`);
      return false; // If the user is not found, return false
    }

    // Step 4: Check the user's role
    if (user.role === "ROLE_OWNER" || user.role === "ROLE_ADMIN") {
      return true; // User has the required role
    }

    return false; // User does not have the required role
  } catch (error) {
    console.error("Error checking user role:", error);
    return false; // Return false in case of any error
  }
}
