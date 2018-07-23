import url from "../../config/config";
import {Toast} from "antd-mobile";
import {hashHistory} from "react-router";
import store from "../../../store/store";
import {Modal} from "antd-mobile";
export default React.createClass({
    getInitialState(){
        return {
            ceateTime:"",
            repayTime:"",
            createTime:"",
            modal1:false,
            interest:"",
            repayAmount:"",
            cardNo:""
        }
    },
    btn(){
        // console.log(1)
        this.setState({
            modal1:true
        });
        var that=this;
        var data=new FormData();//还款
        data.append("orderId",this.state.orderId);
        data.append("userId",localStorage.userId);
        fetch(url.url+"/api/act/pay/repayment/repay.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
              switch(data.code){
                case 400:    Toast.info('还款失败', 1);
                                  hashHistory.goBack()
                                  break;
                case "300":    setTimeout(function(){
                                Toast.info(data.msg, 1);
                                that.setState({
                                    modal1:false
                                })
                                hashHistory.goBack()                               
                                },5000);
                                break;
                                
                case "600":    Toast.info('网络异常,请刷新查看', 1);
                                  hashHistory.goBack()
                                  break;
                case 408:    Toast.info('系统响应超时', 1);
                                     hashHistory.goBack()
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
                case "500":    Toast.info('改借款已还', 1);
                                hashHistory.goBack()
                                break;
                case "200":    setTimeout(function(){
                                    Toast.info('还款成功', 1);
                                    that.setState({
                                        modal1:false
                                    })
                                    sessionStorage.pagenum=3;
                                    hashHistory.push("loan")
                                },5000)
                                
                                break;
                case 150005:    Toast.info('还款失败，请稍后再次尝试', 1);
                                hashHistory.goBack()
                                break;
                case 150006:    Toast.info('还款服务超时，请稍后再次尝试', 1);
                                 hashHistory.goBack()
                                break;
                default:        break;
                }                     
            })
    },
    componentWillMount(){
        var orderNo=this.props.orderNo;
        console.log(orderNo)
        var that=this;
        var data=new FormData();
        data.append("userId",localStorage.userId);
      
        data.append("orderNo",orderNo);

        fetch(url.url+"/api/act/mine/borrow/orderInfo.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
            console.log(data)   
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
                case 150001:    Toast.info('获取订单详情服务超时', 1);
                                break;
                case 150003:    Toast.info('获取订单详情服务失败，请稍后再次尝试', 1);
                                break;
                default:        break;
                }     
            that.setState(data.data[0])
                
            }).catch(function(e) {
                console.log("Oops, error");
                // Toast.info("服务器响应超时", 2);
        });
    },
    render(){
        return (
            <div className="already-box">
            <Modal
                    visible={this.state.modal1}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose}
                    title="提示"
                    className="imgInfo"
                    >
                    <div>                        
                        <img src="images/images/loading.gif" alt=""/>
                        <p>正在还款中...</p>
                    </div>
            </Modal>
            <div className="already-tops" style={{background:"url(images/images/repay-bg.png)",backgroundSize:"100%"}}>
                {/* <div className="already-head">还款完成时间 11</div> */}
                <div className="already-min1"
                    style={{display:this.state.remitAmount>0?"":"none"}}
                >已减免{this.state.remitAmount}元</div>
                <div className="already-min2"><span className="already-min2a">{this.state.repayAmount}</span><span className="already-min2b">{String(this.state.repayAmount).indexOf(".")!=-1?"0":".00"}</span></div>
                <div className="already-min3">应还金额(元)</div>
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
                        <div className="already-list2a">借款类别</div>
                        <div className="already-list2b">{this.state.borrowType}</div>
                    </div>
                    <div className="already-list2">
                        <div className="already-list2a">手续费用</div>
                        <div className="already-list2b">{this.state.serviceFee}.00元</div>
                    </div>
                    <div className="already-list2">
                        <div className="already-list2a">利息费用</div>
                        <div className="already-list2b">{this.state.interest}{String(this.state.interest).indexOf(".")!=-1?"0":".00"}元</div>
                    </div>
                    <div className="already-list2">
                        <div className="already-list2a">延期费用</div>
                        <div className="already-list2b">{this.state.extensionAmount}.00元</div>
                    </div>
                    <div className="already-list2">
                        <div className="already-list2a">借款期限</div>
                        <div className="already-list2b">{this.state.timeLimit}天</div>
                    </div>
                    
                    <div className="already-list2">
                        <div className="already-list2a">申请时间</div>
                        <div className="already-list2b">{this.state.createTime.split(" ")[0]}</div>
                    </div>
                    <div className="already-list2">
                        <div className="already-list2a">应还日期</div>
                        <div className="already-list2b">{this.state.repayTime.split(" ")[0]}</div>
                    </div>
                    <div className="already-list2">
                        <div className="already-list2a">订单号码</div>
                        <div className="already-list2b">{this.state.orderNo}</div>
                    </div>
                    <div className="already-list2">
                        <div className="already-list2a">还款卡号</div>
                        <div className="already-list2b">{this.state.cardNo.substr(0,4)+"***********"+this.state.cardNo.substr(-4)}</div>
                    </div>
                    <div className="already-list3" onClick={this.btn}>还款</div>
                </div>
            </div>
        </div>
        )
    }
})