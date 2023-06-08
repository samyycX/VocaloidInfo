import { Store } from "redux";
import DefaultSongInfo from "./DefaultSongInfo";
import { SongActionType, SongAction } from "../redux/SongInfoStore";
import DefaultContainer from "./DefaultContainer";

export default class DefaultSongInfoContainer extends DefaultContainer<SongAction> {

    render() {

        const store = this.props.store;
        const action = store.getState();

        if (action.type == SongActionType.LOADING) {
            return <span>{ "[VocaloidInfo] 正在获取中, 请稍后.." }</span>
        } else if (action.type == SongActionType.FAILED) {
            return <div></div>
        }

        return (
            <>
            <dd id="vi-control" ref={ this.controlRef }>
                <span>在VocaDB中查找到记录 </span>
                <a onClick={ () => this.switchHidden(this) }>查看信息</a>
            </dd>
            <DefaultSongInfo { ...{ store: store } } ref={ this.infoRef } />
            </>

        )
    }
    
}