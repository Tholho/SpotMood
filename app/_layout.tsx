import { Stack } from "expo-router";
import { SessionProvider } from "./context/AuthContext";

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
