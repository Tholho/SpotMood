import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import { Link, Redirect, useRouter } from "expo-router";
import { useStorageState } from "../storage/secureStorage";
import { AuthTokens, useSession } from "../context/AuthContext";
import { useEffect } from "react";
//import { useEffect } from "react";
//import { useNavigation } from "@react-navigation/native";

export default function Index() {
  console.log("Index entry in app/(tabs)/index.tsx");
  const router = useRouter();
  //const navigation = useNavigation();
  const [[loading, value], setValue] = useStorageState<AuthTokens | null>(
    "session",
  );
  const { session } = useSession();
  let token = "";
  if (typeof session === "string") {
    token = session;
  } else if (typeof session === "object") {
    if (session?.accessToken) {
      token = session.accessToken;
    }
  }
  /*if (!session) {
    console.log("test");
    router.navigate("/");
  }
  console.log(session);
  console.log(value);
  /*if (!value) {
    console.log("test");
    router.navigate("/");
    }*/
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
            setValue(null);
            router.navigate("/");
          }}
        >
          Logout button (Should clear session from storage, redirection logic
          should happen from state/storage
        </Text>
      </Pressable>
      <Text style={styles.text}>StorageState value == {token}</Text>
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
