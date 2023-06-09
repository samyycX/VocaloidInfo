import DefaultRenderer from "./default/DefaultRenderer";
import DefaultCSSInjector from "./default/DefaultCSSInjector";
import MaterialYouCSSInjector from "./materialyou/MaterialYouCSSInjector";
import RNPCSSInjector from "./RefinedNowPlaying/RNPCSSInjector";

let initialized = false;

export default class CompatibilityClass {

    renderer: VIRenderer;
    constructor() {
        this.renderer = new DefaultRenderer();
    }

    async renderSong(): Promise<void> {
        this.renderer.renderSong();
        if (!initialized) {
            this.injectCSS();
            initialized = true;
        }
    }
    
    async renderArtist(): Promise<void> {
        this.renderer.renderArtist();
        if (!initialized) {
            this.injectCSS();
            initialized = true;
        }
    }

    async injectCSS() {

        let cssInjectors: CSSInjector[] = []
        cssInjectors.push(new DefaultCSSInjector())
        if (loadedPlugins['MaterialYouTheme']) {
            cssInjectors.push(new MaterialYouCSSInjector());
        }
        if (loadedPlugins['RefinedNowPlaying']) {
            cssInjectors.push(new RNPCSSInjector());
        }

        for (let injector of cssInjectors) {
            injector.inject();
        }
    }

    
}