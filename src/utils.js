export const getChineseName = (names, defaultName='')  => {
    for (let name of names.split(", ")) {
        if (/.*[\u4e00-\u9fa5]+.*$/.test(name)) {
            return name;
        }
    }
    return defaultName;
}