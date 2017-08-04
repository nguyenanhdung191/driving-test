import React from "react";
import Paper from 'material-ui/Paper';
import Button from "material-ui/Button";
import questionList from "../../common/questions.json";
import ruleList from "../../common/rules.json";
import {FormControlLabel} from 'material-ui/Form';
import Checkbox from "material-ui/Checkbox";
import Menu, {MenuItem} from 'material-ui/Menu';


export default class InstructionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            questions: [],
            currentQuestion: 0,
            questionMenuOpen: false,
            questionMenuAnchorElement: undefined,
            showAnswer: false,
            showAnswerLabel: "XEM ĐÁP ÁN"
        };
    };

    questionTypeGenerate = () => {
        let grade = this.props.grade;
        let questionTypeList = Object.keys(ruleList[grade].questionList).map(type => {
            let typeName;
            let typeIconFile;
            let typeText;
            switch (type) {
                case "law":
                    typeName = "KHÁI NIỆM VÀ QUY TẮC";
                    typeIconFile = "law-icon.png";
                    break;
                case "transportation":
                    typeName = "NGHIỆP VỤ VẬN TẢI";
                    typeIconFile = "transportation-icon.png";
                    break;
                case"morality":
                    typeName = "ĐẠO ĐỨC NGHỀ NGHIỆP";
                    typeIconFile = "morality-icon.png";
                    break;
                case "drivingSkill":
                    typeName = "KỸ THUẬT LÁI XE & CẤU TẠO VÀ SỬA CHỮA";
                    typeIconFile = "driving-skill-icon.png";
                    break;
                case "trafficSign":
                    typeName = "HỆ THỐNG BIỂN BÁO";
                    typeIconFile = "traffic-sign-icon.png";
                    break;
                case "driving":
                    typeName = "SA HÌNH";
                    typeIconFile = "driving-icon.png";
                    break;
            }
            typeText = `Bao gồm ${ruleList[grade].questionList[type].questions.length} câu hỏi`;
            return (
                <div className="question-type" key={type}>
                    <Paper className="paper" elevation={3} square={false} style={{overFlow: "hidden"}}>
                        <div className="question-type-icon-text-container" id={type}
                             onClick={this.handleSelectQuestionType}>
                            <div className="question-type-icon-container">
                                <img className="question-type-icon" src={`./common/icon/${typeIconFile}`}></img>
                            </div>
                            <div className="question-type-text">
                                <strong>{typeName}</strong><br/>
                                {typeText}
                            </div>
                        </div>
                    </Paper>
                </div>
            );
        });
        questionTypeList.push(
            <div className="question-type" key="list">
                <Paper className="paper" elevation={3} square={false} style={{overFlow: "hidden"}}>
                    <div className="question-type-icon-text-container" id="all" onClick={this.handleSelectQuestionType}>
                        <div className="question-type-icon-container">
                            <img className="question-type-icon" src="./common/icon/list-icon.png"></img>
                        </div>
                        <div className="question-type-text">
                            <strong>TẤT CẢ CÂU HỎI</strong><br/>
                            Bao gồm {ruleList[grade].totalQuestion} câu hỏi
                        </div>
                    </div>
                </Paper>
            </div>
        );
        return questionTypeList;
    };

    handleSelectQuestionType = (event) => {
        let questions = [];
        let typeLabel = "";
        if (event.currentTarget.id !== "all") {
            ruleList[this.props.grade].questionList[event.currentTarget.id].questions.forEach(no => {
                questions.push(JSON.parse(JSON.stringify(questionList["" + no])));
            });
        } else {
            Object.keys(ruleList[this.props.grade].questionList).forEach(type => {
                ruleList[this.props.grade].questionList[type].questions.forEach(no => {
                    questions.push(JSON.parse(JSON.stringify(questionList["" + no])));
                });
            });
        }
        switch (event.currentTarget.id) {
            case "law":
                typeLabel = "KHÁI NIỆM VÀ QUY TẮC";
                break;
            case "transportation":
                typeLabel = "NGHIỆP VỤ VẬN TẢI";
                break;
            case"morality":
                typeLabel = "ĐẠO ĐỨC NGHỀ NGHIỆP";
                break;
            case "drivingSkill":
                typeLabel = "KỸ THUẬT LÁI XE & CẤU TẠO VÀ SỬA CHỮA";
                break;
            case "trafficSign":
                typeLabel = "HỆ THỐNG BIỂN BÁO";
                break;
            case "driving":
                typeLabel = "SA HÌNH";
                break;
            case "all":
                typeLabel = "TẤT CẢ CÂU HỎI";
                break;
        }
        questions[0].selected = true;
        this.setState({
            questions: questions,
            type: event.currentTarget.id,
            currentQuestion: 0,
            typeLabel: typeLabel
        });
    };

    handleSelectQuestion = (event) => {
        let object = this.state;
        object.questions[this.state.currentQuestion].selected = false;
        object.questions[parseInt(event.target.innerHTML) - 1].selected = true;
        object.currentQuestion = parseInt(event.target.innerHTML - 1);
        this.setState(object);

    };

    handleNextQuestion = () => {
        let object = this.state;
        let currentQuestionNo = this.state.currentQuestion;
        if (this.state.questions[currentQuestionNo + 1] !== undefined) {
            object.questions[currentQuestionNo].selected = false;
            object.questions[currentQuestionNo + 1].selected = true;
            object.currentQuestion += 1;
        }
        this.setState(object);
    };

    handlePreviousQuestion = () => {
        let object = this.state;
        let currentQuestionNo = this.state.currentQuestion;
        if (this.state.questions[currentQuestionNo - 1] !== undefined) {
            object.questions[currentQuestionNo].selected = false;
            object.questions[currentQuestionNo - 1].selected = true;
            object.currentQuestion -= 1;
        }
        this.setState(object);
    };

    handleShowAnswer = () => {
        if (this.state.showAnswer === true) {
            this.setState({
                showAnswer: false,
                showAnswerLabel: "XEM ĐÁP ÁN"
            });
        } else {
            this.setState({
                showAnswer: true,
                showAnswerLabel: "ẨN ĐÁP ÁN"
            });
        }
    };

    handleGoBack = () => {
        this.setState({
            type: "",
            questions: [],
            showAnswer: false,
            showAnswerLabel: "XEM ĐÁP ÁN"
        });
    };

    handleFirstQuestion = () => {
        let object = this.state;
        object.questions[this.state.currentQuestion].selected = false;
        object.questions[0].selected = true;
        object.currentQuestion = 0;
        this.setState(object);
    };

    handleLastQuestion = () => {
        let object = this.state;
        object.questions[this.state.currentQuestion].selected = false;
        object.questions[this.state.questions.length - 1].selected = true;
        object.currentQuestion = this.state.questions.length - 1;
        this.setState(object);
    };

    handleOpenQuestionMenu = (event) => {
        this.setState({
            questionMenuOpen: true,
            questionMenuAnchorElement: event.currentTarget
        });
    };

    handleJumpQuestion = (event) => {
        let questionIndex = parseInt(event.currentTarget.value);
        let object = this.state;
        object.questionMenuOpen = false;
        object.questions[this.state.currentQuestion].selected = false;
        object.questions[questionIndex].selected = true;
        object.currentQuestion = questionIndex;
        this.setState(object);
    };

    handleCloseMenu = () => {
        this.setState({
            questionMenuOpen: false
        });
    };

    showQuestion = () => {
        let questionList = [];
        let factor = 8;
        if (this.state.questions.length < 17) {
            factor = 2;
        }
        let i = this.state.currentQuestion - factor;
        let end = this.state.currentQuestion + factor;
        if (i < 0) {
            end += Math.abs(i);
            i = 0;
        }
        if (end > this.state.questions.length - 1) {
            i -= (end - (this.state.questions.length - 1));
            end = this.state.questions.length - 1;
        }
        for (i; i <= end; i++) {
            let state = "";
            if (this.state.questions[i].selected === true) {
                state = " selected";
            }
            questionList.push(<a key={i + 1}
                                 href="#"
                                 className={`question-button${state}`}
                                 onClick={this.handleSelectQuestion}>{i + 1}</a>);
        }
        return questionList;
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            type: "",
            questions: [],
            currentQuestion: 0,
            questionMenuOpen: false,
            questionMenuAnchorElement: undefined,
            showAnswer: false,
            showAnswerLabel: "XEM ĐÁP ÁN"
        });
    };

    render() {

        return (
            <div className="instruction-container">
                {(this.state.type === "") ?
                    <div id="typeListContainer">
                        <Paper elevation={3} square={false} style={{padding: 10}}>
                            <div className="rule-container">
                                <div><strong>Bạn đã lựa chọn ôn thi bằng lái hạng {this.props.grade}</strong></div>
                                <div>Bộ câu hỏi ôn thi lý thuyết hạng {this.props.grade} bao
                                    gồm {ruleList[this.props.grade].totalQuestion} câu hỏi và được chia
                                    làm {Object.keys(ruleList[this.props.grade].questionList).length} danh mục:
                                </div>
                            </div>
                            <div className="question-type-container">

                                {this.questionTypeGenerate()}
                            </div>
                        </Paper>
                    </div>
                    :
                    <div id="typeQuestionContainer">
                        <Paper elevation={3} square={false} style={{padding: 10}}>
                            <div className="type-label-container">
                                ÔN THI BẰNG LÁI HẠNG {this.props.grade} - DANH MỤC: {this.state.typeLabel} - TỔNG
                                CỘNG {this.state.questions.length} CÂU HỎI
                            </div>
                            <div className="question-selector">
                                {this.showQuestion()}
                            </div>
                            <div className="question-button-container">
                                <Button raised
                                        style={{height: 30, width: 130, margin: 5, fontWeight: "bold"}}
                                        color="primary"
                                        onClick={this.handleFirstQuestion}
                                >CÂU ĐẦU</Button>
                                <Button raised
                                        style={{height: 30, margin: 5, fontWeight: "bold"}}
                                        onClick={this.handlePreviousQuestion}
                                        color="primary"
                                >&lt;&lt;</Button>
                                <span className="question-number">Câu {this.state.currentQuestion + 1}</span>
                                <Button raised
                                        style={{height: 30, margin: 5, fontWeight: "bold"}}
                                        onClick={this.handleNextQuestion}
                                        color="primary"
                                >&gt;&gt;</Button>
                                <Button raised
                                        style={{height: 30, width: 130, margin: 5, fontWeight: "bold"}}
                                        color="primary"
                                        onClick={this.handleLastQuestion}
                                >CÂU CUỐI</Button><br/>
                                <Button raised
                                        style={{
                                            color: "#FFFFFF",
                                            height: 30,
                                            width: 130,
                                            margin: 5,
                                            fontWeight: "bold",
                                            backgroundColor: "#b22525",
                                        }}
                                        onClick={this.handleGoBack}
                                >QUAY LẠI
                                </Button>
                                <Button onClick={this.handleOpenQuestionMenu}><strong>đi đến câu hỏi bất
                                    kì</strong></Button>
                                <Menu
                                    anchorEl={this.state.questionMenuAnchorElement}
                                    open={this.state.questionMenuOpen}
                                    onRequestClose={this.handleCloseMenu}
                                >
                                    {
                                        this.state.questions.map((question, index) =>
                                            <MenuItem
                                                key={index}
                                                value={index}
                                                onClick={this.handleJumpQuestion}
                                            >
                                                {"Câu " + (index + 1)}
                                            </MenuItem>
                                        )
                                    }
                                </Menu>
                                <Button raised
                                        style={{
                                            height: 30,
                                            width: 130,
                                            margin: 5,
                                            fontWeight: "bold",
                                            backgroundColor: "#15910e",
                                            color: "#FFFFFF"
                                        }}
                                        onClick={this.handleShowAnswer}
                                >{this.state.showAnswerLabel}</Button>
                            </div>
                            <div className="question">
                                Câu {this.state.currentQuestion + 1}: {this.state.questions[this.state.currentQuestion].question}</div>
                            <div className="question-picture">
                                {
                                    (this.state.questions[this.state.currentQuestion].picture !== "") ?
                                        (<img
                                            src={`./common/picture/${this.state.questions[this.state.currentQuestion].picture}`}/>) : (
                                        <br/>)
                                }
                            </div>
                            <div className="responses">
                                {
                                    this.state.questions[this.state.currentQuestion].responses.map((response, index) => {
                                        let correctAnswer = false;
                                        if (this.state.showAnswer) {
                                            if (this.state.questions[this.state.currentQuestion].correctAnswer.includes(index)) {
                                                correctAnswer = true;
                                            }
                                        }
                                        return (
                                            <div key={index} className="response-container">
                                                <FormControlLabel
                                                    control={<Checkbox
                                                        checked={correctAnswer}
                                                    />}
                                                    style={{color: (correctAnswer) ? "blue" : "black"}}
                                                    label={(index + 1) + ". " + response.text}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Paper>
                    </div>}
            </div>
        )
    }
}