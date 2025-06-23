import { useSession } from "@/libs/context/AuthContext";
import getRedirectURI from "@/libs/platforms/redirectURI";
import { getVerifier, setVerifier } from "@/libs/platforms/verifierStorage";
import { handleSpotifyLogin } from "@/libs/Spotify/SpotifyAuth";
import { getStorageItemAsync } from "@/libs/storage/secureStorage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getItemAsync } from "expo-secure-store";
import { useEffect } from "react";
import { Text } from "react-native";

export default function SpotifyCallback() {
  const { session, setSession } = useSession();
  const { code } = useLocalSearchParams<{ code: string }>();
  const router = useRouter();
  /*useEffect(() => {
    if (session) {
      router.replace("/home");
    }
  })*/
  console.log("entering callback...");
  console.log("SESSION = " + session);
  console.log("CODE = " + code);
  const clientSecret = process.env.EXPO_PUBLIC_CLIENT_SECRET;
  console.log("secret = " + clientSecret);
  useEffect(() => {
    console.log("useEffect déclenché avec code =", code);
    async function exchangeCodeForToken() {
      if (!code) {
        console.log("No code in useEffect");
        return;
      }

      const verifier = await getVerifier();
      if (!verifier) {
        console.log("No verifier in useEffect");
        return;
      }
      console.log(code);
      console.log(verifier);

      const body = new URLSearchParams({
        client_id: "05d1e04eac8145b1aafaca023082c621",
        grant_type: "authorization_code",
        code: code,
        redirect_uri: getRedirectURI(),
        code_verifier: verifier,
      });
      console.log("sending token request");
      console.log(body.toString());
      const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      const tokenData = await res.json();
      console.log("TOKEN = " + tokenData);
      if (tokenData.access_token) {
        setSession({
          accessToken: tokenData.access_token,
        });
        router.replace("/home");
      } else {
        router.replace("/+not-found");
      }
    }
    exchangeCodeForToken();
    //setVerifier(null);
  }, [code]);

  return <Text>Authenticating...</Text>;
}
