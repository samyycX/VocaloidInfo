import * as VocaDB from '../../api/vocadb.js';
import * as Bilibili from '../../api/bilibili.js';
import * as SongInfoStore from '../SongInfoStore';
import DefaultSongInfoContainer from '../../component/DefaultSongInfoContainer';


let initialized = false;

export default class DefaultSongInfoRenderer implements VIRenderer {

    async render(): Promise<void> {

        // 先把store的状态更新为正在获取中
        SongInfoStore.default.dispatch( {type: "loading" } )
        
        // 获取数据
        let title: HTMLElement = await betterncm.utils.waitForElement('span[class="name j-flag"]') as HTMLElement;
        //let artists = await betterncm.utils.waitForElement('li[class="f-thide f-ust f-ust-1"]');

        let fatherNode = await betterncm.utils.waitForElement('div[class="m-comment m-comment-play"]');

        const name = title.innerText!.replace(/(\s*$)/g, "");
        const data = await VocaDB.searchSong(name);

        if (data == undefined) {
            SongInfoStore.default.dispatch( {type: "failed" } )
            return;
        }

        // 检查歌曲是否有b站的数据
        for (let pv of data.pvs) {
            if (pv.service == "Bilibili") {
                const av = pv.url.split("/").slice(-1)[0];
                const bilibiliData = await Bilibili.searchVideo(av);

                const obj = {vocadbData: data, bilibiliData: bilibiliData};

                // 更新redux store
                const mountPoint = betterncm.utils.dom('div', {});
                fatherNode?.insertBefore(mountPoint, fatherNode.firstChild);

                SongInfoStore.default.dispatch( {type: "loaded", data: obj } )

                // 第一次加载时渲染React
                if (!initialized) ReactDOM.render(<DefaultSongInfoContainer { ...{store: SongInfoStore.default} } />, mountPoint);
                initialized = true;
                return;
            }
        }

        // 如果没有B站数据
        const bilibiliData: any = undefined;
        const obj = {vocadbData: data, bilibiliData: bilibiliData};
        const mountPoint = betterncm.utils.dom('div', {});
        fatherNode?.insertBefore(mountPoint, fatherNode.firstChild);

        SongInfoStore.default.dispatch( {type: "loaded", data: obj } )

        if (!initialized) ReactDOM.render(<DefaultSongInfoContainer { ...{store: SongInfoStore.default} } />, mountPoint);
        initialized = true;
        return;

    }
    
}