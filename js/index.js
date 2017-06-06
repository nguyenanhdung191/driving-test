import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


import QuestionContainer from "./component/QuestionContainer";

ReactDOM.render(
    <MuiThemeProvider>
        <QuestionContainer/>
    </MuiThemeProvider>,
    document.getElementById("app")
);