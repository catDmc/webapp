import url from "../../config/config";
import {InputItem,ImagePicker,Toast } from "antd-mobile";
import {hashHistory,browserHistory} from "react-router";
export default React.createClass({
    getInitialState(){
        return {
            repayTime:"",
            createTime:"",
            realRepayTime:"",
            repayAmount:"",
            interest:"",
            cardNo:""
        }
    },
    btn(){
            hashHistory.push("withdraw")
         
      },
  componentWillMount(){
    console.log(this.props)
        var orderNo=this.props.id;
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
            if(data.code=="200"){
                that.setState(data.data[0])
            }else if(data.code=="410"){
                Toast.info("您的账号已在其他设备登录", 2);

                setTimeout(function(){
                    localStorage.clear();
                    sessionStorage.clear();
                    hashHistory.push("login")
                },2000)
            }else if(data.code=="411"){
                Toast.info("登录已失效,请重新登录", 2);
                setTimeout(function(){
                    localStorage.clear();
                    sessionStorage.clear();
                    hashHistory.push("login")
                },2000)
            }else{
                Toast.info(data.msg, 2);
            }           
                
            }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
            });
  },
    render() {
        var num=String(this.state.repayAmount).indexOf(".")!=-1
        console.log(num)
        return (
            <div className="already-box">
                <div className="already-top" >
                    <div className="already-head" style={{background:"url(images/images/already-top-t.png)",backgroundSize:"100% 100%"}}>
                        <div className="already-headword">还款完成时间{this.state.realRepayTime.split(" ")[0]}</div>
                    </div>
                    <div className="already-centerfa">
                    <div className="already-center" style={{background:"url(images/images/already-center.png)",backgroundSize:"100% 100%"}}></div>
                    </div>
                    <div className="already-min1"
                        style={{display:this.state.remitAmount>0?"":"none"}}
                    >已减免{this.state.remitAmount}元</div>
                    <div className="already-min2"><span className="already-min2a">{this.state.repayAmount}</span><span className="already-min2b">{String(this.state.repayAmount).indexOf(".")!=-1?"0":".00"}</span></div>
                    <div className="already-min3">应还金额(元)</div>
                    <div className="already-list">
                    <div className="already-jkl">
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
                        <div className="already-list3" onClick={this.btn}>再次借款</div>
                        <div className="already-good" style={{background:"url(images/images/good.png)",backgroundSize:"100% 100%"}}></div>
                        </div>
                    </div>
                </div>
            </div>
    //   <div className="con_box">
    //       <div className="content">
    //                 <img className="title"  src="images/images/bg_2.jpg" />
    //                 <div className="top">
    //                     <i
    //                         style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
    //                     ></i>
    //                     <span>借款金额：{this.state.amount}.00元</span>
    //                 </div>
    //                 <div>
    //                     <i
    //                         style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
    //                     ></i>
    //                     <span>实际到账：{this.state.realAmount}.00元</span>
    //                 </div>
    //                 <div>
    //                     <i
    //                         style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
    //                     ></i>
    //                     <span>服务费用：{this.state.serviceFee}.00元</span>
    //                 </div>
    //                 <div>
    //                     <i
    //                         style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
    //                     ></i>
    //                     <span>利息费用：{this.state.interest}.00元</span>
    //                 </div>
    //                 <div>
    //                     <i
    //                         style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
    //                     ></i>
    //                     <span>延期费用：{this.state.extensionAmount}.00元</span>
    //                 </div>
    //                 <div>
    //                     <i
    //                         style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
    //                     ></i>
    //                     <span>借款期限：7天</span>
    //                 </div>
    //                 <div>
    //                     <i
    //                         style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
    //                     ></i>
    //                     <span>申请时间：{this.state.createTime.split(" ")[0]}</span>
    //                 </div>
    //                 <div>
    //                     <i
    //                         style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
    //                     ></i>
    //                     <span>收款卡号：{this.state.cardNo}</span>
    //                 </div>
    //                 <div>
    //                     <i
    //                         style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
    //                     ></i>
    //                     <span>应还金额：{this.state.repayAmount}</span>
    //                 </div>
    //                 <div>
    //                     <i
    //                         style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
    //                     ></i>
    //                     <span>应还日期：{this.state.repayTime.split(" ")[0]}</span>
    //                 </div>
    //                 <div className="yellow"
    //                     style={{marginTop:"0.4rem"}}
    //                 >
    //                     <i
    //                         style={{background:"url(images/images/circle_1.jpg)",backgroundSize:"100%"}}
    //                     ></i>
    //                     <span>优惠减免：{this.state.amount<=1000?20:this.state.remitAmount}.00元</span>
    //                 </div>
    //                 <div className="yellow">
    //                     <i
    //                         style={{background:"url(images/images/circle_1.jpg)",backgroundSize:"100%"}}
    //                     ></i>
    //                     <span>应还金额：{this.state.repayAmount}.00元</span>
    //                 </div>
    //                 <div className="yellow">
    //                     <i
    //                         style={{background:"url(images/images/circle_1.jpg)",backgroundSize:"100%"}}
    //                     ></i>
    //                     <span>实还金额：{this.state.realRepayAmount}.00元</span>
    //                 </div>
    //                 <div className="yellow">
    //                     <i
    //                         style={{background:"url(images/images/circle_1.jpg)",backgroundSize:"100%"}}
    //                     ></i>
    //                     <span>应还日期：{this.state.repayTime.split(" ")[0]}</span>
    //                 </div>
    //                 <div className="yellow">
    //                     <i
    //                         style={{background:"url(images/images/circle_1.jpg)",backgroundSize:"100%"}}
    //                     ></i>
    //                     <span>实还日期：{this.state.realRepayTime.split(" ")[0]}</span>
    //                 </div>                    
    //             </div>
    //   </div>
    )
  }
})