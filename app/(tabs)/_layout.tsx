import { Tabs } from "expo-router";

export default function RootLayout() {
  console.log("RootLayout entry in app/(tabs)/_layout.tsx");
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="about" options={{ title: "About" }} />
    </Tabs>
  );
}
