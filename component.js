import { createNode } from "./utils.js";

function newAchievement(color, img, text) {
    return createNode(`
        <b class="vi-achievement f-ust f-ust-1" style="border: 1px solid ${color}; background-color: ${color}30">
            <img src="${img}" width="16px" height="16px"/>
            <p>${text}</p>
        </b>
    `);
}

const YOUTUBE_ICO = "https://vocadb.net/Content/youtube.png";
const NICO_ICO = "https://vocadb.net/Content/nico.png";
const BILI_ICO = "https://www.bilibili.com/favicon.ico";

export const Youtube1 = newAchievement("#FFD700", YOUTUBE_ICO, "传说");
export const Youtube2 = newAchievement("#FF4D4D", YOUTUBE_ICO, "神话")

export const Niconico1 = newAchievement("#FFD700", NICO_ICO, "传说");
export const Niconico2 = newAchievement("#FF4D4D", NICO_ICO, "神话");

export const Bilibili1 = newAchievement("#66CCFF", BILI_ICO, "殿堂");
export const Bilibili2 = newAchievement("#FFD700", BILI_ICO, "传说");
export const Bilibili3 = newAchievement("#FF4D4D", BILI_ICO, "神话");
export const Bilibili4 = (view) => newAchievement("#66CCFF", BILI_ICO, view);