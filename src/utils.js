export const getChineseName = (names, defaultName='')  => {
    for (let name of names.split(", ")) {
        if (/.*[\u4e00-\u9fa5]+.*$/.test(name)) {
            return name;
        }
    }
    return defaultName;
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