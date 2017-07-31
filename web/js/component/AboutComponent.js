import React from "react";
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

export default class AboutComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            comment: ""
        }
    };

    handleNameChange = (event, newValue) => {
        if (newValue.length > 35) {
            return;
        }
        this.setState({
            name: newValue
        });
    };

    handleCommentChange = (event, newValue) => {
        if (newValue.length > 350) {
            return;
        }
        this.setState({
            comment: newValue
        });
    };

    render() {
        return (
            <div className="about-page-container">
                <Paper elevation={3} square={false} style={{padding: 10}}>
                    <div>THITHUBANGLAI.COM</div>
                    <div>- thithubanglai.com đóng vai trò là một công cụ hỗ trợ giúp các bạn vượt qua được kì thi sát
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
                        Bạn không hài lòng về vấn đề gì đó? Đừng ngần ngại đóng góp ý kiến với chúng tôi để giúp ứng
                        dụng ngày càng
                        hoàn thiện hơn.
                    </div>
                    <div className="comment-contact-container">
                        <div className="comment-container">
                            <strong>Đóng góp ý kiến</strong><br/>
                            <TextField
                                value={this.state.name}
                                hintText="Tên của bạn (có thể bỏ trống)"
                                onChange={this.handleNameChange}
                            /><br/>
                            <TextField
                                onChange={this.handleCommentChange}
                                value={this.state.comment}
                                hintText="Ý kiến của bạn (không được bỏ trống)"
                                multiLine={true}
                                rows={1}
                                rowsMax={5}
                                style={{width: "100%"}}
                            /><br/>
                            <Button raised color="primary">GỬI</Button>
                        </div>
                        <div className="contact-container">
                            asdfasdfsadf
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }
}