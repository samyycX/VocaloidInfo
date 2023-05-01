import DefaultRenderer from "./default/DefaultRenderer";
import * as vocadb from '../api/vocadb.js';
import DefaultCSSInjector from "./default/DefaultCSSInjector";

export default class CompatibilityClass {

    renderer: VIRenderer;
    cssInjector: CSSInjector;

    constructor() {
        // 不同的主题应该对应不同的渲染方式，以后再加吧

        this.renderer = new DefaultRenderer();
        this.cssInjector = new DefaultCSSInjector();

        console.log("INJECT");
        this.cssInjector.inject();
        
    }

    async renderSong(): Promise<void> {
        this.renderer.renderSong();
    }
    
    async renderArtist(): Promise<void> {
        this.renderer.renderArtist();
    }
}