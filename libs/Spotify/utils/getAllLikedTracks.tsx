// fetchAllSpotifyTracks.ts
import { AuthTokens } from "@/libs/context/AuthContext";
import { fetchSpotifyResource } from "../apiCalls/fetchSpotifyResource";
import { SpotifyTrackItem } from "../types";

export async function fetchAllSpotifyTracks(
  session: string | AuthTokens | null,
  maxLimit = 50, // tu peux exposer un paramètre si tu veux forcer un chunk plus petit
) {
  let offset = 0;
  let allItems: SpotifyTrackItem[] = [];
  let total = Infinity;

  while (offset < total) {
    const data = await fetchSpotifyResource(
      session,
      "tracks",
      offset,
      maxLimit,
    );

    allItems.push(...data.items);
    total = data.total;
    offset += data.items.length;

    if (data.items.length === 0) break; // sécurité anti-boucle infinie
  }

  return allItems;
}
