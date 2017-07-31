import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


import MainComponent from "./component/MainComponent";
ReactDOM.render(
    <MuiThemeProvider>
        <MainComponent/>
    </MuiThemeProvider>,
    document.getElementById("app")
);