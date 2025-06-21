import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import { Link } from "expo-router";
import { useStorageState } from "./storage/secureStorage";
import { useEffect } from "react";
import { useSession } from "./context/AuthContext";
//import { useNavigation } from "@react-navigation/native";

export default function Index() {
  const { signIn } = useSession();
  //const navigation = useNavigation();
  console.log("Index entry in app/index.tsx");
  //const [[loading, value], setValue] = useStorageState("session");

  return (
    <View style={styles.container}>
      <Text style={styles.text}>APP/INDEX.TSX</Text>
      <Text style={styles.text}>
        This should display in the absence of OAuth Access Token
      </Text>
      <Text style={styles.text}>Token == TBD</Text>

      <Link style={styles.button} href="/home" asChild>
        <Pressable onPress={() => signIn()}>
          <Text style={styles.buttonText}>
            Link to APP/(tabs)/INDEX.TSX (login pretends)
          </Text>
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
  textWarning: {
    padding: 4,
    color: "#ffffff",
    backgroundColor: "#A50B5E",
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
