import React from "react";
import QuestionContainer from "./QuestionContainer";



export default class MainComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <QuestionContainer/>
            </div>
        )
    }
}