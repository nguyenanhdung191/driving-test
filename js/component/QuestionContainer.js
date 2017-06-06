import React from "react";


export default class QuestionContainer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <span className="question">{this.props.question}</span><br/><br/>
                <span className="title">{this.props.questionTitle}</span>
            </div>
        )
    }
}