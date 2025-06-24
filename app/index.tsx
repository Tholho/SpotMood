import { Text, View, StyleSheet, Pressable, Button } from "react-native";
import { useRouter } from "expo-router";
import { useSession } from "../libs/context/AuthContext";
import * as WebBrowser from "expo-web-browser";
import { handleSpotifyLogin } from "../libs/Spotify/SpotifyAuth";
import getRedirectURI from "@/libs/platforms/redirectURI";
import { useEffect } from "react";
import { Platform } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const { signIn, session, isLoading, setSession } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (Platform.OS === "web" && document.location.host != "127.0.0.1:8081")
      document.location.href = "http://127.0.0.1:8081";
  });
  console.log("SESSION = " + session);
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
        onPress={async () => {
          let codeAndVerify = await handleSpotifyLogin(getRedirectURI());
          if (!codeAndVerify) return;
          const body = new URLSearchParams({
            client_id: "05d1e04eac8145b1aafaca023082c621",
            grant_type: "authorization_code",
            code: codeAndVerify.code,
            redirect_uri: getRedirectURI(),
            code_verifier: codeAndVerify.verifier,
          });

          const params = new URLSearchParams();
          params.append("client_id", "05d1e04eac8145b1aafaca023082c621");
          params.append("grant_type", "authorization_code");
          params.append("code", codeAndVerify.code);
          params.append("redirect_uri", getRedirectURI());
          params.append("code_verifier", codeAndVerify.verifier);

          console.log("sending token request");
          console.log(body.toString());
          const res = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params,
          });

          const tokenData = await res.json();
          console.log("TOKEN = " + tokenData);
          if (tokenData.access_token) {
            setSession({
              accessToken: tokenData.access_token,
            });
            router.replace("/home");
          } else {
            //router.replace("/+not-found");
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
