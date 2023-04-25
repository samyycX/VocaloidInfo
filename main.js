import { getSongById, searchArtist, searchSong } from './vocadb.js';
import { searchVideo } from './bilibili.js';
import { addMaterialYouStyle, getChineseNameFromNames } from './utils.js';
// 这个文件主要是为了处理一些歌名格式不统一导致搜索不到的问题，所以只能使用强制覆盖方式来修正
import overrideData from './override.json' assert { type: 'JSON' }
import * as component from './component.js';

const BR = () => dom('br', {});
const text = (text) => dom('span', {innerText:text, 'style':{'-webkit-user-select':'text'}});

let nowPage;
let initialized = false;

const overrideMap = new Map(Object.entries(overrideData));

plugin.onConfig(tools => {
    let page = dom('div', {})
    page.appendChild(dom('a', {innerText:"点我前往 Github 仓库", onclick: function() {betterncm.ncm.openUrl("https://github.com/samyycX/VocaloidInfo")}}));
    page.appendChild(BR());
    page.appendChild(dom('a', {innerText:"点我反馈本插件的问题", onclick: function() {betterncm.ncm.openUrl("https://github.com/samyycX/VocaloidInfo/issues")}}))
    return page;
});

plugin.onLoad(function () {

    //initCache();
    
    betterncm.utils.waitForElement("div[class='name f-thide s-fc1 j-flag']").then(result => {
        if (!initialized) {
            new MutationObserver((records, observer) => {
                betterncm.utils.waitForElement('span[class="name j-flag"]').then(span => {
                    document.querySelectorAll(".vi-song-item").forEach(node => node.remove());
                });
                debouncedSongUpdate();
            }).observe(document.body.querySelector("div[class='name f-thide s-fc1 j-flag']"), {childList: true});
            initialized = true;
        }
    });
    

    new MutationObserver((records, observer) => {
        if (records[0].addedNodes[0] && records[0].addedNodes[0].className && records[0].addedNodes[0].className.includes("g-single")) {
            debouncedSongUpdate();
        }
    }).observe(document.body, {childList: true});

    // 歌手页面
    window.addEventListener("hashchange", event => {
        const url = new URL(event.newURL);
        if(url.hash.startsWith("#/m/artist/?")) {
            nowPage = url.hash;
           debouncedArtistUpdate();
        }
    })
});

let debouncedArtistUpdate = betterncm.utils.debounce(() => {
    betterncm.utils.waitForElement(".name-artist").then(result => {
        const name = result.querySelector(".f-ust").innerText;
        
        searchArtist(name).then(data => {
            // 防止快速切换时显示错误
            //if (url.hash != nowPage) return;
            // 防止显示两次
            if (document.getElementsByClassName("vi-hidden-item").length != 0) return;
            if (data != null) {
                //addMaterialYouStyle(result, data);
                setArtistHTML(data);
                displayed = true;
            }
        })

    });
}, 400);

let debouncedSongUpdate = betterncm.utils.debounce(updateSong, 400);

async function updateSong() {
    let title = await betterncm.utils.waitForElement('span[class="name j-flag"]');//.then(span => {
    let artists = await betterncm.utils.waitForElement('li[class="f-thide f-ust f-ust-1"]');
        
    if (document.querySelector(".vi-song-item")) {
        document.querySelectorAll(".vi-song-item").forEach(node => node.remove());
    }

    // 去除最后所有的空格..
    const songName = title.innerText.replace(/(\s*$)/g, "");
    //console.log(songName);
    let artistsName = [];
    artists.childNodes.forEach(child => {
        if (child.title) artistsName.push(child.title);
    })
    //console.log(artistsName);

    let promise;

    if (overrideMap.has(songName)) {
        promise = getSongById(overrideMap.get(songName));
    } else {
        promise = searchSong(songName, artistsName);
    }

    promise.then(data => {
        if (data == null) return;
        songDetails(data).then(descriptions => {
            let dd1 = dom('dd', {'class': ['inf', 's-fc2', 'vi-song-item'], id:'vi-control'},
                dom('span', {innerText:"在VocaDB中查找到记录  ", 'class': ['item', 's-fc1', 'mq-yahei'], style: {"font-size": "13px"}}),
                dom('a', {innerText:"查看信息", 'class': ["mq-yahei"], style: {"font-size": "13px"}}),
                BR(), BR()
            );
            dd1.childNodes[1].addEventListener('click', switchHidden, false);
            descriptions.forEach(description => {
                description = hideItem(description);
                description.classList.add("mq-yahei");
                description.style.fontSize = "13px";
                //if (loadedPlugins['MaterialYouTheme']) {
                    //description.style.fontFamily = document.getElementsByTagName("body")[0].style.fontFamily;
                //}
                dd1.appendChild(description);
            });
            dd1.appendChild(hideItem(BR()));
            dd1.appendChild(hideItem(BR()));
        

            betterncm.utils.waitForElement('div[class="m-comment m-comment-play"]').then(result => {
                result.insertBefore(dd1, result.firstChild);
            });
        });
    })
}
async function setArtistHTML(data) {
    betterncm.utils.waitForElement(".m-info-artist").then(result => {

        let dd1 = dom('dd', {'class': ['inf', 's-fc2'], 'id':'vi-control'},
            dom('span', {innerText:"在VocaDB中查找到记录  ", 'class': ['item', 's-fc1']}),
            dom('a', {innerText:"查看信息"}),
            BR(), BR()
        );
        dd1.childNodes[1].addEventListener('click', switchHidden, false);
       
        switch (data.artistType) {
            case "Producer":
                producerDetails(data).forEach(child => {
                    dd1.appendChild(hideItem(child));
                });
                break;
            case "Vocaloid":
            case "SynthesizerV":
            case "CeVIO":
                vocaloidDetails(data).forEach(child => {
                    dd1.appendChild(hideItem(child));
                }); 
                break;
            default:
                dd1.appendChild(BR());
                dd1.appendChild(hideItem(text(`类型: ${data.artistType}`)));
                dd1.appendChild(BR());
                dd1.appendChild(hideItem(text(`简介: ${data.description.original}`)));
        }

        addMaterialYouStyle(result ,dd1)
    });
}

function producerDetails(data) {
    
    let descriptions = [];
    descriptions.push(text("类型: P主"));
    descriptions.push(BR(), BR());

    descriptions.push(text(`总专辑数: ${data.sharedStats.albumCount}`), BR());
    descriptions.push(text(`总歌曲数: ${data.sharedStats.songCount}`), BR(), BR());

    descriptions.push(text("作品排名TOP5 (VocaDB)"),BR());
    // 获取他的前五首歌
    const topSongs = data.topSongs.slice(0, 5);
    let i = 0;
    for (let song of topSongs) {
        // 获取歌的中文名
        let name = getChineseNameFromNames(song.additionalNames, song.defaultName);

        i++;
        let searchButton = dom("a", {innerText:"点击搜索   "});
        searchButton.addEventListener('click', function() {window.location = `#/m/search/?type=1&s=${song.defaultName}&logsource=typing&position=1`}, false);
        descriptions.push(searchButton);
        descriptions.push(text(`${i}. ${name}`));
        
        descriptions.push(BR());
    }

    descriptions.push(BR());
    descriptions.push(text("使用声库 (前三)"), BR());
    for (let vocaloid of data.advancedStats.topVocaloids.slice(0,3)) {
        descriptions.push(text(`${vocaloid.data.name} - 使用次数:${vocaloid.count}`), BR())
    }
    
    descriptions.push(BR());
    descriptions.push(text(`简介: ${data.description.original}`));
    return descriptions;
}

function vocaloidDetails(data) {
    let descriptions = [];
    descriptions.push(text(`类型: ${data.artistType}歌姬`));
    descriptions.push(BR());
    if (JSON.stringify(data.childVoicebanks) != '[]') {
        descriptions.push(text("所有子声库"), BR());
        for (let voicebank of data.childVoicebanks) {
            descriptions.push(text(voicebank.name), BR());
        }
    }
    //let illustratorNames = "";
    //for (let illustrator of data.illustrators) {
    //    illustratorNames += ""
    //}
    descriptions.push(BR(), text(`所属公司: ${data.groups.map(g => g.defaultName).join(", ")}`), BR());
    descriptions.push(text(`画师: ${data.illustrators.map(i => i.defaultName).join(", ")}`), BR());
    const date = new Date(data.releaseDate);
    descriptions.push(text(`发布日期: ${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`), BR());
    descriptions.push(text(`声源: ${data.voiceProviders.map(v => v.name).join(", ")}`), BR());

    descriptions.push(BR());

    descriptions.push(text(`总专辑数: ${data.sharedStats.albumCount}`), BR());
    descriptions.push(text(`总歌曲数: ${data.sharedStats.songCount}`), BR());

    // 获取她的前五首歌
    descriptions.push(BR(), text("作品排名TOP5 (VocaDB)"), BR())
    const topSongs = data.topSongs.slice(0, 5);
    let i = 0;
    for (let song of topSongs) {
        // 获取歌的中文名
        let name = getChineseNameFromNames(song.additionalNames, song.defaultName);

        i++;
        let searchButton = dom("a", {innerText:"点击搜索   "});
        searchButton.addEventListener('click', function() {window.location = `#/m/search/?type=1&s=${song.defaultName}&logsource=typing&position=1`}, false);
        descriptions.push(searchButton);
        descriptions.push(text(`${i}. ${name} (${song.songType})`));
        
        descriptions.push(BR());
    }

    descriptions.push(BR(), text(`简介: ${data.description.original}`), BR());

    return descriptions;

}

async function songDetails(data) {
    let descriptions = [];
    descriptions.push(text(`歌曲类型: ${data.song.songType}`), BR());
    const date = new Date(data.song.publishDate);
    descriptions.push(text(`发布日期: ${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`), BR());

    let info = await betterncm.utils.waitForElement("div[class='info']");
    let achievementsLine = dom('h2', {'class':['u-tit','f-ff2','f-thide','s-fc4']});
    achievementsLine.style.marginLeft = "0";
    achievementsLine.style.display = "flex";
    achievementsLine.style.alignItems = "center";
    achievementsLine.style.height = "auto";

    // 传说 / 神话
    for (let pool of data.pools) {
        switch (pool.id) {
            case 30:
                //descriptions.push(BR(), dom('span', {innerText:'NicoNico传说达成', 'style':{'color':'#FFD700'}}));
                achievementsLine.appendChild(component.Niconico1);
                break;
            case 2665:
                //descriptions.push(BR(), dom('span', {innerText:'Youtube传说达成', 'style':{'color':'#FFD700'}}));
                achievementsLine.appendChild(component.Youtube1);
                break;
            case 6477:
                //descriptions.push(BR(), dom('span', {innerText:'NicoNico神话达成', 'style':{'color':'#FF4D4D'}}));
                achievementsLine.appendChild(component.Niconico2);
                break;
            case 6478:
                //descriptions.push(BR(), dom('span', {innerText:'Youtube神话达成', 'style':{'color':'#FF4D4D'}}));
                achievementsLine.appendChild(component.Youtube2);
        }
    }

    if (data.alternateVersions.length != 0) {
        descriptions.push(BR(), text("其他版本 (翻调/翻唱/Remix):"))
        data.alternateVersions.forEach(version => {
            descriptions.push(BR(), text(`${version.name} (${version.songType}) - ${version.artistString}`));
        });
    }

    for (let pv of data.pvs) {
        if (pv.service == "Bilibili") {
            descriptions.push(BR(), BR(), text("此歌曲B站数据: "), BR());
            let av = pv.url.split("/").slice(-1)[0];
            let data = await searchVideo(av);
            if (data.code == 0) {
                data = data.data;
                
                let view = data.stat.view;
                
                if (view >= 10000000) {
                    achievementsLine.appendChild(component.Bilibili3);
                    //descriptions.push(dom('span', {innerText:`播放量 ${view} (神话)`, 'style':{'color':'#FF4D4D'}}));
                } else if (view >= 1000000) {
                    achievementsLine.appendChild(component.Bilibili2);
                    //descriptions.push(dom('span', {innerText:`播放量 ${view} (传说)`, 'style':{'color':'#FFD700'}}));
                } else if (view >= 100000) {
                    achievementsLine.appendChild(component.Bilibili1);
                    //descriptions.push(dom('span', {innerText:`播放量 ${view} (殿堂)`, 'style':{'color':'#66CCFF'}}));
                } else {
                    achievementsLine.appendChild(component.Bilibili4(view));
                    //descriptions.push(text(`播放量 ${view}`));
                }
                descriptions.push(BR());

                descriptions.push(text(`喜欢数 ${data.stat.like}`), BR());
                descriptions.push(text(`投币数 ${data.stat.coin}`), BR());
                descriptions.push(text(`收藏数 ${data.stat.favorite}`), BR());

                descriptions.push(BR());
                if (data.honor_reply.honor != undefined) {
                    data.honor_reply.honor.forEach(honor => {
                        descriptions.push(text(honor.desc), BR());
                    });
                }   

                descriptions.push(BR(),text(`简介: `), BR());
                for (let desc of data.desc.split("\n")) {
                    descriptions.push(text(desc), BR());
                }
                descriptions.push(BR());
            }
        }
    }

    // 设置间距
    for (let node of Array(...achievementsLine.children).slice()) {
        node.style.marginRight = "5px";
    }

    info.insertBefore(achievementsLine, info.firstChild);

    return descriptions;

    
}

function hideItem(element) {
    element.hidden = true;
    element.setAttribute("class", "vi-hidden-item item s-fc1");
    return element;
}

function switchHidden() {

    let vicontrol = document.getElementById("vi-control");
    const hiddenItems = document.getElementsByClassName("vi-hidden-item");

    if (vicontrol.classList.contains("vi-hidden-displayed")) {
        
        for (let i = 0; i < hiddenItems.length; i++) {
            hiddenItems.item(i).hidden = true;
        }
        vicontrol.classList.remove("vi-hidden-displayed");
        vicontrol.childNodes[1].innerText = "查看信息";
    } else {
        for (let i = 0; i < hiddenItems.length; i++) {
            hiddenItems.item(i).hidden = false;
        }
        vicontrol.classList.add("vi-hidden-displayed");
        vicontrol.childNodes[1].innerText = "隐藏信息";
    }
    
}