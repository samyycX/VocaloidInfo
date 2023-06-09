import { SongAction, SongActionType } from "../redux/SongInfoStore";
import DefaultInfo from "./DefaultInfo";
import { xss } from '../utils' 

export default class DefaultSongInfo extends DefaultInfo<SongAction> {

  render() {
    //拆包redux store的数据
    const action = this.props.store.getState();

    if (action.type == SongActionType.LOADING || action.type == SongActionType.FAILED) {
      return <></>
    }
    
    const { vocadbData, bilibiliData, youtubeData, niconicoData } = action.data;
    const publishDate = new Date(vocadbData.song.publishDate);

    return (
      <dd className="vi-song-info vi-hidden-item" hidden ref={ this.hiddenRef } >
        <br />
        <span>歌曲类型: { vocadbData.song.songType }</span>
        <br />
        <span>发布日期: { publishDate.getFullYear() }年{ publishDate.getMonth()+1 }月{ publishDate.getDate() }日</span>
        <br />
        <br />
        {
          vocadbData.alternateVersions.forEach((version) => {
            return (<span>
              { version.name } ( { version.songType } - { version.artistString } )
            </span>)
          })
        }
        {
          (() => {
            if (niconicoData) {
              let data = niconicoData.data[0];
              return (
                <>
                  <span>NicoNico数据:</span>
                  <br />
                  <span>· 播放量: {data.viewCounter} </span>
                  <br />
                  <span>· 喜欢数: {data.likeCounter} </span>
                  <br />
                  <span>· Mylist数: {data.mylistCounter} </span>
                  <br /><br />
                </>
              )
            }
          })()
        }
        {
          (() => {
            if (youtubeData) {
              let data = youtubeData.items[0].statistics;
              return (
                <>
                  <span>Youtube数据:</span>
                  <br />
                  <span>· 播放量: {data.viewCount} </span>
                  <br />
                  <span>· 喜欢数: {data.likeCount} </span>
                  <br /><br />
                </>
              )
            }
          })()
        }
        {
          (() => {
            if (bilibiliData) {
              let data = bilibiliData.data;
              return (
                <>
                  <span>B站数据:</span>
                  <br />
                  <span>· 播放量: {data.stat.view} </span>
                  <br />
                  <span>· 喜欢数: {data.stat.like} </span>
                  <br />
                  <span>· 投币数: {data.stat.coin} </span>
                  <br />
                  <span>· 收藏数: {data.stat.favorite} </span>
                  {
                    (() => {
                      let list: JSX.Element[] = []
                      data.honor_reply?.honor?.forEach(honor => {
                        list.push(<br />,<span>{ `· ${honor.desc}` }</span>)
                      });
                      return list;
                    })()
                  }
                </>
              )
            }
          })()
        }
      </dd>
    )
  }
}
      