// import { Redirect } from "expo-router";
// import { useAuth } from "../contexts/AuthContext";
// import { useEffect, useState } from "react";
// import { View, Text, ActivityIndicator } from "react-native";
// import { StatusBar } from "expo-status-bar";

// export default function Index() {
//   const { user } = useAuth();
//   const [isAllowed, setIsAllowed] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     checkVersion();
//   }, []);

//   const checkVersion = async () => {
//     try {
//       // Fetch the latest version from your server
//       const response = await fetch(
//         "https://backend-bt2q.onrender.com/api/version"
//       );
//       const data = await response.json();
//       const latestVersion = data.version;

//       // Get the current app version from .env
//       const currentVersion = process.env.APP_VERSION;

//       // Compare versions
//       if (currentVersion === latestVersion) {
//         setIsAllowed(true);
//       } else {
//         setIsAllowed(false);
//       }
//     } catch (error) {
//       console.error("Error fetching version:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (!isAllowed) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <StatusBar style="light" />
//         <Text style={{ textAlign: "center" }}>
//           This version of the app is no longer supported. Please update to the
//           latest version.
//         </Text>
//       </View>
//     );
//   }

//   // If the version is allowed, proceed with the original logic
//   if (user) {
//     return <Redirect href="/home" />;
//   }

//   return <Redirect href="/login" />;
// }

// // import { Redirect } from "expo-router";
// // import { useAuth } from "../contexts/AuthContext";

// // export default function Index() {
// //   const { user } = useAuth();

// //   if (user) {
// //     return <Redirect href="/home" />;
// //   }

// //   return <Redirect href="/login" />;
// // }
import { Redirect } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import UpdateRequired from "../components/updaterequired";

export default function Index() {
  const { user } = useAuth();
  const [isAllowed, setIsAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkVersion();
  }, []);

  const checkVersion = async () => {
    try {
      const response = await fetch(
        "https://backend-bt2q.onrender.com/api/version"
      );
      const data = await response.json();
      const latestVersion = data.version;
      const currentVersion = process.env.APP_VERSION;

      setIsAllowed(currentVersion === latestVersion);
    } catch (error) {
      console.error("Error fetching version:", error);
      setIsAllowed(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1E1E1E",
        }}
      >
        <StatusBar style="light" />
        <ActivityIndicator
          size="large"
          color="#FFFFFF"
        />
      </View>
    );
  }

  if (!isAllowed) {
    return (
      <>
        <StatusBar style="light" />
        <UpdateRequired />
      </>
    );
  }

  if (user) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/login" />;
}
