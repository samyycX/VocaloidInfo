export function addMaterialYouStyle(father, ...elements) {
    elements.forEach(element => {
        if (loadedPlugins['MaterialYouTheme']) {
            //const font = document.getElementsByTagName("body")[0].style.fontFamily;
            if (element.classList != undefined) {
                element.classList.remove("inf", "s-fc1");
            }
            //element.setAttribute("color: var(--md-accent-color-secondary);")
            if (element.hasChildNodes) {
                element.childNodes.forEach(child => {
                    child.style.fontFamily = document.getElementsByTagName("body")[0].style.fontFamily;
                    child.style.fontSize = "15px";
                    child.style.color = "var(--md-accent-color-secondary)";
                });
            }
            
        }
        father.appendChild(element);
    });
    return father;
    
}

export function getChineseNameFromNames(names, defaultName='') {
    for (let name of names.split(", ")) {
        if (/.*[\u4e00-\u9fa5]+.*$/.test(name)) {
            return name;
        }
    }
    return defaultName;
}

export function htmlToNode(html) { 
    return dom('div', {innerHTML:html}).firstElementChild;
}

export function injectCSS() {
    betterncm.utils.waitForElement("head").then((head) => {
        head.appendChild(htmlToNode(`
        <style>
            .vi-achievement {
                display: flex;
                justify-content: center;
                vertical-align: middle;
                align-items: center;
                font-size: 10px;
                border-radius: 20px;
                height: 20px;
                width: 60px;

            }
            .vi-achievement p {
                margin: 0;
                margin-left: 5px;
                color: black;
            }

        `));
    })
}

export function xss(str) {
    const map = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '\"': '&quot;',
        '\'': '&#39;'
    };
    return str.replace(/[<>&"']/g, (m) => map[m]);
}