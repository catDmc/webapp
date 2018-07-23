import url from "../../config/config";
import {Toast} from "antd-mobile";
export default React.createClass({
    getInitialState(){
        return {
            createTime:"",
            cardNo:""
        }
    },
    componentWillMount(){
        var orderNo=this.props.qu.orderId;
        var state=this.props.qu.state;
        this.setState({
            state1:this.props.qu.state
        })
        var that=this;
        var data=new FormData();
        data.append("userId",localStorage.userId);
        data.append("orderNo",orderNo);
        data.append("state",state);

        fetch(url.url+"/api/act/mine/borrow/orderInfo.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
            switch(data.code){
                case 408:    Toast.info('系统响应超时', 1);
                                break;
                case 411:    Toast.info('用户信息过期，请重新登录', 1);
                                localStorage.clear();
                                sessionStorage.clear();
                                hashHistory.push("login");
                                break;
                case 410:    Toast.info('用户已在其他设备登录，请重新登录', 1);
                                localStorage.clear();
                                sessionStorage.clear();
                                hashHistory.push("login");
                                break;
                case 500:    Toast.info('服务器错误', 1);
                                break;
                case 140001:    Toast.info('获取订单详情服务超时', 1);
                                break;
                case 140003:    Toast.info('获取订单详情服务失败，请稍后再次尝试', 1);
                                break;
                default:        break;
                }    
            if(data.code=="200"){
                that.setState(data.data[0])
            }
                
            }).catch(function(e) {
                console.log("Oops, error");
                // Toast.info("服务器响应超时", 2);
        });

    },
    render(){
        return (
            <div className="already-boxs">
            <div className="already-topk" >
                <div className="txing-top" style={{background:"url(images/images/already-topsheng.png)",backgroundSize:"100% 100%"}}>
                    <div
                        style={{width:"50%",marginLeft:"2.43rem",lineHeight:"0.6rem"}}
                    >
                    {this.state.state1==10?"您的订单正在审核中,请稍后查看审核信息!":this.state.state1==20?"您的订单正在审核中,请稍后查看审核信息!":this.state.state1==30?"您的订单正在审核中,请稍后查看审核信息!":this.state.state1==31?"您的订单正在放款中,请稍后查看放款信息!":this.state.state1==41?"您的订单正在放款中,请稍后查看放款信息!":this.state.state1==21?"您的订单人工审核未通过":"您的订单放款审核未通过"}
                    </div>
                    {/* <p className="txing-top1">请稍后查看审核信息!</p> */}
                </div>
                <div className="already-boss">
                <div className="already-list">
                    <div className="already-list1">
                        <div className="already-list1a">
                            <div className="already-list1a1">{this.state.amount}<span className="already-list1a1a">.00元</span></div>
                            <div className="already-list1a2">借款金额(元)</div>
                        </div>
                        <div className="already-list1b">
                            <div className="already-list1b1"></div>
                        </div>
                        <div className="already-list1c">
                            <div className="already-list1a1">{this.state.realAmount}<span className="already-list1a1a">.00元</span></div>
                            <div className="already-list1a2">实际到账(元)</div>
                        </div>
                    </div>
                    <div className="already-list2">
                        <div className="already-list2a">借款期限</div>
                        <div className="already-list2b">{this.state.timeLimit}天</div>
                    </div>
                    <div className="already-list2">
                        <div className="already-list2a">手续费用</div>
                        <div className="already-list2b">{this.state.serviceFee}.00元</div>
                    </div>
                    <div className="already-list2">
                        <div className="already-list2a">借款类别</div>
                        <div className="already-list2b">{this.state.borrowType}</div>
                    </div>
                    <div className="already-list2">
                        <div className="already-list2a">申请时间</div>
                        <div className="already-list2b">{this.state.createTime.split(" ")[0]}</div>
                    </div>
                    <div className="already-list2">
                        <div className="already-list2a">订单号码</div>
                        <div className="already-list2b">{this.state.orderNo}</div>
                    </div>
                    
                    <div className="already-list2">
                        <div className="already-list2a">收款卡号</div>
                        <div className="already-list2b">{this.state.cardNo.substr(0,4)+"***********"+this.state.cardNo.substr(-4)}</div>
                    </div>
                    <div className="write-bg" style={{background:"url(images/images/already-write.png)",backgroundSize:"100% 100%"}}></div>
                    {/* <div className="already-list3">再次借款</div> */}
                </div>
                </div>
            </div>
        </div>
        )
    }
})