import css from '../../component/css/default.css';

export default class DefaultCSSInjector implements CSSInjector {
    
    async inject(): Promise<void> {
        //const css = await betterncm.fs.readFileText('../../component/css/default.css');
        console.log("inject");
        console.log(css);
        betterncm.utils.waitForElement('head').then((result) => {
            result?.appendChild(betterncm.utils.dom('style', { innerHTML: css }));
        });
    }
    
}