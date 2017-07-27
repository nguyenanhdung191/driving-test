import React from "react";
import ExamContainer from "./ExamContainer";
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

    render() {
        return (
            <div>
                <nav id='cssmenu'>
                    <div id="head-mobile">MENU</div>
                    <div className="button"></div>
                    <ul>
                        <li><a href='#'>TRANG CHỦ</a></li>
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
                        <li><a href='#'>ABOUT</a></li>
                    </ul>
                </nav>
                {
                    (this.state.mode !== null) ?
                        (this.state.mode === "practice") ?
                            <InstructionComponent grade={this.state.grade}/> :
                            <ExamContainer grade={this.state.grade}/>
                        : ""
                }
            </div>
        )
    }
}