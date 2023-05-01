import { Store } from "redux";
import DefaultSongInfo from "./DefaultSongInfo";
import { SongActionType } from "../redux/SongInfoStore";

export default class DefaultSongInfoContainer extends React.Component<{store: Store}> {

    controlRef!: React.RefObject<HTMLDivElement>;
    infoRef!: React.RefObject<DefaultSongInfo>;

    constructor(props) {
        super(props);
        this.controlRef = React.createRef();
        this.infoRef = React.createRef();
    }

    componentDidMount(): void {
        this.props.store.subscribe(() => {
            this.forceUpdate();
        });
    }

    switchHidden(container: DefaultSongInfoContainer) {
        let vicontrol = container.controlRef.current!;
        
    
        if (vicontrol.classList.contains("vi-hidden-displayed")) {
            
            container.infoRef.current!.divRef.current!.hidden = true;
            vicontrol.classList.remove("vi-hidden-displayed");
            (vicontrol.childNodes[1] as HTMLElement).innerText = "查看信息";
        } else {
            container.infoRef.current!.divRef.current!.hidden = false;
            vicontrol.classList.add("vi-hidden-displayed");
            (vicontrol.childNodes[1] as HTMLElement).innerText = "隐藏信息";
        }
    }

    render() {

        const store = this.props.store;
        const action = store.getState();

        if (action.type == SongActionType.LOADING) {
            return <span>{ "[VocaloidInfo] 正在获取中, 请稍后.." }</span>
        } else if (action.type == SongActionType.FAILED) {
            return <></>
        }

        return (
            <>
            <dd id="vi-control" ref={ this.controlRef }>
                <span>在VocaDB中查找到记录 </span>
                <a onClick={ () => this.switchHidden(this) }>查看信息</a>
            </dd>
            <DefaultSongInfo { ...{store: store} } ref={this.infoRef} />
            </>

        )
    }
    
}