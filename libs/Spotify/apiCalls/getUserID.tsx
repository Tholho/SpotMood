//import { AuthTokens, useSession } from "@/libs/context/AuthContext";

export default async function getUserID(accessToken: string) {
  //const body = new URLSearchParams()
  const res = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: "Bearer " + accessToken },
  });
  const jsonRes = await res.json();
  console.log(jsonRes);
  return jsonRes.id;
}
