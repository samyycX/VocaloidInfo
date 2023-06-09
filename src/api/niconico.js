export async function getNiconicoData(niconicoId) {
    const response = await fetch(`http://api.tyfans.net/niconico/stats?id=${niconicoId}`)
    return response.json()
}