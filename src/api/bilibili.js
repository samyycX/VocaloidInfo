const BASE_URL = "http://api.bilibili.com/x/web-interface/";

async function get(url) {
    let iframe = dom('iframe', {hidden: true, src:BASE_URL+url,'class':['vi-cors']});
    document.body.appendChild(iframe);
    return await betterncm.utils.waitForElement('.vi-cors').then(async result => {
        await betterncm.utils.waitForFunction(() => {
            //快速切换下好像会有这个问题..
            if (result.contentDocument == null) {
                return true
            }
            return result.contentDocument.querySelector("html > body").hasChildNodes()
        });
        if (result.contentDocument == null) {
            return undefined
        }
        let data = result.contentDocument.querySelector("html > body > pre").innerText;
        iframe.remove();
        return JSON.parse(data);
    })
    
}

export async function searchVideo(av) {
    av = av.replace("av", "");
    return await get(`view?aid=${av}`);
}   