import { Store } from "redux";
import DefaultArtistInfo from "./DefaultArtistInfo";
import { ArtistActionType, ArtistAction } from "../redux/ArtistInfoStore";
import DefaultContainer from "./DefaultContainer";

// extends React.Component<{store: Store}>
export default class DefaultArtistInfoContainer extends DefaultContainer<ArtistAction> {

    constructor(props) {
        super(props);
        console.log(props);
        console.log(super.props);
    }

    render() {

        const store = this.props.store;
        const action = store.getState();

        if (action.type == ArtistActionType.LOADING) {
            return <span>{ "[VocaloidInfo] 正在获取中, 请稍后.." }</span>
        } else if (action.type == ArtistActionType.FAILED) {
            return <></>
        }

        return (
            <>
            <dd id="vi-control" ref={ this.controlRef } >
                <span>在VocaDB中查找到记录 </span>
                <a onClick={ () => this.switchHidden(this) } >查看信息</a>
            </dd>
            <DefaultArtistInfo { ...{store: store} } ref={ this.infoRef } />
            </>

        )
    }
    
}