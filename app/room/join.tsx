// import React, { useState } from "react";
// import { View, StyleSheet } from "react-native";
// import { Text } from "react-native-paper";
// import { router } from "expo-router";
// import { CodeInput } from "../../components/CodeInput";
// import { useLoading } from "../../contexts/LoadingContext";
// import { api } from "../../services/api";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function JoinRoomScreen() {
//   const [error, setError] = useState("");
//   const { setLoading } = useLoading();

//   const handleCodeComplete = async (code: string) => {
//     setError("");
//     setLoading(true);
//     try {
//       const roomDetails = await api.joinRoom(code);
//       if (roomDetails) {
//         router.push(`/room/${code}`);
//       } else {
//         setError("Invalid room code. Please try again.");
//       }
//     } catch (err) {
//       setError("Invalid room code. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Enter the 6-digit code to join the game:</Text>
//       {error ? <Text style={styles.error}>{error}</Text> : null}
//       <CodeInput onComplete={handleCodeComplete} />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0A0A0F",
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     color: "#fff",
//     marginBottom: 30,
//     textAlign: "center",
//     fontFamily: "Poppins-Bold",
//     marginTop: 30,
//   },
//   error: {
//     color: "#ff4d4d",
//     textAlign: "center",
//     marginBottom: 20,
//   },
// });
import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text } from "react-native-paper";
import { router } from "expo-router";
import { CodeInput } from "../../components/CodeInput";
import { useLoading } from "../../contexts/LoadingContext";
import { api } from "../../services/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function JoinRoomScreen() {
  const [error, setError] = useState("");
  const { setLoading } = useLoading();

  const handleCodeComplete = async (code: string) => {
    if (code.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await api.joinRoom(code);
      router.push(`/room/${code}`);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to join room. Please try again.";
      setError(errorMessage);
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.title}>Enter Room Code</Text>
        <Text style={styles.subtitle}>Enter the 6-digit code to join the game</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <CodeInput onComplete={handleCodeComplete} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0F",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#9CA3AF",
    marginBottom: 30,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
  error: {
    color: "#EF4444",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
  },
});