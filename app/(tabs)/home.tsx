import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import { useSession } from "../../libs/context/AuthContext";
import { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  console.log("Home entry in app/(tabs)/home.tsx");
  const router = useRouter();
  const { session, signOut, isLoading } = useSession();
  useEffect(() => {
    if (isLoading) return;
    if (session == null) {
      router.replace("/");
    }
  }, [session, isLoading, router]);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0b0024", "#210466"]}
        start={{
          x: 0,
          y: 0.5,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.page}
      />
      <View style={styles.centerHero}>
        <Text style={styles.hero}>
          Here, you will be given the ability to create new playlist from your
          all time liked songs based on your mood, and maybe other things like
          music style
        </Text>
      </View>
      <View style={styles.buttonsZone}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  centerHero: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  hero: {
    fontSize: 20,
    margin: 10,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    //justifyContent: "center",
  },
  text: {
    color: "#000000",
  },
  buttonsZone: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#000000",
  },
  button: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000000",
  },
});
