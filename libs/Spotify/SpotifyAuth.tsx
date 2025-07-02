import * as Crypto from "expo-crypto";
import { AuthRequest, CodeChallengeMethod } from "expo-auth-session";
import { getVerifier, setVerifier } from "../platforms/verifierStorage";
import getRedirectURI from "../platforms/redirectURI";

export async function handleSpotifyLogin(redirectUri: string) {
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const request = new AuthRequest({
    clientId: "05d1e04eac8145b1aafaca023082c621",
    scopes: ["user-read-private playlist-read-private user-library-read"],
    redirectUri: getRedirectURI(),
    responseType: "code",
    codeChallengeMethod: CodeChallengeMethod.S256,
    usePKCE: true,
  });
  const result = await request.promptAsync(discovery);
  if (result.type === "success") {
    const code = result.params.code;
    return {
      code: code,
      verifier: request.codeVerifier,
    };
  }

  return null;
}
