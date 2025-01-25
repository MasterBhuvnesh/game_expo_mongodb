import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const UpdateRequired = () => {
  const scaleValue = new Animated.Value(0.5);
  const rotateValue = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  }, [rotateValue]); // Added rotateValue as a dependency

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.iconContainer,
          { transform: [{ scale: scaleValue }, { rotate }] },
        ]}
      >
        <FontAwesome
          name="exclamation-triangle"
          size={64}
          color="#FFD700"
        />
      </Animated.View>
      <Text style={styles.title}>Update Required</Text>
      <Text style={styles.message}>
        This version of the app is no longer supported. Please update to the
        latest version to continue using the app.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    padding: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#CCCCCC",
    textAlign: "center",
  },
});

export default UpdateRequired;
