import css from '../../component/css/default.css';

export default class DefaultCSSInjector implements CSSInjector {
    
    async inject(): Promise<void> {
        betterncm.utils.waitForElement('head').then((result) => {
            result?.appendChild(betterncm.utils.dom('style', { innerHTML: css }));
        });
    }
    
}