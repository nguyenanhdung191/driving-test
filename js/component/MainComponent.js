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
                <nav className="cbp-hsmenu-wrapper" id="cbp-hsmenu-wrapper">
                    <div className="cbp-hsinner">
                        <ul className="cbp-hsmenu">
                            <li>
                                <a href="#"><strong>TRANG CHỦ</strong></a>
                            </li>
                            <li>
                                <a href="#"><strong>ÔN THI BẰNG LÁI</strong></a>
                                <ul className="cbp-hssubmenu">
                                    <li>
                                        <a href="?mode=practice&grade=A1"><span>Hạng A1</span></a>
                                    </li>
                                    <li>
                                        <a href="?mode=practice&grade=A2"><span>Hạng A2</span></a>
                                    </li>
                                    <li>
                                        <a href="?mode=practice&grade=B1"><span>Hạng B1</span></a>
                                    </li>
                                    <li>
                                        <a href="?mode=practice&grade=B2"><span>Hạng B2</span></a>
                                    </li>
                                    <li>
                                        <a href="?mode=practice&grade=C"><span>Hạng C</span></a>
                                    </li>
                                    <li>
                                        <a href="?mode=practice&grade=D"><span>Hạng D</span></a>
                                    </li>
                                    <li>
                                        <a href="?mode=practice&grade=E"><span>Hạng E</span></a>
                                    </li>
                                    <li>
                                        <a href="?mode=practice&grade=F"><span>Hạng F</span></a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><strong>THI THỬ SÁT HẠCH</strong></a>
                                <ul className="cbp-hssubmenu cbp-hssub-rows">
                                    <li>
                                        <a href="?mode=exam&grade=A1"><span>Hạng A1</span></a>
                                    </li>
                                    <li>
                                        <a href="?mode=exam&grade=A2"><span>Hạng A2</span></a>
                                    </li>
                                    <li>
                                        <a href="?mode=exam&grade=B1"><span>Hạng B1</span></a>
                                    </li>
                                    <li>
                                        <a href="?mode=exam&grade=B2"><span>Hạng B2</span></a>
                                    </li>
                                    <li>
                                        <a href="?mode=exam&grade=C"><span>Hạng C</span></a>
                                    </li>
                                    <li>
                                        <a href="?mode=exam&grade=D"><span>Hạng D</span></a>
                                    </li>
                                    <li>
                                        <a href="?mode=exam&grade=E"><span>Hạng E</span></a>
                                    </li>
                                    <li>
                                        <a href="?mode=exam&grade=F"><span>Hạng F</span></a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">About</a>
                            </li>
                        </ul>
                    </div>
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