import React from "react";
import Paper from 'material-ui/Paper';
import questionList from "../../common/questions.json";
import ruleList from "../../common/rules.json";
import RaisedButton from "material-ui/RaisedButton";
import Next from 'material-ui/svg-icons/av/fast-forward';
import Previous from 'material-ui/svg-icons/av/fast-rewind';

export default class InstructionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            questions: [],
            currentQuestion: 0
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
                    <Paper className="paper" zDepth={1} rounded={true} style={{overFlow: "hidden"}}>
                        <div className="question-type-icon-text-container" id={type}
                             onClick={this.handleSelecQuestionType}>
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
                <Paper className="paper" zDepth={1} rounded={true} style={{overFlow: "hidden"}}>
                    <div className="question-type-icon-text-container" id="all" onClick={this.handleSelecQuestionType}>
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

    handleSelecQuestionType = (event) => {
        let questions = [];
        ruleList[this.props.grade].questionList[event.currentTarget.id].questions.forEach(no => {
            questions.push(questionList["" + no]);
        });
        questions[0].selected = true;
        this.setState({
            questions: questions,
            type: event.currentTarget.id,
            currentQuestion: 0
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


    render() {
        return (
            <div className="instruction-container">
                {(this.state.type === "") ?
                    <div id="typeListContainer">
                        <Paper zDepth={1} style={{padding: 10}}>
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
                        <Paper zDepth={1} style={{padding: 10}}>
                            <div className="question-selector">
                                {this.showQuestion()}
                            </div>
                            <div className="question-button-container">
                                <RaisedButton
                                    icon={<Previous/>}
                                    primary={true}
                                    onClick={this.handlePreviousQuestion}
                                />
                                <span className="question-number">Câu {this.state.currentQuestion + 1}</span>
                                <RaisedButton
                                    labelPosition="before"
                                    icon={<Next/>}
                                    primary={true}
                                    onClick={this.handleNextQuestion}
                                /><br/>
                                <RaisedButton
                                    backgroundColor="#b20000"
                                    label="Thoát"
                                    labelStyle={{color: "#FFFFFF"}}
                                    style={{marginTop: 10}}
                                />
                            </div>
                        </Paper>
                    </div>}
            </div>
        )
    }
}