import { Store } from "redux";
import { SongAction, SongActionType } from "../redux/SongInfoStore";

export default abstract class DefaultInfo<T> extends React.Component<{store: Store<T> }> {

  hiddenRef!: React.RefObject<HTMLDivElement>

  constructor(props) {
    super(props);
    this.hiddenRef = React.createRef();
  }

  componentDidMount(): void {
    this.props.store.subscribe(() => {
      this.forceUpdate();
    });
  }

  abstract render();

}
      