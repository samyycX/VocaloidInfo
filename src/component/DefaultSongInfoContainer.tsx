import { Store } from "redux";
import DefaultSongInfo from "./DefaultSongInfo";

interface State {
    vocadbData: any,
    bilibiliData?: any
  };
export default class DefaultSongInfoContainer extends React.Component<{store: Store}> {

    componentDidMount(): void {
        this.props.store.subscribe(() => {
            this.forceUpdate();
        });
    }

    switchHidden() {
        let vicontrol: HTMLElement = document.getElementById("vi-control")!;
        const hiddenItems: HTMLCollectionOf<HTMLElement> =  document.getElementsByClassName("vi-hidden-item")! as HTMLCollectionOf<HTMLElement>;
    
        if (vicontrol.classList.contains("vi-hidden-displayed")) {
            
            for (let i = 0; i < hiddenItems.length; i++) {
                hiddenItems.item(i)!.hidden = true;
            }
            vicontrol.classList.remove("vi-hidden-displayed");
            (vicontrol.childNodes[1] as HTMLElement).innerText = "查看信息";
        } else {
            for (let i = 0; i < hiddenItems.length; i++) {
                hiddenItems.item(i)!.hidden = false;
            }
            vicontrol.classList.add("vi-hidden-displayed");
            (vicontrol.childNodes[1] as HTMLElement).innerText = "隐藏信息";
        }
    }

    render() {

        const store = this.props.store;
        const action = store.getState();

        if (action.type == "loading") {
            return <span>{ "[VocaloidInfo] 正在获取中, 请稍后.." }</span>
        } else if (action.type == "failed") {
            return <></>
        }

        return (
            <>
            <dd id="vi-control">
                <span>在VocaDB中查找到记录 </span>
                <a onClick={this.switchHidden}>查看信息</a>
            </dd>
            <DefaultSongInfo { ...{store: store} } />
            </>

        )
    }
    
}