import React from "react";
import A1 from "../../common/A1/A1.json";
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Next from 'material-ui/svg-icons/av/fast-forward';
import Previous from 'material-ui/svg-icons/av/fast-rewind';
import Correct from 'material-ui/svg-icons/navigation/check';
import Incorrect from 'material-ui/svg-icons/navigation/close';


export default class QuestionContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            currentQuestion: 0,
            questions: A1.questions,
            complete: false
        };
        this.state.questions[0].selected = true;
        this.countDown(new Date().getTime() + A1.maxTime);
    };

    handleNextQuestion = () => {
        let object = this.state;
        let finish = false;
        object.questions[this.state.currentQuestion].responses.forEach(response => {
            if (response.checked === true) {
                finish = true;
            }
        });
        object.questions[this.state.currentQuestion].finish = finish;
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
        let finish = false;
        object.questions[this.state.currentQuestion].responses.forEach(response => {
            if (response.checked === true) {
                finish = true;
            }
        });
        object.questions[this.state.currentQuestion].finish = finish;
        let currentQuestionNo = this.state.currentQuestion;
        if (this.state.questions[currentQuestionNo - 1] !== undefined) {
            object.questions[currentQuestionNo].selected = false;
            object.questions[currentQuestionNo - 1].selected = true;
            object.currentQuestion -= 1;
        }
        this.setState(object);
    };

    handleCheckResponse = (event, isInputChecked) => {
        let object = this.state;
        object.questions[this.state.currentQuestion].responses[parseInt(event.target.id.split("-")[1])].checked = isInputChecked;
        this.setState(object);
    };

    handleSelectQuestion = (event) => {
        let object = this.state;
        let finish = false;
        object.questions[this.state.currentQuestion].responses.forEach(response => {
            if (response.checked === true) {
                finish = true;
            }
        });
        object.questions[this.state.currentQuestion].finish = finish;
        object.questions[this.state.currentQuestion].selected = false;
        object.questions[parseInt(event.currentTarget.value)].selected = true;
        object.currentQuestion = parseInt(event.currentTarget.value);
        this.setState(object);
    };

    handleComplete = () => {
        let correct = 0;
        let object = this.state;
        object.questions.forEach((question, questionIndex) => {
            let correctAnswer = question.correctAnswer.sort((a, b) => a - b);
            let answer = [];
            question.responses.forEach((response, responseIndex) => {
                if (response.checked === true) {
                    answer.push(responseIndex);
                }
            });
            answer = answer.sort((a, b) => a - b);
            object.questions[questionIndex].answer = answer;
            if (correctAnswer.toString() === answer.toString()) {
                correct += 1;
                object.questions[questionIndex].correct = true;
            }
        });
        object.complete = true;
        window.clearInterval(window.intervalId);
        if (correct >= A1.minScore) {
            $("#timer").html(`Chúc mừng, bạn đã thi đậu!!<br/>Số câu đúng: <strong>${correct} / ${A1.noOfQuestion}</strong>`);
        } else {
            $("#timer").html(`Rất tiếc, bạn đã thi rớt!!<br/>Số câu đúng: <strong>${correct} / ${A1.noOfQuestion}</strong>`);
        }
        this.setState(object);
    };

    countDown = (endTime) => {
        window.intervalId = setInterval(() => {
            let now = new Date().getTime();
            let minute = Math.floor((endTime - now) / 60000);
            let second = parseInt((((endTime - now) % 60000) / 1000).toFixed(0));
            $("#timer").html(`Thời gian còn lại: <strong>${(minute < 10) ? "0" + minute : minute} : ${(second < 10) ? "0" + second : second}</strong>`);
            if (minute <= 0 && second <= 0) {
                alert("Hết thời gian");
                this.handleComplete();
            }
        }, 1000);
    };

    render() {
        return (
            <div className="main-container">
                <div className="question-selector">
                    {
                        this.state.questions.map((question, index) => {
                            let backgroundColor = "";
                            if (this.state.complete !== true) {
                                if (question.finish === true) {
                                    backgroundColor = "#00d80e";
                                }
                                else {
                                    backgroundColor = "#e5e5e5";
                                }
                            } else {
                                if (question.correct === true) {
                                    backgroundColor = "#00d80e";
                                } else {
                                    backgroundColor = "#ff9696";
                                }
                            }
                            return (<RaisedButton
                                    key={index}
                                    backgroundColor={backgroundColor}
                                    label={index + 1}
                                    labelStyle={{
                                        fontWeight: "bold",
                                        fontSize: 20,
                                        textDecoration: (question.selected === true) ? "underline" : null
                                    }}
                                    style={{margin: 5, borderWidth: 20}}
                                    value={index}
                                    onClick={this.handleSelectQuestion}
                                    labelPosition="before"
                                    icon={(this.state.complete === true) ? ((question.correct === true) ? <Correct/> :
                                        <Incorrect/>) : null}/>


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
                <div className="question-answer">
                    {
                        (this.state.complete === true) ?
                            <div>
                                <div className="answer-status">
                                    {
                                        (this.state.questions[this.state.currentQuestion].correct) ?
                                            <span style={{color: "#00ad22"}}>ĐÚNG!</span> :
                                            <span style={{color: "#d10000"}}>SAI!</span>
                                    }
                                </div>
                                <div>
                                    {
                                        <span>Đáp án:&nbsp;
                                            {
                                                this.state.questions[this.state.currentQuestion].correctAnswer.map(answer => {
                                                    return answer + 1
                                                }).toString()
                                            }
                                        </span>
                                    }
                                </div>
                                <div>
                                    {
                                        <span>Câu trả lời của bạn:&nbsp;
                                            {
                                                this.state.questions[this.state.currentQuestion].answer.map(answer => {
                                                    return answer + 1
                                                }).toString()
                                            }
                                        </span>
                                    }
                                </div>
                            </div>
                            : ""
                    }
                </div>
                <div className="question-picture">
                    {
                        this.state.questions[this.state.currentQuestion].hasOwnProperty("picture") ?
                            (<img src={`./common/${this.state.questions[this.state.currentQuestion].picture}`}/>) : (
                            <br/>)
                    }
                </div>
                <div className="title">{this.state.questions[this.state.currentQuestion].title}</div>
                < div className="responses">
                    {
                        this.state.questions[this.state.currentQuestion].responses.map((response, index) => {
                            return (
                                <div key={index} className="response-container">
                                    <Checkbox
                                        label={`${index + 1} - ${response.text}`}
                                        checked={this.state.questions[this.state.currentQuestion].responses[index].checked}
                                        onCheck={this.handleCheckResponse}
                                        id={`${this.state.currentQuestion}-${index}`}
                                        disabled={this.state.complete}
                                        labelStyle={{color: "#000000"}}
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