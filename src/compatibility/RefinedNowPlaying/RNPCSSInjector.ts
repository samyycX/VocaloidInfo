import css from '../../component/css/refinednowplaying.css';

export default class RNPCSSInjector implements CSSInjector {
    
    async inject(): Promise<void> {
        betterncm.utils.waitForElement('head').then((result) => {
            result?.appendChild(betterncm.utils.dom('style', { innerHTML: css }));
        });
    }
    
}