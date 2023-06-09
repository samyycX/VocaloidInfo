export async function getYoutubeData(youtubeId) {
    const response = await fetch(`http://api.tyfans.net/youtube/stats?id=${youtubeId}`)
    return response.json()
}