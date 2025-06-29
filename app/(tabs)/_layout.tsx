import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { useSession } from "../../libs/context/AuthContext";

export default function LoggedLayout() {
  const router = useRouter();
  const { session, isLoading } = useSession();

  useEffect(() => {
    if (!isLoading) {
      if (!session || (typeof session === "object" && !session?.accessToken)) {
        router.replace("/");
      }
    }
  }, [session, isLoading]);

  console.log("LoggedLayout entry in app/(tabs)/_layout.tsx");
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{ title: "Home", headerShown: false }}
      />
      <Tabs.Screen
        name="about"
        options={{ title: "About", headerShown: false }}
      />
    </Tabs>
  );
}
