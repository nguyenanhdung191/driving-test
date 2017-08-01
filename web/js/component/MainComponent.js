import React from "react";
import HomePageComponent from "./HomePageComponent";
import AboutComponent from "./AboutComponent";
import ExamComponent from "./ExamComponent";
import InstructionComponent from "./InstructionComponent";

export default class MainComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            mode: this.getParameterByName("mode"),
            grade: this.getParameterByName("grade")
        };
    };

    getParameterByName(name) {
        let url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    showContent = () => {
        switch(this.state.mode){
            case null: return <HomePageComponent/>;
            case "practice": return <InstructionComponent grade={this.state.grade}/>;
            case "exam": return <ExamComponent grade={this.state.grade}/>;
            case "about": return <AboutComponent/>;
            default: return <div>ERROR</div>;
        }
    };

    render() {
        return (
            <div>
                <nav id='cssmenu'>
                    <div id="head-mobile">MENU</div>
                    <div className="button"></div>
                    <ul>
                        <li><a href="index.html">TRANG CHỦ</a></li>
                        <li><a href='#'>ÔN THI BẰNG LÁI</a>
                            <ul>
                                <li><a href='?mode=practice&grade=A1'>Hạng A1</a></li>
                                <li><a href='?mode=practice&grade=A2'>Hạng A2</a></li>
                                <li><a href='?mode=practice&grade=B1'>Hạng B1</a></li>
                                <li><a href='?mode=practice&grade=B2'>Hạng B2</a></li>
                                <li><a href='?mode=practice&grade=C'>Hạng C</a></li>
                                <li><a href='?mode=practice&grade=D'>Hạng D</a></li>
                                <li><a href='?mode=practice&grade=E'>Hạng E</a></li>
                                <li><a href='?mode=practice&grade=F'>Hạng F</a></li>
                            </ul>
                        </li>
                        <li><a href='#'>THI THỬ BẰNG LÁI</a>
                            <ul>
                                <li><a href='?mode=exam&grade=A1'>Hạng A1</a></li>
                                <li><a href='?mode=exam&grade=A2'>Hạng A2</a></li>
                                <li><a href='?mode=exam&grade=B1'>Hạng B1</a></li>
                                <li><a href='?mode=exam&grade=B2'>Hạng B2</a></li>
                                <li><a href='?mode=exam&grade=C'>Hạng C</a></li>
                                <li><a href='?mode=exam&grade=D'>Hạng D</a></li>
                                <li><a href='?mode=exam&grade=E'>Hạng E</a></li>
                                <li><a href='?mode=exam&grade=F'>Hạng F</a></li>
                            </ul>
                        </li>
                        <li><a href='?mode=about'>GIỚI THIỆU</a></li>
                    </ul>
                </nav>
                <div className="content-container">
                    <div className="ad-left">
                    </div>
                    <div className="ad-top">
                    </div>
                    <div className="content">
                        {this.showContent()}
                    </div>
                    <div className="ad-bottom">
                    </div>
                    <div className="ad-right">
                    </div>
                </div>
            </div>
        )
    }
}