import {Button} from "antd-mobile";


export default React.createClass({
    getInitialState(){
        return {
            current:"1",
            page:"1"
        }
    },
    dayleft(){
        this.setState({
            page:"1"
        })
    },
    dayright(){
        this.setState({
            page:"2"
        })
    },
    btnLeft(e){
        this.setState({
            current:"1"
        })
    },
    btnRight(){
        this.setState({
            current:"2"
        })
    },
    render(){
        const index=this.state.current;
        const page=this.state.page;
        return (
            <div className="operating">
                <p className="op_title">立即借款</p>
                <p className="op_type">选择借款额度：</p>
                <div className="money">
                    <div className="left">
                        <Button
                        onClick={this.btnLeft}
                        className={index=="1"?"active":""}
                        >1000</Button>
                    </div>
                    <div className="right">
                        <Button
                        className={index=="2"?"active":""}
                        onClick={this.btnRight}
                        >2000</Button>
                    </div>
                </div>
                <p className="op_type">选择借款天数：</p>
                <div className="day">
                    <Button
                    inline="true"
                    onClick={this.dayleft}
                    className={page=="1"?"active":""}
                    >7天</Button>
                    <Button
                    inline="true"
                    className={page=="2"?"active":""}
                    onClick={this.dayright}
                    >14天</Button>
                </div>
                <div className="submit">
                    <Button
                    type="primary"
                    >立即申请</Button>
                </div>
                <p className="application"><span>点击立即申请按钮即视为同意</span><a href="javascript:;">《借款协议》</a></p>
            </div>
        )
    }
})