import { Store } from "redux";
import DefaultSongInfo from "./DefaultSongInfo";
import { SongActionType, SongAction } from "../redux/SongInfoStore";
import DefaultContainer from "./DefaultContainer";

export default class DefaultSongInfoContainer extends DefaultContainer<SongAction> {

    render() {

        const store = this.props.store;
        const action = store.getState();

        if (action.type == SongActionType.LOADING) {
            return <dd id="vi-song-control">
                <span>{ "VocaloidInfo插件正在获取信息中, 请稍后.." }</span>
            </dd>
        } else if (action.type == SongActionType.FAILED) {
            return <dd id="vi-song-control">
            <span>{ "VocaloidInfo未找到有关信息 (；д；)" }</span>
        </dd>
        }

        return (
            <>
            <dd id="vi-song-control" ref={ this.controlRef }>
                <span>在VocaDB中查找到记录 </span>
                <a onClick={ () => this.switchHidden(this) }>查看信息</a>
            </dd>
            <DefaultSongInfo { ...{ store: store } } ref={ this.infoRef } />
            </>

        )
    }
    
}