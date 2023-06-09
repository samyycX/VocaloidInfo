import css from '../../component/css/materialyou.css';

export default class MaterialYouCSSInjector implements CSSInjector {
    
    async inject(): Promise<void> {
        betterncm.utils.waitForElement('head').then((result) => {
            result?.appendChild(betterncm.utils.dom('style', { innerHTML: css }));
        });
    }
    
}