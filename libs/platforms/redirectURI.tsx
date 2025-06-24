import { Platform } from "react-native";
import { makeRedirectUri } from "expo-auth-session";

export default function getRedirectURI() {
  let redirectURI = "";
  if (Platform.OS === "web") {
    redirectURI = "http://127.0.0.1:8081";
    console.log("Web redirection");
  } else {
    redirectURI = makeRedirectUri({
      scheme: "zpotmood",
    });
  }
  return redirectURI;
}
