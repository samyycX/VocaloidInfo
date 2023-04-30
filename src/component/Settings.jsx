import React from "react";

export default class Settings extends React.Component {
    
    toGithubPage() {
        betterncm.ncm.openUrl("https://github.com/samyycX/VocaloidInfo");
    }

    toGithubIssuePage() {
        betterncm.ncm.openUrl("https://github.com/samyycX/VocaloidInfo/issues");
    }

    render() {
        return (
        <div>
            <a onClick={this.toGithubPage}>点我前往 Github 项目主页</a>
            <br />
            <a onClick={this.toGithubIssuePage}>点我反馈本插件的问题</a>
        </div>
        );
    }
    


    
}