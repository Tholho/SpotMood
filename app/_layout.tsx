import { Stack } from "expo-router";
import { SessionProvider } from "../libs/context/AuthContext";
import { StrictMode } from "react";
import * as WebBrowser from "expo-web-browser";

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
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
