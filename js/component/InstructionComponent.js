import React from "react";
import Paper from 'material-ui/Paper';
import questionList from "../../common/questions.json";
import ruleList from "../../common/rules.json";

export default class InstructionComponent extends React.Component {
    constructor(props) {
        super(props);
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
            return(
                <div className="question-type" key={type}>
                    <Paper className="paper" zDepth={1} rounded={true} style={{overFlow: "hidden"}}>
                        <div className="question-type-icon-text-container">
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
                    <div className="question-type-icon-text-container">
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

    render() {
        return (
            <div className="instruction-container">
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
        )
    }
}