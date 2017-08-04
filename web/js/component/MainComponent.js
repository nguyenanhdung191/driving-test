import React from "react";
import AboutComponent from "./AboutComponent";
import ExamComponent from "./ExamComponent";
import InstructionComponent from "./InstructionComponent";

export default class MainComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            inputMode: "",
            inputGrade: "",
            ads: [],
            randomAd1: 0,
            randomAd2: 0,
            randomAd3: 0,
            randomAd4: 0
        };
        //this.getOffer();
    };

    showContent = () => {
        switch (this.state.inputMode) {
            case "":
                return <AboutComponent/>;
                break;
            case "practice":
                return <InstructionComponent grade={this.state.inputGrade}/>;
                break;
            case "exam":
                return <ExamComponent grade={this.state.inputGrade}/>;
                break;
            case "about":
                return <AboutComponent/>;
                break;
            default:
                return <div>ERROR</div>;
        }
    };

    handleChangeMode = (event) => {
        window.clearInterval(window.intervalId);
        let inputMode = event.currentTarget.id.split(";")[0];
        let inputGrade = event.currentTarget.id.split(";")[1];
        if (inputMode === "about") {
            window.location = "index.html";
            return;
        }
        this.setState({
            inputMode: inputMode,
            inputGrade: inputGrade
        });
    };

    getOffer = () => {
        let ads = [];
        $.get("/api/offer", json => {
            Object.keys(json).forEach(ad => {
                ads.push(json[ad]);
            });
            this.setState({
                ads: ads,
                randomAd1: Math.floor(Math.random() * ads.length - 1),
                randomAd2: Math.floor(Math.random() * ads.length - 1),
                randomAd3: Math.floor(Math.random() * ads.length - 1),
                randomAd4: Math.floor(Math.random() * ads.length - 1)
            });
            this.showAd();
        });
    };

    showAd = () => {
        setInterval(() => {
            this.setState({
                randomAd1: Math.floor(Math.random() * this.state.ads.length - 1),
                randomAd2: Math.floor(Math.random() * this.state.ads.length - 1),
                randomAd3: Math.floor(Math.random() * this.state.ads.length - 1),
                randomAd4: Math.floor(Math.random() * this.state.ads.length - 1)
            });
        }, 20000);
    };

    render() {
        return (
            <div>
                <nav id='cssmenu'>
                    <div id="head-mobile">MENU</div>
                    <div className="button"></div>
                    <ul>
                        <li><a href='#'>ÔN THI BẰNG LÁI</a>
                            <ul>
                                <li><a id="practice;A1" onClick={this.handleChangeMode}>Hạng A1</a></li>
                                <li><a id="practice;A2" onClick={this.handleChangeMode}>Hạng A2</a></li>
                                <li><a id="practice;B1" onClick={this.handleChangeMode}>Hạng B1</a></li>
                                <li><a id="practice;B2" onClick={this.handleChangeMode}>Hạng B2</a></li>
                                <li><a id="practice;C" onClick={this.handleChangeMode}>Hạng C</a></li>
                                <li><a id="practice;D" onClick={this.handleChangeMode}>Hạng D</a></li>
                                <li><a id="practice;E" onClick={this.handleChangeMode}>Hạng E</a></li>
                                <li><a id="practice;F" onClick={this.handleChangeMode}>Hạng F</a></li>
                            </ul>
                        </li>
                        <li><a>THI THỬ BẰNG LÁI</a>
                            <ul>
                                <li><a id="exam;A1" onClick={this.handleChangeMode}>Hạng A1</a></li>
                                <li><a id="exam;A2" onClick={this.handleChangeMode}>Hạng A2</a></li>
                                <li><a id="exam;B1" onClick={this.handleChangeMode}>Hạng B1</a></li>
                                <li><a id="exam;B2" onClick={this.handleChangeMode}>Hạng B2</a></li>
                                <li><a id="exam;C" onClick={this.handleChangeMode}>Hạng C</a></li>
                                <li><a id="exam;D" onClick={this.handleChangeMode}>Hạng D</a></li>
                                <li><a id="exam;E" onClick={this.handleChangeMode}>Hạng E</a></li>
                                <li><a id="exam;F" onClick={this.handleChangeMode}>Hạng F</a></li>
                            </ul>
                        </li>
                        <li><a id="about;jasgdjsad" onClick={this.handleChangeMode}>GIỚI THIỆU</a></li>
                    </ul>
                </nav>
                <div className="content-container">
                    <div className="ad-left">
                        {
                            (this.state.ads.length !== 0) ?
                                <div>
                                    <a target="_blank" href={this.state.ads[this.state.randomAd1].trackingLink}>
                                        <img src={this.state.ads[this.state.randomAd1].image}/>
                                    </a>
                                    <a target="_blank" href={this.state.ads[this.state.randomAd2].trackingLink}>
                                        <img src={this.state.ads[this.state.randomAd2].image}/>
                                    </a>
                                </div>
                                : ""
                        }
                    </div>
                    <div className="ad-top">
                    </div>
                    <div className="content">
                        {this.showContent()}
                    </div>
                    <div className="ad-bottom">
                    </div>
                    <div className="ad-right">
                        {
                            (this.state.ads.length !== 0) ?
                                <div>
                                    <a target="_blank" href={this.state.ads[this.state.randomAd3].trackingLink}>
                                        <img src={this.state.ads[this.state.randomAd3].image}/>
                                    </a>
                                    <a target="_blank" href={this.state.ads[this.state.randomAd4].trackingLink}>
                                        <img src={this.state.ads[this.state.randomAd4].image}/>
                                    </a>
                                </div>
                                : ""
                        }
                    </div>
                </div>
            </div>
        )
    }
}