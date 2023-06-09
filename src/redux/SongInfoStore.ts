import { configureStore, Action } from "@reduxjs/toolkit";

/*
Actions:

loading => 刚刷新，正在获取中，无数据
loaded => 加载完成，有数据
failed => 歌曲找不到，无数据

*/

export enum SongActionType {
    LOADING,
    LOADED,
    FAILED,
    ALL = LOADING | LOADED | FAILED
}

    export interface SongAction extends Action  {
        type: SongActionType,
        data: {
            vocadbData: any,
            bilibiliData?: any,
            youtubeData?: any,
            niconicoData?: any
        }
    }
const reducer = ( _, action: SongAction) => {
    return action;
}


export const SongInfoStore = configureStore({ reducer: reducer });