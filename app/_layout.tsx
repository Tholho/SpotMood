import { Stack } from "expo-router";
import { SessionProvider } from "../libs/context/AuthContext";
import { Platform } from "react-native";

//WebBrowser.maybeCompleteAuthSession();

export default function RootLayout() {
  console.log("RootLayout entry in app/_layout.tsx");
  if (Platform.OS === "web") document.location.href = "127.0.0.1";
  return (
    <SessionProvider>
      <RootNavigator />
    </SessionProvider>
  );
}

function RootNavigator() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
