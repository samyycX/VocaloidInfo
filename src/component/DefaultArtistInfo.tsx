import { Store } from 'redux'
import { ArtistAction, ArtistActionType, ArtistType } from '../redux/ArtistInfoStore';
import * as utils from '../utils.js' ;
import DefaultInfo from './DefaultInfo';

//React.Component<{store: Store<ArtistAction>}>
export default class DefaultArtistInfo extends DefaultInfo<ArtistAction> {

    render() {
        const action = this.props.store.getState();

        if (action.type == ArtistActionType.LOADING || action.type == ArtistActionType.FAILED) {
            return <></>
        }

        return (<dd className='vi-artist-info vi-hidden-item' hidden ref={ this.hiddenRef } >
            <br />
            { (() => {
            switch (action.artistType) {
                case ArtistType.PRODUCER:
                    return <ProducerInfo { ...action.data } />
                case ArtistType.VOCALOID:
                    return <VocaloidInfo { ...action.data } />
                default:
                    return <DefaultInfo2 { ...action.data } />
                }
            } )() }
        </dd>)

        
    }

}

const ProducerInfo = (data) => {
    const vocadbData = data.vocadbData;
    return (<>
        <span>类型: P主</span>
        <br />
        <br />
        <span>总专辑数: { vocadbData.sharedStats.albumCount }</span>
        <br />
        <span>总歌曲数: { vocadbData.sharedStats.songCount }</span>
        <br />
        <br />
        <span>作品排名TOP5 (VocaDB)</span>
        <br />
        <> { 
            (() => {
                let list: JSX.Element[] = [];
                vocadbData.topSongs.slice(0,5).forEach((song, index) => {
                    list.push((<>
                        <a onClick={() => {window.location.href = `#/m/search/?type=1&s=${song.defaultName}&logsource=typing&position=1`}}>点击搜索 </a>
                        <span> { index+1 }. {utils.getChineseName(song.additionalNames, song.defaultName)}</span>
                        <br></br>
                    </>))
                });
                return list;
            })()
        }
        </>
        <br />
        <span>使用声库（前三）</span>
        <br />
        {
            (() => {
                let list: JSX.Element[] = []
                vocadbData.advancedStats.topVocaloids.slice(0,3).forEach((vocaloid) => {
                    list.push(<span>{ vocaloid.data.name } - 使用次数: { vocaloid.count }</span>, <br/>)
               })
               return list;
            })()
           
        }
        <br />
        <span>简介: { vocadbData.description?.original }</span>

    </>)
}

const VocaloidInfo = (data) => {
    const vocadbData = data.vocadbData;
    const date = new Date(vocadbData.releaseDate);
    return (<>
        <span>类型: { vocadbData.artistType }歌姬</span>
        <br />
        {
            (() => {
                let list: JSX.Element[] = [];
                if (vocadbData.childVoicebanks) {
                    list.push(<span>所有子声库</span>, <br/>);
                    vocadbData.childVoicebanks?.forEach((voicebank) => {
                        list.push(<>
                            <span>{ voicebank.name }</span>
                            <br />
                        </>)
                    })
                }
                return list;
            })()
        }
        <br />
        <span>所属公司: { vocadbData.groups.map(g => g.defaultName).join(", ") }</span>
        <br />
        <span>画师: { vocadbData.illustrators.map(i => i.defaultName).join(", ") }</span>
        <br />
        <span>发布日期: { date.getFullYear()}年{date.getMonth()+1}月{date.getDate() }日</span>
        <br />
        <span>声源: { vocadbData.voiceProviders.map(v => v.name).join(", ") }</span>
        <br />
        <br />
        <span>总专辑数: { vocadbData.sharedStats.albumCount}</span>
        <br />
        <span>总歌曲数: { vocadbData.sharedStats.songCount }</span>
        <br />
        <br />
        <span>作品排名TOP5 (VocaDB)</span>
        <br />
        <> { 
            (() => {
                let list: JSX.Element[] = [];
                vocadbData.topSongs.slice(0,5).forEach((song, index) => {
                    list.push((<>
                        <a onClick={() => {window.location.href = `#/m/search/?type=1&s=${song.defaultName}&logsource=typing&position=1`}}>点击搜索 </a>
                        <span> { index+1 }. {utils.getChineseName(song.additionalNames, song.defaultName)}</span>
                        <br></br>
                    </>))
                });
                return list;
            })()
        }
        </>
        <br />
        <span>简介: { vocadbData.description.original }</span>
    </>)
    
}

const DefaultInfo2 = (data) => {
    const vocadbData = data.vocadbData;
    return (<>
        <br />
        <span>类型: { vocadbData.artistType }</span>
        <br />
        <span>简介: { vocadbData.description?.original }</span>
    </>)
}