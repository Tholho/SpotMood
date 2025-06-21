import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import { Link } from "expo-router";
import { useStorageState } from "../storage/secureStorage";
//import { useNavigation } from "@react-navigation/native";

export default function Index() {
  //const navigation = useNavigation();
  const [[loading, value], setValue] = useStorageState("some-key");

  console.log("Index entry in app/(tabs)/index.tsx");
  return (
    <View style={styles.container}>
      <Text style={styles.text}>APP/(TABS)/INDEX.TSX</Text>
      <Text style={styles.text}>
        This should display if OAuth Access Token is valid
      </Text>
      <Text style={styles.text}>Token == TBD</Text>
      <Text style={styles.text}>StorageState value == {value as string}</Text>
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
