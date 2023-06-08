import * as VocaDB from '../../api/vocadb.js';
import * as Bilibili from '../../api/bilibili.js';
import {SongActionType, SongInfoStore } from '../../redux/SongInfoStore';
import DefaultSongInfoContainer from '../../component/DefaultSongInfoContainer';
import DefaultDataGetter from './DefaultDataGetter';
import { ArtistActionType, ArtistInfoStore } from '../../redux/ArtistInfoStore';
import DefaultArtistInfoContainer from '../../component/DefaultArtistInfoContainer';
import DefaultSongAchievementContainer from '../../component/DefaultSongAchievementContainer';

export default class DefaultRenderer implements VIRenderer {

    dataGetter: DataGetter;
    songComponentInitialized: boolean;

    constructor() {
        this.dataGetter = new DefaultDataGetter();
    }

    async renderSong(): Promise<void> {
        // 先把store的状态更新为正在获取中
        SongInfoStore.dispatch( {type: SongActionType.LOADING } );
        
        const data = await this.dataGetter.getSongDataFromPage();

        if (data.vocadbData == undefined) {
            SongInfoStore.dispatch( {type: SongActionType.FAILED } );
            return;
        }

        SongInfoStore.dispatch( { type: SongActionType.LOADED , data: data } )

        // 第一次挂载React组件，之后使用redux store更新状态
        if (!this.songComponentInitialized) {
            let fatherNode = await betterncm.utils.waitForElement('div[class="m-comment m-comment-play"]');
            const mountPoint = betterncm.utils.dom('div', {});
            fatherNode!.insertBefore(mountPoint, fatherNode!.firstChild);
            ReactDOM.render(<DefaultSongInfoContainer { ...{store: SongInfoStore} } />, mountPoint);

            this.songComponentInitialized = true;
        }

        let achiFatherNode = await betterncm.utils.waitForElement(".inf > .info");
        const achiMountPoint = betterncm.utils.dom('div', {});
        achiFatherNode!.insertBefore(achiMountPoint, achiFatherNode!.firstChild)
        ReactDOM.render(<DefaultSongAchievementContainer { ...{ store: SongInfoStore } } />, achiMountPoint)

    }

    async renderArtist(): Promise<void> {

        ArtistInfoStore.dispatch( { type: ArtistActionType.LOADING } );

        const fatherNode = await betterncm.utils.waitForElement(".m-info-artist");
        const mountPoint = betterncm.utils.dom('div', {});
        fatherNode?.appendChild(mountPoint);
        ReactDOM.render(<DefaultArtistInfoContainer { ...{ store: ArtistInfoStore } } />, mountPoint);       

        const data = await this.dataGetter.getArtistDataFromPage();

        if (data.vocadbData == undefined) {
            ArtistInfoStore.dispatch( { type: ArtistActionType.FAILED } );
            return;
        }

        ArtistInfoStore.dispatch( { type: ArtistActionType.LOADED, data: data } );


    }
    
}