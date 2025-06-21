import { Tabs, useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { useSession } from "../context/AuthContext";

export default function RootLayout() {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (!session) {
      router.navigate("/");
    }
  });
  console.log("RootLayout entry in app/(tabs)/_layout.tsx");
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="about" options={{ title: "About" }} />
    </Tabs>
  );
}
