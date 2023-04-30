const BASE_URL = "https://vocadb.net/api/"

async function get(url) {
    const response = await fetch(BASE_URL+url);
    return response.json();
}

export async function searchArtist(name) {
    let id = await getArtistIdByName(name);
    if (id == 0) return 0;
    return await get(`artists/${id}/details`);
}

export async function searchSong(name, artistsName) {

    let url = `songs?query=${name}&sort=SongType&childVoicebanks=true&nameMatchMode=Partial`;
    const datas = await get(url);
    if (datas.items[0] == undefined) return undefined;
    return getSongById(datas.items[0].id);

    //暂时停用此功能
    /*
    // 获取歌的原名 (删除feat. remix等等信息)
    let result = /(.*)\s\(.*\)/g.exec(name);
    name = result == null ? name : result[1];

    let url = `songs?query=${name}&sort=SongType&childVoicebanks=true&nameMatchMode=Partial`;
    // 暂时截取前4个作者名
    artistsName = artistsName.slice(0,4);

    for (let artistName of artistsName) {
        let id = await getArtistIdByName(artistName);
        if (id != 0) {
            url += `&artistId%5B%5D=${id}`
        }
    }

    console.log(url);

    const datas = await get(url);
    if (datas.items[0] == undefined) return null;
    return getSongById(datas.items[0].id);
     */
}

export async function getSongById(id) {
    return await get(`songs/${id}/details`)
}

export async function getArtistIdByName(name) {
    const datas = await get(`artists?query=${name}&allowBaseVoicebanks=true&childTags=false&start=0&maxResults=10&getTotalCount=false&preferAccurateMatches=false&lang=Default`);
    return datas.items[0] == undefined ? 0 : datas.items[0].id;
}