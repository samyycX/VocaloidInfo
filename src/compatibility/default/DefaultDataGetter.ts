import * as VocaDB from '../../api/vocadb.js';
import * as Bilibili from '../../api/bilibili.js';
import * as Youtube from '../../api/youtube.js';
import * as Niconico from '../../api/niconico.js';

export default class DefaultDataGetter implements DataGetter {

    async getSongDataFromPage() {

        const title: HTMLElement = await betterncm.utils.waitForElement('span[class="name j-flag"]') as HTMLElement;
        let artists = await betterncm.utils.waitForElement('li[class="f-thide f-ust f-ust-1"]');
        const name = title.innerText!.replace(/(\s*$)/g, "");

        let artistsName: String[] = [];
        artists?.childNodes.forEach(child => {
            let raw_child = child as any;
            if (raw_child.title) {
                artistsName.push(raw_child.title);
            }
        })

        const data = await VocaDB.searchSong(name, artistsName);

        if (data == undefined) {
            return { vocadbData: undefined, bilibiliData: undefined };
        }

        var bilibiliData: any = undefined;
        var youtubeData: any = undefined;
        var niconicoData: any = undefined;

        // 检查歌曲是否有b站的数据
        for (let pv of data.pvs) {
            if (pv.pvType == "Original") {
                switch (pv.service) {
                    case "Bilibili":
                        const av = pv.pvId;
                        let thisbdata = await Bilibili.searchVideo(av);
                        if (bilibiliData != undefined && thisbdata != undefined) {
                            if (thisbdata.data.stat.view > bilibiliData.data.stat.view) {
                                bilibiliData = thisbdata
                            }
                        }
                        if (bilibiliData == undefined) {
                            bilibiliData = thisbdata
                        }
                        break;
                    case "Youtube":
                        const ytid = pv.pvId;
                        let thisydata = await Youtube.getYoutubeData(ytid);
                        if (thisydata != undefined && youtubeData != undefined) {
                            if (parseInt(thisydata.items[0].statistics.viewCount) > parseInt(youtubeData.items[0].statistics.viewCount)) {
                                youtubeData = thisydata
                            }
                        }
                        if (youtubeData == undefined) {
                            youtubeData = thisydata
                        }
                        break;
                    case "NicoNicoDouga":
                        const nid = pv.pvId;
                        let thisndata = await Niconico.getNiconicoData(nid);
                        if (thisndata != undefined && niconicoData != undefined) {
                            if (thisndata.data[0].viewCounter > niconicoData.data[0].viewCounter) {
                                niconicoData = thisndata
                            }
                        }
                        if (niconicoData == undefined) {
                            niconicoData = thisndata
                        }
                        break;
                } 
            }
            
        }
        
        return { 
            vocadbData: data, 
            bilibiliData: bilibiliData, 
            youtubeData: youtubeData, 
            niconicoData: niconicoData };
    }

    async getArtistDataFromPage() {
        let node1 = (await betterncm.utils.waitForElement(".name-artist > .f-brk > .f-ust")) as HTMLElement;
      
        return { vocadbData: await VocaDB.searchArtist(node1.innerText) };
    }

}