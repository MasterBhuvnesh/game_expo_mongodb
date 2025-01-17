import React, { useState } from "react";
import { View, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { router } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await register(email, password, "ROLE_USER");
      router.replace("/home");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Sign Up</Text>
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
          placeholderTextColor={"#6B7280"}
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
              placeholder: "#6B7280",
              background: "red",
            },
          }}
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          placeholderTextColor={"#6B7280"}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
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
              placeholder: "#6B7280",
              background: "red",
            },
          }}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity
          onPress={handleRegister}
          disabled={loading}
          style={styles.button}
        >
          <LinearGradient
            colors={["#C236D1", "#8F28E4", "#1D1350"]}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Signup</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.logincontainer}>
          <Text style={styles.signupText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.loginlink}>Login</Text>
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
  logincontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "#E5E7EB",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  loginlink: {
    color: "#8B5CF6",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
});
