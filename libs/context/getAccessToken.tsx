import { AuthTokens } from "./AuthContext";

export default function getAccessToken(session: string | AuthTokens | null) {
  let token = "";
  if (typeof session === "string") {
    token = session;
  } else if (typeof session === "object") {
    if (session?.accessToken) {
      token = session.accessToken;
    }
  }
  return token;
}
