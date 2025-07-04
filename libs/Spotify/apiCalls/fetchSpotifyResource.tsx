import { AuthTokens } from "@/libs/context/AuthContext";
import getAccessToken from "@/libs/context/getAccessToken";
import { TargetType, SpotifyAPIResponseMap } from "../types";

export async function fetchSpotifyResource<T extends TargetType>(
  session: string | AuthTokens | null,
  target: T,
  offset = 0,
  limit = 20,
): Promise<SpotifyAPIResponseMap[T]> {
  const token = getAccessToken(session);
  if (!token) throw new Error("Invalid or missing token");

  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });

  const res = await fetch(
    `https://api.spotify.com/v1/me/${target}?${params.toString()}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!res.ok) {
    throw new Error(`Spotify error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}
