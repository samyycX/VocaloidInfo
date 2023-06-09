import { xss } from "../utils";

interface Attr {
    color: string,
    icon_url: string,
    text: string
}

export const DefaultSongAchievement: React.FC<Attr> = ({color, icon_url, text}) => {
    return (
    <b className="vi-achievement f-ust f-ust-1" style={{
        border: `1px solid ${xss(color)}`,
        backgroundColor: `${xss(color)}30`,
        marginRight: '5px'
    }}>
        <img src={ `${xss(icon_url)}` } width="16px" height="16px"/>
        <p style={{ color: `${xss(color)}` }}>{xss(text)}</p>    
    </b>
    )
}