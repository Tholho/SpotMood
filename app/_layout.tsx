import { Stack } from "expo-router";

export default function RootLayout() {
  console.log("RootLayout entry in app/_layout.tsx");
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
