import React from "react";
import A1 from "../../common/A1/A1.json";
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Next from 'material-ui/svg-icons/av/fast-forward';
import Previous from 'material-ui/svg-icons/av/fast-rewind';


export default class QuestionContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            currentQuestion: 0,
            questions: A1.questions,
        };
        this.countDown(new Date().getTime() + A1.maxTime);
    };

    handleNextQuestion = () => {
        let currentQuestionNo = this.state.currentQuestion;
        if (this.state.questions[currentQuestionNo + 1] !== undefined) {
            this.setState({
                currentQuestion: currentQuestionNo + 1
            });
        }
    };

    handlePreviousQuestion = () => {
        let currentQuestionNo = this.state.currentQuestion;
        if (this.state.questions[currentQuestionNo - 1] !== undefined) {
            this.setState({
                currentQuestion: currentQuestionNo - 1
            });
        }
    };

    handleCheckResponse = (event, isInputChecked) => {
        let object = this.state;
        object.questions[this.state.currentQuestion].responses[parseInt(event.target.id.split("-")[1])].checked = isInputChecked;
        this.setState(object);
    };

    handleSelectQuestion = (event) => {
        this.setState({
            currentQuestion: parseInt(event.currentTarget.value)
        })
    };

    handleComplete = () => {
        let correct = 0;
        this.state.questions.forEach((question, questionIndex) => {
            let correctAnswer = question.answer.sort((a, b) => a - b);
            let answer = [];
            question.responses.forEach((response, responseIndex) => {
                if (response.checked === true) {
                    answer.push(responseIndex);
                }
            });
            answer = answer.sort((a, b) => a - b);
            if (correctAnswer.toString() === answer.toString()) {
                correct += 1;
            }
        });
    };

    countDown = (endTime) => {
        let intervalId = setInterval(() => {
            let now = new Date().getTime();
            let minute = Math.floor((endTime - now) / 60000);
            let second = parseInt((((endTime - now) % 60000) / 1000).toFixed(0));
            $("#timer").html(`Thời gian còn lại: <strong>${(minute < 10) ? "0" + minute : minute} : ${(second < 10) ? "0" + second : second}</strong>`);
            if (minute <= 0 && second <= 0) {
                alert("asdasdasdasdasdsad");
                clearInterval(intervalId);
            }
        }, 1000);
    };

    render() {
        return (
            <div className="main-container">
                <div className="question-selector">
                    {
                        this.state.questions.map((question, index) => {
                            return (<RaisedButton
                                    key={index}
                                    backgroundColor="#00d80e"
                                    label={index + 1}
                                    labelColor="#ffffff"
                                    labelStyle={{fontWeight: "bold", fontSize: 20}}
                                    style={{margin: 5}}
                                    value={index}
                                    onClick={this.handleSelectQuestion}/>
                            )
                        })
                    }
                </div>
                <div className="question-button-container">
                    <RaisedButton
                        backgroundColor="#b20000"
                        label="Thoát"
                        style={{marginRight: 20}}
                        labelStyle={{color: "#FFFFFF"}}
                    />
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
                    />
                    <RaisedButton
                        label="Nộp bài"
                        style={{marginLeft: 20}}
                        backgroundColor="#fffb2d"
                        onClick={this.handleComplete}
                    />
                </div>
                <div id="timer">Thời gian còn lại</div>
                <div className="question">
                    Câu {this.state.currentQuestion + 1}: {this.state.questions[this.state.currentQuestion].question}</div>
                <div className="question-picture">
                    {
                        this.state.questions[this.state.currentQuestion].hasOwnProperty("picture") ?
                            (<img src={`./common/${this.state.questions[this.state.currentQuestion].picture}`}/>) : (
                            <br/>)
                    }
                </div>
                <div className="title">{this.state.questions[this.state.currentQuestion].title}</div>
                <div className="responses">
                    {
                        this.state.questions[this.state.currentQuestion].responses.map((response, index) => {
                            return (
                                <div key={index}>
                                    <Checkbox
                                        label={`${index + 1}. ${response.text}`}
                                        checked={this.state.questions[this.state.currentQuestion].responses[index].checked}
                                        onCheck={this.handleCheckResponse}
                                        id={`${this.state.currentQuestion}-${index}`}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}