import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";
import { TextInput, Checkbox } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  // Load Poppins fonts
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      router.replace("/home");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      console.log(email);
      setLoading(false);
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.formContainer}>
        <StatusBar style="light" />
        <Text style={styles.label}>User Id</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your user id"
          placeholderTextColor={"#6B7280"}
          value={email}
          onChangeText={setEmail}
          mode="flat"
          autoCapitalize="none"
          theme={{
            colors: {
              primary: "#8B5CF6",
              text: "#E5E7EB",
              placeholder: "#6B7280",
              background: "#121226",
            },
          }}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor={"#999999"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          mode="flat"
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              color="#6B7280"
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          theme={{
            colors: {
              primary: "#8B5CF6",
              text: "#E5E7EB",
              placeholder: "#999999",
              background: "red",
            },
          }}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          style={styles.button}
        >
          <LinearGradient
            colors={["#C236D1", "#8F28E4", "#1D1350"]}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't Have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#010013",
    fontFamily: "Poppins-Regular",
  },
  title: {
    fontSize: 42,
    color: "#fff",
    textAlign: "center",

    marginTop: 160,
    fontFamily: "Poppins-Bold",
    textShadowColor: "rgba(139, 92, 246, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#121226",
    marginTop: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    position: "absolute",
    bottom: 0,
    paddingTop: 20,
    paddingBottom: 40,
  },
  label: {
    color: "#E5E7EB",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    backgroundColor: "#121226",
    marginBottom: 16,
    height: 56,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  rememberForgotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    color: "#E5E7EB",
    marginLeft: 8,
    fontFamily: "Poppins-Regular",
  },
  forgotPassword: {
    color: "#8B5CF6",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  error: {
    color: "#EF4444",
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  button: {
    width: "100%",
    marginBottom: 24,
    borderRadius: 20,
    overflow: "hidden",
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "#E5E7EB",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  signupLink: {
    color: "#8B5CF6",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
});
