import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import { useSession } from "../context/AuthContext";
import { useEffect } from "react";

export default function Index() {
  console.log("Home entry in app/(tabs)/home.tsx");
  const router = useRouter();
  const { session, signOut, isLoading } = useSession();
  useEffect(() => {
    if (isLoading) return;
    if (session == null) {
      //Necessary to defer because Root component might not be mounted soon enough
      router.replace("/");
    }
  }, [session, isLoading]);

  let token = "";
  if (typeof session === "string") {
    token = session;
  } else if (typeof session === "object") {
    if (session?.accessToken) {
      token = session.accessToken;
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>APP/(TABS)/INDEX.TSX</Text>
      <Text style={styles.text}>
        This should display if OAuth Access Token is valid
      </Text>
      <Text style={styles.text}>Token == TBD</Text>
      <Pressable style={styles.button}>
        <Text
          style={styles.buttonText}
          onPress={() => {
            signOut();
          }}
        >
          Logout button (Should clear session from storage, redirection logic
          should happen from state/storage
        </Text>
      </Pressable>
      <Text style={styles.text}>session.accessToken == {token}</Text>
      <Link style={styles.button} href="/about" asChild>
        <Pressable>
          <Text style={styles.buttonText}>Link to APP/(TABS)/ABOUT.TSX</Text>
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
