import * as VocaDB from '../../api/vocadb.js';
import * as Bilibili from '../../api/bilibili.js';

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
        // 检查歌曲是否有b站的数据
        for (let pv of data.pvs) {
            if (pv.service == "Bilibili") {
                const av = pv.url.split("/").slice(-1)[0];
                bilibiliData = await Bilibili.searchVideo(av);
                return {vocadbData: data, bilibiliData: bilibiliData};
            }
        }
        
        return { vocadbData: data, bilibiliData: undefined };
    }

    async getArtistDataFromPage() {
        let node1 = (await betterncm.utils.waitForElement(".name-artist > .f-brk > .f-ust")) as HTMLElement;
      
        return { vocadbData: await VocaDB.searchArtist(node1.innerText) };
    }

}