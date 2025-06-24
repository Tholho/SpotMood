import * as Crypto from "expo-crypto";
import { AuthRequest, CodeChallengeMethod } from "expo-auth-session";
import { getVerifier, setVerifier } from "../platforms/verifierStorage";
import getRedirectURI from "../platforms/redirectURI";

export async function handleSpotifyLogin(redirectUri: string) {
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };
  const verifier = generateVerifier(64);
  console.log("VERIFIER =" + verifier);
  await setVerifier(
    "yLRyxFID6rOcpBMizRwxMf8_bLYke9-A2OTk60LqAblvpNQYSa7n-ux8h3LaL3hZN4FQjYQwvk6hBBJC-tj3DF-B5YMtF98ioCbmWgdMZAHS4w7hLYpQpz3Lb0pITbzz",
  );

  const challenge = await generateChallenge(verifier);
  console.log("challenge =" + challenge);

  const request = new AuthRequest({
    clientId: "05d1e04eac8145b1aafaca023082c621",
    scopes: ["user-read-private"],
    redirectUri: getRedirectURI(),
    responseType: "code",
    codeChallengeMethod: CodeChallengeMethod.S256,
    usePKCE: true,
    //codeVerifier: verifier,
    //clientSecret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
  });
  //request.codeVerifier = verifier;
  const result = await request.promptAsync(discovery);
  //const url = await request.makeAuthUrlAsync(discovery);
  //console.log("URL = " + url);
  if (result.type === "success") {
    const code = result.params.code;
    console.log("RESPONSE SUCCESS, with code:" + code);
    const verifier = await getVerifier();
    if (!verifier) {
      throw "Could not get verifier";
    }
    return {
      code: code,
      verifier: request.codeVerifier,
    };
  }

  return null;
}

export function generateVerifier(length = 128) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return out;
}

export async function generateChallenge(verifier: string) {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    verifier,
    {
      encoding: Crypto.CryptoEncoding.BASE64,
    },
  );
  return digest.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
