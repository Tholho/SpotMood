import * as Crypto from "expo-crypto";
import { AuthRequest } from "expo-auth-session";
import { setVerifier } from "../platforms/verifierStorage";
import getRedirectURI from "../platforms/redirectURI";

export async function handleSpotifyLogin(redirectUri: string) {
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };
  const verifier = generateVerifier(128);
  console.log("VERIFIER =" + verifier);
  const challenge = await generateChallenge(verifier);
  await setVerifier(verifier);

  const request = new AuthRequest({
    clientId: "05d1e04eac8145b1aafaca023082c621",
    scopes: ["user-read-private"],
    redirectUri: getRedirectURI(),
    responseType: "code",
    codeChallenge: challenge,
  });

  const result = await request.promptAsync(discovery);

  if (result.type === "success") {
    console.log("RESPONSE SUCCESS");

    return {
      code: result.params.code,
      verifier,
    };
  }

  return null;
}

export function generateVerifier(length = 128): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return out;
}

export async function generateChallenge(verifier: string): Promise<string> {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    verifier,
    {
      encoding: Crypto.CryptoEncoding.BASE64,
    },
  );
  return digest.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
