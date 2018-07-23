import store from "../../../store/store";
// import store from "../../../store/"
import {hashHistory} from "react-router";
export default React.createClass({
    getInitialState(){
        return {
            couponAmount:"40",
            validEndTime:"2018-2-30"
        }
    },
    componentDidMount(){
        console.log(sessionStorage.creditmoney)
        // if()
        this.setState(JSON.parse(localStorage.couponinfo))
        
        localStorage.getCoupon=true;
        
    },
    
    render(){
        return (
            <div>
                <div className="lgs_box">
                <div className="lgs_sonkk">
                    <div className="lgs_bg">
                        <img src="images/images/tjcg.png" />
                    </div>
                    <div className="lgs_w">
                        <p>您的授信申请将在30分钟内审核，请耐心等待</p>
                        <p>您的授信额度总额约为{sessionStorage.creditmoney}万</p>
                        <p>额度以实际审核结果为准</p>
                        <p><span className="lgs_wws">获得一张优惠券</span></p>
                        
                    </div>
                    <div className="yhq_sq" style={{background:"url(images/images/yuq_bg.png)",backgroundSize:"100%"}} >
                        <div className="yhq_w1"><span className="yhq_w1a">¥</span><span className="yhq_w1b">{this.state.couponAmount}</span></div>
                        <div className="yhq_w2">
                          <p>{this.state.couponName}</p>
                          <p className="yhq_w2a">有效期至：{this.state.validEndTime.split(" ")[0]}</p>
                        </div>
                    </div>
                    <div className="lgs_btn" onClick={()=>{hashHistory.push("withdraw")}}>立即提现</div>
                </div>
            </div>
            </div>
        )
    }
})