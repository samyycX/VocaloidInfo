import { SongAction, SongActionType } from "../redux/SongInfoStore";
import DefaultSongAchievementInfo from "./DefaultSongAchievementInfo";
import DefaultContainer from "./DefaultContainer";

export default class DefaultSongAchievementContainer extends DefaultContainer<SongAction> {

    render() {

        const store = this.props.store;
        const action = store.getState();
        if (action.type == SongActionType.LOADING || action.type == SongActionType.FAILED) {
            return <div></div>
        }

        return (
            <h2 className="u-tit f-ff2 f-thide s-fc4" style={{
                marginLeft: 0,
                display: 'flex',
                alignItems: 'center',
                height: 'auto'
            }}>
                <DefaultSongAchievementInfo { ...{store: store} } ref={ this.infoRef } />
            </h2>
        )
    }

}