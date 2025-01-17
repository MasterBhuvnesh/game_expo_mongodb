import { Redirect } from "expo-router";
import { useAuth } from "../contexts/AuthContext";

export default function Index() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/login" />;
  // return <Redirect href="/room/428563" />;
  // return <Redirect href="/home" />;
}
