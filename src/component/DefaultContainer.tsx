import { Store } from "redux";
import DefaultSongInfo from "./DefaultSongInfo";
import { SongActionType } from "../redux/SongInfoStore";
import DefaultInfo from "./DefaultInfo";

export default abstract class DefaultContainer<T> extends React.Component<{ store: Store<T> }> {

    controlRef!: React.RefObject<any>;
    infoRef!: React.RefObject<DefaultInfo<T>>;

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

    switchHidden(container: DefaultContainer<T>) {
        let vicontrol = container.controlRef.current!;
        
        if (vicontrol.classList.contains("vi-hidden-displayed")) {
            
            container.infoRef.current!.hiddenRef.current!.hidden = true;
            vicontrol.classList.remove("vi-hidden-displayed");
            (vicontrol.childNodes[1] as HTMLElement).innerText = "查看信息";
        } else {
            container.infoRef.current!.hiddenRef.current!.hidden = false;
            vicontrol.classList.add("vi-hidden-displayed");
            (vicontrol.childNodes[1] as HTMLElement).innerText = "隐藏信息";
        }
    }

    abstract render();
    
}