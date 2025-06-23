import { Platform } from "react-native";
import { makeRedirectUri } from "expo-auth-session";

export default function getRedirectURI() {
  let redirectURI = "";
  if (Platform.OS === "web") {
    redirectURI = "http://127.0.0.1:8081/callback";
  } else {
    redirectURI = makeRedirectUri({
      scheme: "zpotmood",
      path: "callback",
    });
  }
  return redirectURI;
}
