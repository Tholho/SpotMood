import { Text, View, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import { useSession } from "../libs/context/AuthContext";
import * as WebBrowser from "expo-web-browser";
import { handleSpotifyLogin } from "../libs/Spotify/SpotifyAuth";
import getRedirectURI from "@/libs/platforms/redirectURI";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const { session, isLoading, setSession } = useSession();
  const router = useRouter();
  if (session) {
    router.replace("/home");
  }
  console.log("SESSION = " + session);
  console.log("Index entry in app/index.tsx");
  return session || isLoading ? (
    <View style={styles.container}>
      <Text style={styles.text}>Loading</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Button
        title="Login"
        onPress={async () => {
          let codeAndVerify = await handleSpotifyLogin(getRedirectURI());
          if (!codeAndVerify?.verifier) return;
          const body = new URLSearchParams({
            client_id: "05d1e04eac8145b1aafaca023082c621",
            grant_type: "authorization_code",
            code: codeAndVerify.code,
            redirect_uri: getRedirectURI(),
            code_verifier: codeAndVerify.verifier,
          });
          const res = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: body.toString(),
          });

          const tokenData = await res.json();
          if (tokenData.access_token) {
            setSession({
              accessToken: tokenData.access_token,
            });
            router.replace("/home");
          } else {
          }
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
