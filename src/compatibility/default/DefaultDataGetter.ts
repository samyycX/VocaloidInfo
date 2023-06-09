import * as VocaDB from '../../api/vocadb.js';
import * as Bilibili from '../../api/bilibili.js';
import * as Youtube from '../../api/youtube.js';
import * as Niconico from '../../api/niconico.js';

export default class DefaultDataGetter implements DataGetter {

    async getSongDataFromPage() {

        const title: HTMLElement = await betterncm.utils.waitForElement('span[class="name j-flag"]') as HTMLElement;
        //let artists = await betterncm.utils.waitForElement('li[class="f-thide f-ust f-ust-1"]');
        const name = title.innerText!.replace(/(\s*$)/g, "");
        const data = await VocaDB.searchSong(name);

        if (data == undefined) {
            return { vocadbData: undefined, bilibiliData: undefined };
        }

        var bilibiliData: any = undefined;
        var youtubeData: any = undefined;
        var niconicoData: any = undefined;
        // 检查歌曲是否有b站的数据
        for (let pv of data.pvs) {
            switch (pv.service) {
                case "Bilibili":
                    const av = pv.pvId;
                    bilibiliData = await Bilibili.searchVideo(av);
                    break;
                case "Youtube":
                    const ytid = pv.pvId;
                    youtubeData = await Youtube.getYoutubeData(ytid);
                    break;
                case "NicoNicoDouga":
                    const nid = pv.pvId;
                    niconicoData = await Niconico.getNiconicoData(nid);
                    break;
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