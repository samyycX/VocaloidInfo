function HTML2dom(html) {
    var temp = document.createElement("div")
    emp.innerText = html
    var output = temp.innerHTML
    temp = null
    return output
}

function createNode(html) { 
    //const template = `<b>${html}</b>`;
    let tempNode = document.createElement('div');
    tempNode.innerHTML = html;
    return tempNode.firstElementChild;
}

const parser = new DOMParser();

export const Youtube1 = createNode(`
    <b class="vi-achievement-yt1 f-ust f-ust-1">
        <style>
            .vi-achievement-yt1 {
                display: flex;
                justify-content: center;
                vertical-align: middle;
                align-items: center;
                border: 1px solid #FFD700;
                font-size: 10px;
                background-color: #FFD70030;
                border-radius: 20px;
                height: 20px;
                width: 60px;

            }
            .vi-achievement-yt1 p {
                margin: 0;
                margin-left: 5px;
            }
        </style>
        <img src="https://vocadb.net/Content/youtube.png" width="16px" height="16px"/>
        <p>传说</p>
    </b>
`);

export const Youtube2 = createNode(`
    <b class="vi-achievement-yt2 f-ust f-ust-1">
        <style>
            .vi-achievement-yt2 {
                display: flex;
                justify-content: center;
                vertical-align: middle;
                align-items: center;
                border: 1px solid #FF4D4D;
                font-size: 10px;
                background-color: #FF4D4D30;
                border-radius: 20px;
                height: 20px;
                width: 60px;

            }
            .vi-achievement-yt2 p {
                margin: 0;
                margin-left: 5px;
            }
        </style>
        <img src="https://vocadb.net/Content/youtube.png" width="16px" height="16px"/>
        <p>神话</p>
    </b>
`);

export const Niconico1 = createNode(`
    <b class="vi-achievement-nico1 f-ust f-ust-1">
        <style>
            .vi-achievement-nico1 {
                display: flex;
                justify-content: center;
                vertical-align: middle;
                align-items: center;
                border: 1px solid #FFD700;
                font-size: 10px;
                background-color: #FFD70030;
                border-radius: 20px;
                height: 20px;
                width: 60px;

            }
            .vi-achievement-nico1 p {
                margin: 0;
                margin-left: 5px;
            }
        </style>
        <img src="https://vocadb.net/Content/nico.png" width="16px" height="16px"/>
        <p>传说</p>
    </b>
`);

export const Niconico2 = createNode(`
    <b class="vi-achievement-nico2 f-ust f-ust-1">
        <style>
            .vi-achievement-nico2 {
                display: flex;
                justify-content: center;
                vertical-align: middle;
                align-items: center;
                border: 1px solid #FF4D4D;
                font-size: 10px;
                background-color: #FF4D4D30;
                border-radius: 20px;
                height: 20px;
                width: 60px;

            }
            .vi-achievement-nico2 p {
                margin: 0;
                margin-left: 5px;
            }
        </style>
        <img src="https://vocadb.net/Content/nico.png" width="16px" height="16px"/>
        <p>神话</p>
    </b>
`);

export const Bilibili1 = createNode(`
<b class="vi-achievement-bili1 f-ust f-ust-1">
    <style>
        .vi-achievement-bili1 {
            display: flex;
            justify-content: center;
            vertical-align: middle;
            align-items: center;
            border: 1px solid #66CCFF;
            font-size: 10px;
            background-color: #66CCFF30;
            border-radius: 20px;
            height: 20px;
            width: 60px;

        }
        .vi-achievement-bili1 p {
            margin: 0;
            margin-left: 5px;
        }
    </style>
    <img src="https://www.bilibili.com/favicon.ico" width="16px" height="16px"/>
    <p>殿堂</p>
</b>
`);

export const Bilibili2 = createNode(`
<b class="vi-achievement-bili2 f-ust f-ust-1">
    <style>
        .vi-achievement-bili2 {
            display: flex;
            justify-content: center;
            vertical-align: middle;
            align-items: center;
            border: 1px solid #FFD700;
            font-size: 10px;
            background-color: #FFD70030;
            border-radius: 20px;
            height: 20px;
            width: 60px;

        }
        .vi-achievement-bili2 p {
            margin: 0;
            margin-left: 5px;
        }
    </style>
    <img src="https://www.bilibili.com/favicon.ico" width="16px" height="16px"/>
    <p>传说</p>
</b>
`);

export const Bilibili3 = createNode(`
<b class="vi-achievement-bili3 f-ust f-ust-1">
    <style>
        .vi-achievement-bili3 {
            display: flex;
            justify-content: center;
            vertical-align: middle;
            align-items: center;
            border: 1px solid #FF4D4D;
            font-size: 10px;
            background-color: #FF4D4D30;
            border-radius: 20px;
            height: 20px;
            width: 60px;

        }
        .vi-achievement-bili3 p {
            margin: 0;
            margin-left: 5px;
        }
    </style>
    <img src="https://www.bilibili.com/favicon.ico" width="16px" height="16px"/>
    <p>神话</p>
</b>
`);

export const Bilibili4 = (view) => createNode(`
<b class="vi-achievement-bili3 f-ust f-ust-1">
    <style>
        .vi-achievement-bili3 {
            display: flex;
            justify-content: center;
            vertical-align: middle;
            align-items: center;
            border: 1px solid #66CCFF;
            font-size: 10px;
            background-color: #66CCFF30;
            border-radius: 20px;
            height: 20px;
            width: 60px;

        }
        .vi-achievement-bili3 p {
            margin: 0;
            margin-left: 5px;
        }
    </style>
    <img src="https://www.bilibili.com/favicon.ico" width="16px" height="16px"/>
    <p>${view}</p>
</b>
`);