import {hashHistory,browserHistory} from "react-router";
export default React.createClass({
    render(){
        return (
            <div className="hello">
                <p onClick={() => {hashHistory.push("gvrp")}}>注册协议</p>
                <p onClick={() => {hashHistory.push("getcoupon")}}>完成授信获得优惠券</p>
                <p onClick={() => {hashHistory.push("waitcoupon")}}>授信申请提交成功</p>
                <p onClick={() => {hashHistory.push("believe")}}>授信协议</p>
                <p onClick={() => {hashHistory.push("tcsuccess")}}>提交成功</p>
                <p onClick={() => {hashHistory.push("txing")}}>审核中</p>
                <p onClick={() => {hashHistory.push("overrepay")}}>已还款</p>
                <p onClick={() => {hashHistory.push("bzhome")}}>保赚首页</p>
            </div>
        )
    }
})