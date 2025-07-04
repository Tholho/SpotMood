import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from "react-native";
import Lists from "@/libs/Spotify/components/Lists";

//Need to manage error 401 flow
export default function Playlists() {
  return (
    <View style={styles.page}>
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
      <Text style={styles.text}>Existing Playlists</Text>
      <Lists target="playlists" />
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
  text: {
    color: "#ffffff",
  },
});
