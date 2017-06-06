import React from "react";


export default class ResponseContainer extends React.Component {
    constructor() {
        super();
    }

    render() {

        return (
            <div className="responses">
                {
                    this.props.responses.map((response, index) => {
                        return (
                            <div key={index}>
                                <input type="checkbox" />
                                <span >{`${index + 1}. ${response}`}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}