import { Stack } from "expo-router";
import { SessionProvider } from "../libs/context/AuthContext";
import { Platform } from "react-native";
import { useEffect } from "react";

//WebBrowser.maybeCompleteAuthSession();

export default function RootLayout() {
  console.log("RootLayout entry in app/_layout.tsx");

  return (
    <SessionProvider>
      <RootNavigator />
    </SessionProvider>
  );
}

function RootNavigator() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
