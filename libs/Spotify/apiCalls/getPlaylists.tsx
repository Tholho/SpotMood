export default async function getPlaylists(
  accessToken: string,
  offset: number,
) {
  //const body = new URLSearchParams()
  const res = await fetch("https://api.spotify.com/v1/me/playlists", {
    method: "GET",
    headers: { Authorization: "Bearer " + accessToken },
  });
  const jsonRes = await res.json();
  //console.log(jsonRes);
  return jsonRes;
}
