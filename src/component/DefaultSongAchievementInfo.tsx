import { SongAction, SongActionType } from "../redux/SongInfoStore";
import DefaultInfo from "./DefaultInfo";
import { DefaultSongAchievement } from "./DefaultSongAchievement";

const DIANTANG = "#66CCFF"
const CHUANSHUO = "#FFD700"
const SHENHUA = "#FF4D4D"

const YOUTUBE_ICO = "https://vocadb.net/Content/youtube.png";
const NICO_ICO = "https://vocadb.net/Content/nico.png";
const BILI_ICO = "https://www.bilibili.com/favicon.ico";

const formatNumber = (num: number) => {
    if (num >= 100000000) {
        return `${Math.floor(num / 1000000) / 100} 亿`
        // 12345678
    } else if (num >= 1000000) {
        return `${Math.floor(num / 100) / 100} 万`
    } else {
        return num.toString();
    }
}

export default class DefaultSongAchievementInfo extends DefaultInfo<SongAction> {

    render() {
        const action = this.props.store.getState();

        if (action.type == SongActionType.LOADING || action.type == SongActionType.FAILED) {
            return <div></div>
        }

        const { vocadbData, bilibiliData, youtubeData, niconicoData } = action.data;

        let list: JSX.Element[] = []
        let nView: number = niconicoData ? niconicoData?.data[0].viewCounter : 0;
        let yView: number = youtubeData ? parseInt(youtubeData?.items[0].statistics.viewCount) : 0;
        let bView: number = bilibiliData ?bilibiliData?.data.stat.view : 0;

        let formattedNView = formatNumber(nView);
        let formattedYView = formatNumber(yView);
        let formattedBView = formatNumber(bView);

        if (nView >= 10000000) {
            list.push(<DefaultSongAchievement {...{
                color: SHENHUA,
                icon_url: NICO_ICO,
                text: formattedNView
            }} />);
        } else if ( nView >= 1000000) {
            list.push(<DefaultSongAchievement {...{
                color: CHUANSHUO,
                icon_url: NICO_ICO,
                text: formattedNView
            }} />);
        } else if ( nView >= 100000 ) {
            list.push(<DefaultSongAchievement {...{
                color: DIANTANG,
                icon_url: NICO_ICO,
                text: formattedNView
            }} />);
        }

        if ( yView >= 10000000 ) {
            list.push(<DefaultSongAchievement {...{
                color: SHENHUA,
                icon_url: YOUTUBE_ICO,
                text: formattedYView
            }} />);
        } else if ( yView >= 1000000 ) {
            list.push(<DefaultSongAchievement {...{
                color: CHUANSHUO,
                icon_url: YOUTUBE_ICO,
                text: formattedYView
            }} />);
        } else if ( yView >= 100000 ) {
            list.push(<DefaultSongAchievement {...{
                color: DIANTANG,
                icon_url: YOUTUBE_ICO,
                text: formattedYView
            }} />);
        }
        
        if (bView >= 10000000) {
            list.push(<DefaultSongAchievement {...{
                color: SHENHUA,
                icon_url: BILI_ICO,
                text: formattedBView
            }} />)
        } else if (bView >= 1000000) {
            list.push(<DefaultSongAchievement {...{
                color: CHUANSHUO,
                icon_url: BILI_ICO,
                text: formattedBView
            }} />);
        } else if (bView >= 100000) {
            list.push(<DefaultSongAchievement {...{
                color: DIANTANG,
                icon_url: BILI_ICO,
                text: formattedBView
            }} />);
        }
        return (<>{ list.length > 0 ? list : <div></div> }</>)
    }

}