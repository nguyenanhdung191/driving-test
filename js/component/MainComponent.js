import React from "react";
import QuestionContainer from "./QuestionContainer";
import ResponseContainer from "./ResponseContainer";
import A1 from "../../common/A1.json";


export default class MainComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="main-container">
                <QuestionContainer question={A1.questions[0].question} questionTitle={A1.questions[0].title}/>
                <ResponseContainer responses={A1.questions[0].responses}/>
            </div>
        )
    }
}