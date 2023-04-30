import Settings from './component/Settings.jsx';
import CompatibilityClass from './compatibility/Compatibility.ts';

import { renderToString } from 'react-dom/server';

const Compatibility = new CompatibilityClass();

// 设置页
plugin.onConfig( tools => {
    return dom('div', {innerHTML:renderToString(<Settings />)}).firstElementChild;
});

plugin.onLoad( () => {

    // 打开歌曲页
    new MutationObserver((records, observer) => {
        if (records[0].addedNodes[0] && records[0].addedNodes[0].className && records[0].addedNodes[0].className.includes("g-single")) {
            betterncm.utils.debounce(updateSong, 400)();
        }
    }).observe(document.body, {childList: true});

    // 切换歌曲页
    //new MutationObserver((records, observer) => {
    //    betterncm.utils.debounce(updateSong, 400)();
    //}).observe(document.body.querySelector("div[class='name f-thide s-fc1 j-flag']"), {childList: true});

} );

const updateSong = async () => {
    console.log(2);
    Compatibility.renderSong();
    console.log("2end");
}