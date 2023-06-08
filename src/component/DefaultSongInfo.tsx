import { SongAction, SongActionType } from "../redux/SongInfoStore";
import DefaultInfo from "./DefaultInfo";

export default class DefaultSongInfo extends DefaultInfo<SongAction> {

  render() {
    //拆包redux store的数据
    const action = this.props.store.getState();

    if (action.type == SongActionType.LOADING || action.type == SongActionType.FAILED) {
      return <></>
    }
    
    const { vocadbData, bilibiliData } = action.data;
    const publishDate = new Date(vocadbData.song.publishDate);

    return (
      <dd className="vi-song-info vi-hidden-item" hidden ref={ this.hiddenRef } >
        <span>歌曲类型: { vocadbData.song.songType }</span>
        <br />
        <span>发布日期: { publishDate.getFullYear() }年{ publishDate.getMonth()+1 }月{ publishDate.getDate() }日</span>
        <br />
        {
          vocadbData.alternateVersions.forEach((version) => {
            return (<span>
              { version.name } ( { version.songType } - { version.artistString } )
            </span>)
          })
        }
        {
          ((bilibiliData) => {
            if (bilibiliData) {
              let data = bilibiliData.data;
              return (
                <>
                  <span>喜欢数: {data.stat.like} </span>
                  <br />
                  <span>投币数: {data.stat.coin} </span>
                  <br />
                  <span>收藏数: {data.stat.favourite} </span>
                  <br />
                  {
                    data.honor_reply.honor.forEach(honor => {
                      return <span>{ honor }</span>
                    })
                  }
                </>
              )
            }
          })(bilibiliData)
        }
      </dd>
    )
  }
}
      