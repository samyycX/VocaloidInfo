const BASE_URL = "https://vocadb.net/api/"

const SPECIAL_NAME_BASE_URL="https://api.tyfans.net/vocaloidinfo/"

async function get(url) {
    const response = await fetch(BASE_URL+url);
    return response.json();
}

export async function searchArtist(name) {
    let id = await getArtistIdByName(name);
    if (id == 0) return undefined;
    return await get(`artists/${id}/details`);
}

export async function searchSong(name, artistsName) {

    let result = /(.*)(\(|\[|【|（).*(\)|\]|】|）)/g.exec(name);
    let raw_name = result == null ? name : result[1];

    let resp = await fetch(SPECIAL_NAME_BASE_URL+`specialSongName?name=${name}`).catch(err => {});
    if (resp != undefined) {
        let specialdata = await resp.json();
        if (specialdata.found) {
            return specialdata.id;
        }
    }
    

    let url = `songs?query=${raw_name}&sort=SongType&childVoicebanks=true&nameMatchMode=Partial`;

    artistsName = artistsName.slice(0,2);
    for (let artistName of artistsName) {
        let id = await getArtistIdByName(artistName);
        if (id != 0) {
            url += `&artistId%5B%5D=${id}`
        }
    }
    
    const datas = await get(url);
    if (datas.items[0] == undefined) return undefined;
    return getSongById(datas.items[0].id);

    //暂时停用此功能
    /*

    let url = `songs?query=${name}&sort=SongType&childVoicebanks=true&nameMatchMode=Partial`;
    // 暂时截取前4个作者名
    

   

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
    let resp = await fetch(SPECIAL_NAME_BASE_URL+`specialArtistName?name=${name}`).catch(err => {});
    if (resp != undefined) {
        let specialdata = await resp.json()
        if (specialdata.found) {
            return specialdata.id;
        }
    }
    const datas = await get(`artists?query=${name}&allowBaseVoicebanks=true&childTags=false&start=0&maxResults=10&getTotalCount=false&preferAccurateMatches=false&lang=Default`);
    return datas.items[0] == undefined ? 0 : datas.items[0].id;
}