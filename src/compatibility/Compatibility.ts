import DefaultSongInfoRenderer from "./default/DefaultSongInfoRenderer";
import * as vocadb from '../api/vocadb.js';

export default class CompatibilityClass {

    songInfoRenderer: VIRenderer;
    songAchievementRenderer: VIRenderer;
    artistInfoRenderer: VIRenderer;

    constructor() {
        // 不同的主题应该对应不同的渲染方式，以后再加吧

        this.songInfoRenderer = new DefaultSongInfoRenderer();
    }

    async renderSong(): Promise<void> {
        this.songInfoRenderer.render();
    }
}