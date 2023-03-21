const BASE_URL = "https://vocadb.net/api/"

async function get(url) {
    const response = await fetch(BASE_URL+url);
    return response.json();
}

export async function searchArtist(name) {
    const datas = await get(`artists?query=${name}&allowBaseVoicebanks=true&childTags=false&start=0&maxResults=10&getTotalCount=false&preferAccurateMatches=false&lang=Default`);
    if (datas.items[0] == undefined) return null;
    return await get(`artists/${datas.items[0].id}/details`);
}

export async function searchSong(name) {
    const datas = await get(`songs?query=${name}&sort=SongType`);
    if (datas.items[0] == undefined) return null;
    return await get(`songs/${datas.items[0].id}/details`)
}

export async function getSongById(id) {
    return await get(`songs/${id}/details`)
}