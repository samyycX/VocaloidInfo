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