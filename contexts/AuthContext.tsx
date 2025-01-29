import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface User {
  id: string;
  name: string;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  login: (name: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, password: string, role: string) => Promise<void>;
}

const BASE_URL = process.env.BASE_URL;
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (name: string, password: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        name,
        password,
      });
      const { jwtTocken, username } = response.data;
      console.log("Token received:", jwtTocken); // Debugging log
      await AsyncStorage.setItem("token", jwtTocken);
      await AsyncStorage.setItem("name", username);
      console.log("Token stored in AsyncStorage"); // Debugging log
      setUser(username);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      console.log("Token removed from AsyncStorage"); // Debugging log
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const register = async (name: string, password: string, role: string) => {
    try {
      console.log(name, password, role);
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        name,
        password,
        role,
      });
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
