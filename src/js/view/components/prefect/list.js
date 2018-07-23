import {List,Toast} from "antd-mobile";
const Item=List.Item;
const Brief = Item.Brief;
import $ from "jquery";
import url from "../../config/config";
import {hashHistory} from "react-router";
export default React.createClass({
    getInitialState(){
        return {
            
        }
    },
    componentWillMount(){
        var that=this;
        $.ajax({
            type: "get",
            url: url.url+"/api/act/mine/userInfo/getUserInfo.htm",
            data: {userId:localStorage.userId},
            dataType: "json",
            headers:{"Content-Type":"text/plain;charset=UTF-8",token:localStorage.Token},
            success: function (data) {
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
                    case 170002:    Toast.info('获取用户信息失败，请稍后再次尝试', 1);
                                    break;
                    case 170003:    Toast.info('获取用户信息超时，请稍后再次尝试', 1);
                                    break;
                    default:        break;
                }     
                // if(data.code=="200"){
                    that.setState(data.data)
                // }
            }
        });
    },
    render(){
        return (
            <div className="list">
                <div className="tip">
                    <i
                        style={{background:"url(images/images/icon_05.png)",backgroundSize:"100%"}}
                    ></i>
                    基本信息
                </div>
                <div className="list_item">
                        <div>
                            <span>姓名</span>
                            <span>{this.state.realName}</span>
                        </div>
                        <div className="border_item">
                            <span>手机号</span>
                            <span>{this.state.phone}</span>
                        </div>
                        <div className="border_item">
                            <span>邮箱</span>
                            <span>{this.state.email}</span>
                        </div>
                </div>
                <div className="tip">
                    <i
                        style={{background:"url(images/images/icon_05.png)",backgroundSize:"100%"}}
                    ></i>
                    身份证信息
                </div>
                <div className="list_item_2">
                        <div>
                            <span>身份证号码</span>
                            <span>{this.state.idNo}</span>
                        </div>
                        <div className="border_item">
                            <span>上传身份证照片</span>
                        </div>
                        <div className="img_item">
                            <div className="left">
                                <div>
                                    <img src={this.state.userFrontImg}/>
                                </div>
                                <p>身份证正面</p>
                            </div>
                            <div className="center">
                                <div>
                                    <img src={this.state.userBackImg}/>
                                </div>
                                <p>身份证背面</p>
                            </div>
                            <div className="right">
                                <div>
                                    <img src={this.state.userLivingImg}/>
                                </div>
                                <p>手持身份证</p>
                            </div>
                        </div>
                </div>
                <div className="tip">
                    <i
                        style={{background:"url(images/images/icon_05.png)",backgroundSize:"100%"}}
                    ></i>
                    银行卡信息
                </div>
                <div className="list_item">
                        <div>
                           <span>银行名称</span>
                            <span>{this.state.bank}</span>
                        </div>
                        <div className="border_item">
                           <span>银行卡号</span>
                            <span>{this.state.cardNo}</span>
                        </div> 
                        <div className="border_item">
                            <span>上传银行卡照片</span>
                        </div>
                        <div className="img_item">
                            <div className="left">
                                <div>
                                    <img src={this.state.frontImg}/>
                                </div>
                                <p>银行卡正面</p>
                            </div>
                            <div className="right">
                                <div>
                                    <img src={this.state.backImg}/>
                                </div>
                                <p>银行卡背面</p>
                            </div>
                        </div>
                </div>
                {/* <div className="tip">
                    <i
                        style={{background:"url(images/images/icon_05.png)",backgroundSize:"100%"}}
                    ></i>
                    信用卡信息
                </div>
                <div className="list_item">
                        <div>
                           <span>发卡行</span>
                            <span>{this.state.creditBank}</span>
                        </div>
                        <div className="border_item">
                            <span>信用卡号</span>
                            <span>{this.state.creditCardNo}</span>
                        </div>
                        <div className="border_item">
                            <span>上传信用卡照片</span>
                        </div>
                        <div className="img_item">
                            <div className="left">
                                <div>
                                    <img src={this.state.creditFrontImg}/>
                                </div>
                                <p>信用卡正面</p>
                            </div>
                            <div className="right">
                                <div>
                                    <img src={this.state.creditBackImg}/>
                                </div>
                                <p>信用卡背面</p>
                            </div>
                        </div>
                </div> */}
                
                <div className="job_info">
                    <i
                        style={{background:"url(images/images/icon_05.png)",backgroundSize:"100%"}}
                    ></i>
                    职业信息
                </div>
                <div className="list_item">
                        <div>
                            <span>资格证书号码</span>
                            <span>{this.state.certificateNo}</span>
                        </div>
                        <div className="border_item">
                            <span>所属公司</span>
                            <span>{this.state.companyName}</span>
                        </div>
                        <div className="border_item">
                            <span>职务</span>
                            <span>{this.state.title}</span>
                        </div>
                        <div className="border_item"
                            style={{height:"0.86rem"}}
                        >
                            <span
                                style={{width:"100%"}}
                            >上传职务资格图片</span>
                        </div>
                        <div className="img_item"
                            style={{padding:"0.28rem 0 0.7rem",height:"1.32rem"}}
                        >
                            <div className="left"
                               style={{height:"1.32rem",width:"1.92rem"}} 
                            >
                                <div>
                                    <img 
                                        style={{width:"100%",height:"100%"}}
                                        src={this.state. titleImg}
                                    />
                                </div>
                            </div>
                            
                        </div>
                </div>
                <div
                    style={{lineHeight:"0.8rem",color:"#f89c47",borderRadius:"0.15rem",background:"#fff",paddingLeft:"0.23rem",marginTop:"0.5rem",fontSize:"0.28rem",
                    display:this.props.info?"none":""
                    // display:"block"
                }}
                >
                <p>如需修改信息请微信扫码联系客服:</p>
                <img style={{width:"2rem",height:"2rem"}} src="images/images/we.jpg"/>
                </div>
            </div>
        )
    }
})