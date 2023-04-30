import { configureStore } from "@reduxjs/toolkit";

/*
Actions:

loading => 刚刷新，正在获取中，无数据
loaded => 加载完成，有数据
failed => 歌曲找不到，无数据

*/
const reducer = ( data: {}, action) => {
    return action;
}


export default configureStore({ reducer: reducer })