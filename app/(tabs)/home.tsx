import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import { AuthTokens, useSession } from "../../libs/context/AuthContext";
import { useEffect } from "react";
//import getUserID from "@/libs/Spotify/apiCalls/getUserID";
import getPlaylists from "@/libs/Spotify/apiCalls/getPlaylists";
import getAccessToken from "@/libs/context/getAccessToken";

export default function Index() {
  console.log("Home entry in app/(tabs)/home.tsx");
  const router = useRouter();
  const { session, signOut, isLoading, setUserID } = useSession();
  useEffect(() => {
    if (isLoading) return;
    if (session == null) {
      router.replace("/");
    }
  }, [session, isLoading]);
  const token = getAccessToken(session);
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Text
          style={styles.buttonText}
          onPress={() => {
            signOut();
          }}
        >
          Logout
        </Text>
      </Pressable>
      <Link style={styles.button} href="/playlists" asChild>
        <Pressable
          onPress={async () => {
            //  const playlists = await getPlaylists(token, 0);
            //  if (playlists) {
            router.replace("/playlists");
            //  } else {
            //    console.log("no playlists???");
            //  }
          }}
        >
          <Text style={styles.buttonText}>See existing playlists</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  text: {
    color: "#000000",
  },
  buttonText: {
    color: "#ffffff",
  },
  button: {
    padding: 10,
    backgroundColor: "#AF69EF",
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000000",
  },
});
