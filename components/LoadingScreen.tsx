import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { Text } from "react-native-paper";

interface LoadingScreenProps {
  onFinish: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(4000), // Wait for 4 seconds after animation
    ]).start(() => {
      onFinish();
    });
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/loading-background.png")}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <ActivityIndicator
          size="large"
          style={{ marginBottom: 20, backgroundSize: "cover" }}
          color="#8F0C7C"
        />
        <Text
          variant="titleMedium"
          style={styles.subtitle}
        >
          Loading your Details...
        </Text>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0F",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },

  subtitle: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
    fontFamily: "Poppins-Regular",
  },
});
