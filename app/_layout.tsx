import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "../contexts/AuthContext";
import { LoadingProvider } from "../contexts/LoadingContext";
import { useFonts } from "expo-font";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      <AuthProvider>
        <LoadingProvider>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: "#1F2937",
              },
              headerTintColor: "#fff",
              animation: "slide_from_right",
              headerShown: false,
            }}
          >
            <Stack.Screen name="leaderboard" />
          </Stack>
        </LoadingProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
