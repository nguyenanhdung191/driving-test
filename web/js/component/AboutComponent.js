import React from "react";
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import moment from "moment";

export default class AboutComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            comment: ""
        }
    };

    handleNameChange = (event) => {
        if (event.target.value.length > 35) {
            return;
        }
        this.setState({
            name: event.target.value
        });
    };

    handleCommentChange = (event) => {
        if (event.target.value.length > 350) {
            return;
        }
        this.setState({
            comment: event.target.value
        });
    };

    handlePostComment = () => {
        let comment = {};
        comment.date = moment().format("YYYY-MM-DD HH:mm:ss");
        comment.name = this.state.name;
        comment.comment = this.state.comment;
        if (comment.length >= 20) {
            $.ajax({
                type: 'POST',
                url: '../api/comment',
                data: JSON.stringify(comment),
                contentType: "application/json",
                dataType: 'json'
            });
            alert("Cám ơn bạn đã đóng góp ý kiến");
            this.setState({
                name: "",
                comment: ""
            });
        } else {
            alert("Ý kiến phải có ít nhất 20 ký tự");
        }
    };

    render() {
        return (
            <div className="about-page-container">
                <Paper elevation={3} square={false} style={{padding: 10}}>
                    <div>- Thithubanglai.com đóng vai trò là một công cụ hỗ trợ giúp các bạn vượt qua được kì thi sát
                        hạch
                        lý thuyết lái xe tất cả các hạng.
                    </div>
                    <div>- Bạn có thể lựa chọn ôn thi trước khi bước vào kì thi thử để xem xét khả năng, từ đó rút kinh
                        nghiệm cho bãn thân, giúp bạn lấy được tự tin
                        và chuẩn bị đầy đủ hành trang để chuẩn bị cho kì thi sát hạch thật sự.
                    </div>
                    <div>
                        - Chức năng thi thử được thiết kế theo hình thức trắc nghiệm, giống 100% như khi đi thật ở các
                        cơ sở
                        sát hạch bằng lái xe. Ngoài ra chúng tôi cũng có hệ thống chấm điểm sau khi bạn kết thúc bài
                        thi,
                        thông qa đó bạn có thể biết được mình đậu hay rớt, từ đó bạn rút được kinh nghiệm cho chính
                        mình.
                    </div>
                    <div>
                        - Hệ thống câu hỏi và đáp án hoàn toàn dựa trên tài liệu luyện thi lý thuyết lái xe của Nhà xuất
                        bản Giao thông Vận tải.
                        Do đó bạn có thể yên tâm về bộ câu hỏi và đáp án của chúng tôi hoàn toàn giống như khi đi thi
                        thật.
                    </div>
                    <div>
                        - Ở chế độ ôn thi, chúng tôi còn chia các câu hỏi ra thành từng danh mục cụ thế để các bạn có
                        thể ôn thi hiệu quả hơn.
                    </div>
                    <div>
                        - Bạn không hài lòng về vấn đề gì đó? Đừng ngần ngại đóng góp ý kiến với chúng tôi để giúp ứng
                        dụng ngày càng
                        hoàn thiện hơn.
                    </div>
                    <div className="comment-contact-container">
                        <div className="comment-container">
                            <strong>Đóng góp ý kiến</strong><br/>
                            <TextField
                                label="Tên của bạn"
                                value={this.state.name}
                                onChange={this.handleNameChange}
                                style={{width: "50%"}}
                            />
                            <br/><br/>
                            <TextField
                                onChange={this.handleCommentChange}
                                value={this.state.comment}
                                label="Ý kiến của bạn"
                                multiline
                                rowsMax="4"
                                style={{width: "100%"}}
                            /><br/><br/>
                            <Button raised color="primary" style={{fontWeight: "bold"}}
                                    onClick={this.handlePostComment}>GỬI</Button>
                        </div>
                        <div className="contact-container">
                            <div className="web-logo-container"><img src="./common/icon/driver-license-icon.png"/></div>
                            <div className="web-title-container">
                                <div><strong>THITHUBANGLAI.COM</strong></div>
                                <div><strong>Phát triển bởi:</strong> Nguyễn Anh Dũng - &#9400; Copyright 2017</div>
                                <div><strong>Email:</strong> nguyenanhdung191@gmail.com</div>
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }
}