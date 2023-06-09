const BASE_URL = "http://api.tyfans.net/bilibili/stats";

async function get(url) {
    const response = await fetch(BASE_URL+url);
    return response.json();
    
}

export async function searchVideo(av) {
    return await get(`?aid=${av}`);
}   