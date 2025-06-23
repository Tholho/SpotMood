import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Button,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useSession } from "../libs/context/AuthContext";
import * as WebBrowser from "expo-web-browser";
//import SpotifyLogin from "./Spotify/mockSpotifyAuth";
import { handleSpotifyLogin } from "../libs/Spotify/SpotifyAuth";
import { makeRedirectUri } from "expo-auth-session";
import getRedirectURI from "@/libs/platforms/redirectURI";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const { signIn, session, isLoading, setSession } = useSession();
  const router = useRouter();
  console.log("SESSION = " + session);
  //verify token validity and navigate to identified pages, mock atm
  /*
  useEffect(() => {
    if (isLoading) return;
    let token = "";
    if (typeof session === "string" && session) {
      token = session;
    } else if (typeof session === "object") {
      if (session?.accessToken) {
        token = session.accessToken;
      }
    }
    if (token) {
      console.log(token);
      router.replace("/home");
    }
  }, [session, isLoading]);
 */
  console.log("Index entry in app/index.tsx");
  return (
    <View style={styles.container}>
      <Text style={styles.text}>APP/INDEX.TSX</Text>
      <Text style={styles.text}>
        This should display in the absence of OAuth Access Token
      </Text>
      <Text style={styles.text}>Token == TBD</Text>

      <Pressable style={styles.button} onPress={() => router.replace("/")}>
        <Text style={styles.buttonText}>Link to mockSpotifyAuth WIP</Text>
      </Pressable>
      <Button
        title="Login"
        onPress={() => {
          handleSpotifyLogin(getRedirectURI());
        }}
      />
      {
        //<Text style={styles.text}>session.accessToken == {token}</Text>
      }
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
