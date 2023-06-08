import { SongAction, SongActionType } from "../redux/SongInfoStore";
import DefaultInfo from "./DefaultInfo";
import { DefaultSongAchievement } from "./DefaultSongAchievement";

const DIANTANG = "#66CCFF"
const CHUANSHUO = "#FFD700"
const SHENHUA = "#FF4D4D"

const YOUTUBE_ICO = "https://vocadb.net/Content/youtube.png";
const NICO_ICO = "https://vocadb.net/Content/nico.png";
const BILI_ICO = "https://www.bilibili.com/favicon.ico";

export default class DefaultSongAchievementInfo extends DefaultInfo<SongAction> {

    render() {
        const action = this.props.store.getState();

        if (action.type == SongActionType.LOADING || action.type == SongActionType.FAILED) {
            return <div></div>
        }

        const { vocadbData, bilibiliData } = action.data;
        const publishDate = new Date(vocadbData.song.publishDate);

        let list: JSX.Element[] = []
        vocadbData.pools.forEach(pool => {
            switch (pool.id) {
                case 30:
                    list.push(<DefaultSongAchievement {...{
                        color: CHUANSHUO,
                        icon_url: NICO_ICO,
                        text: "传说"
                    }} />);
                    break;
                case 2665:
                    list.push(<DefaultSongAchievement {...{
                        color: CHUANSHUO,
                        icon_url: YOUTUBE_ICO,
                        text: "传说"
                    }} />);
                    break;
                case 6477:
                    list.push(<DefaultSongAchievement {...{
                        color: SHENHUA,
                        icon_url: NICO_ICO,
                        text: "神话"
                    }} />);
                    break;
                case 6478:
                    list.push(<DefaultSongAchievement {...{
                        color: SHENHUA,
                        icon_url: YOUTUBE_ICO,
                        text: "传说"
                    }} />);
                    break;
            }
        })
        
        // bilibili
        if (bilibiliData != undefined) {
            let view = bilibiliData.data.stat.view;
            if (view >= 10000000) {
                list.push(<DefaultSongAchievement {...{
                    color: SHENHUA,
                    icon_url: BILI_ICO,
                    text: `播放量 ${view} (神话)`
                }} />)
            } else if (view >= 1000000) {
                list.push(<DefaultSongAchievement {...{
                    color: CHUANSHUO,
                    icon_url: BILI_ICO,
                    text: `播放量 ${view} (传说)`
                }} />);
            } else if (view >= 100000) {
                list.push(<DefaultSongAchievement {...{
                    color: DIANTANG,
                    icon_url: BILI_ICO,
                    text: `播放量 ${view} (殿堂)`
                }} />);
            } else {
                list.push(<DefaultSongAchievement {...{
                    color: DIANTANG,
                    icon_url: BILI_ICO,
                    text: `播放量 ${view}`
                }} />);
            }
        }
        return (<>{ list.length > 0 ? list : <div></div> }</>)
    }

}