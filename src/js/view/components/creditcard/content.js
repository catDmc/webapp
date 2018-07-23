import {  InputItem ,Modal} from 'antd-mobile';
import url from "../../config/config";
import { Toast} from 'antd-mobile';
import {hashHistory} from "react-router"
export default React.createClass({
    getInitialState(){
        return {
            ti2:"checked",
            check:true,
            money:"",
            show:false,
            serviceFee:0,
            couponNo:"",
            check2:true,
            discount:true,//显示优惠
            listCoupon:[],
            expectRepayTime:""//预估时间
        }
    },
    componentWillUnmount(){
        sessionStorage.width=JSON.stringify(this.state)
    },
    componentWillMount(){
        console.log(Boolean(sessionStorage.width))
        if(sessionStorage.width){
            this.setState(JSON.parse(sessionStorage.width))
        }
        var that=this;
        var data=new FormData();
        data.append("userId",localStorage.userId);
  
        fetch(url.url+"/api/act/mine/userInfo/getMyMessage.htm",{
          headers:{
              token:localStorage.Token
          },
          method:"POST",body:data})
          .then(r=>r.json())
          .then((data)=>{
              console.log(data)
            if(data.code=="410"){
                Toast.info("您的账号已在其他设备登录,请重新登录", 2);
                localStorage.clear();
                sessionStorage.clear();
                setTimeout(function(){
                    hashHistory.push("login")
                },2000)
              }else if(data.code=="411"){
                localStorage.clear();
                sessionStorage.clear();
                Toast.info("登录已失效,请重新登录", 2);
                setTimeout(function(){
                    hashHistory.push("login")
                },2000) 
              }else if(data.code=="408"){
                Toast.info("系统响应超时", 2);
              }else if(data.code=="500"){
                Toast.info("系统错误", 2);
              }
              else{
                that.setState(data.data);
              } 
          }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
        });
    },
    change(e){
        // console.log(e)
        var i=0;
        if(0<e&&e<=1000){
            i=20
            
            
        }else if(1000<e&&e<=2000){
            i=40
        }else if(2000<e&&e<=3000){
            i=60
        }else if(3000<e&&e<=4000){
            i=80
        }else if(4000<e&&e<=5000){
            i=100
        }else if(e>5000){
            e=5000
            i=100
        }
        console.log(e)
        this.setState({
            money:e,
            serviceFee:i
        })
    },
    submit(){
        var that=this;
        if(this.state.money<100||this.state.money>5000){
            Toast.info('代还金额请填写100-5000之间', 2);
        }else if(this.state.money>this.state.unuse){
            Toast.info('代还金额不得大于可用额度', 2);
        }else if(!/^[0-9]{1,4}$/g.test(this.state.money)){
            Toast.info('请填写正确的代还金额', 2);
        }

        else{
            
            if(this.state.check){
                
            var data=new FormData();
        data.append("amount",this.state.money);
        data.append("timeLimit",7);
        data.append("userId",localStorage.userId)
        fetch(url.url+"/api/act/pay/repayment/apply.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
                console.log("进来了")
                console.log(data)
                if(data.code=="230008"){
                    // that.setState({show:true})
                    that.setState({
                        show:true,
                        check2:true,
                        listCoupon:data.data.listCoupon,
                        // couponMoney:data.data.listCoupon[0].amount
                    })
                    that.setState(data.data);
                    if(data.data.listCoupon.length==0){//如果没有优惠券,把选择默认按钮去掉
                        that.setState({
                            check2:false,
                            discount:false
                        })
                    }else{
                        that.setState({
                            couponMoney:data.data.listCoupon[0].amount
                        })
                    }
                    
                    
                }
                
            }).catch(function(e) {
                console.log("Oops, error");
                // Toast.info("服务器响应超时", 2);
            });
        }else{
            Toast.info('请同意代还协议', 2);
        }
    }
        
    },
    confirm(){
        console.log(this.state)
        var that=this;
        var data=new FormData();
        var listid="";
        if(this.state.check2){
            listid=this.state.listCoupon[0].couponNo
        }
        console.log(listid)
        data.append("amount",this.state.money);
        data.append("borrowType","10");
        data.append("channelId","1");
        data.append("client","h5");
        data.append("couponNo",listid);
        data.append("serviceFee",this.state.serviceFee);
        data.append("timeLimit","7");
        data.append("userId",localStorage.userId)
        fetch(url.url+"/api/act/pay/repayment/verify.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
                console.log(data)
                if(data.code=="230008"){
                    // that.setState(data.data);
                    that.setState({show:false});
                    Toast.info(data.msg, 2);
                    hashHistory.push("tcsuccess");
                    // localStorage.card="";
                    sessionStorage.width="";
                }
                
            }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
        });
    },
    change2(e){
        // console.log(1)
        var that=this;
        this.setState({check2:!this.state.check2});
        if(e.target.checked){
            var list=""
            if(this.state.money<=1000){
                list=this.state.totalMoney-20;

            }else{
                list=this.state.totalMoney-this.state.couponMoney
            }
            // console.log(this.state.list)
            // this.state.listCoupon
            this.setState({
                totalMoney:list
            })
        }else{
            var list1=""
            if(this.state.money<=1000){
                list1=this.state.totalMoney*1+20
            }else{
                list1=this.state.totalMoney*1+this.state.couponMoney
            }
            console.log(list1)
            this.setState({
                totalMoney:list1,
            })
        }
     },
    render(){
        return (
            <div className="card_con">
            <div className="modal" 
                    style={{display:this.state.show?"block":"none"}}
                >
                    <div className="con">
                        <div className="top">
                            <div className="top-1">
                                您的保单提现申请信息
                            </div>
                            <div className="top-2">
                            <img className="ti1" src="images/images/ti1.png" />
                                <div className="ti2">
                                    预计还款时间{this.state.expectRepayTime.split(" ")[0]}
                                </div>
                                <img className="ti1" src="images/images/ti1.png" />
                            </div>
                            <div className="top-3">
                                <div className="ti1">{this.state.listCoupon.length==0?this.state.totalMoney:(this.state.money<=1000?this.state.totalMoney-20:this.state.totalMoney-40)}</div>
                                <div className="ti2"
                                    style={{display:this.state.discount?"":"none"}}
                                >已优惠{this.state.check2?(this.state.money<=1000?20:this.state.couponMoney):0}元!</div>
                            </div>
                            <div className="top_4">
                                <div className="ti1">
                                <p>{this.state.amount}元</p>
                                <p>提现金额</p>
                                </div>
                                <div className="ti2"
                                    style={{background:"url(images/images/zhu.png) 0% 0%/100%"}}
                                ></div>
                                <div className="ti1">
                                <p>7天</p>
                                <p>期限</p>
                                </div>
                                <div className="ti2"
                                    style={{background:"url(images/images/zhu.png) 0% 0%/100%"}}
                                ></div>
                                <div className="ti1">
                                <p>{this.state.serviceFee}元</p>
                                <p>手续费</p>
                                </div>
                            </div>
                            <div className="top_5">
                            <div
                                style={{visibility:this.state.listCoupon.length>0?"":"hidden"}}
                            >
                                <label><div
                                    style={{background:this.state.check2?"url(images/images/small-2.png) 0% 0%/100%":"url(images/images/small-1.jpg) 0% 0%/100%"}}
                                ><input type="checkbox"
                                checked={this.state.check2}
                                onChange={
                                    this.change2
                                   }
                                        // style={{width:"0.1rem",height:"0.1rem"}}
                                    /></div>使用优惠券</label>
                                    <span>(可使用优惠券额度40元)</span>
                                </div>
                            </div>
                            
                        </div>
                        <div className="bottom"
                            style={{background:"url(images/images/top-bg.png) 0% 0%/100%"}}
                        >
                        <div className="left"
                            onClick={()=>{
                                this.setState({
                                    show:false
                                })
                            }}
                        >取消</div>
                        <div className="right"
                            onClick={()=>{
                                this.confirm()
                            }}
                        >确认</div>
                        </div>
                    </div>  
                </div>
                <div className="tip">
                    {/* <i
                        style={{background:"url(images/images/icon_05.png) 0% 0% /100%"}}
                    ></i> */}
                    <img src="images/images/icon_05.png" />
                    <span>剩余可用额度</span>
                </div>
                <div className="title">
                    <i
                    style={{background:"url(images/images/10475463301731984.png) 0% 0% /100%"}}
                    ></i>
                    <span>剩余可用额度：</span>
                    <span>{this.state.unuse}元</span>
                </div>
                <div className="tip">
                <img src="images/images/icon_05.png" />
                    <span>请输入代还额度(100元-5000元)</span>
                </div>
                <div className="title">
                    <span
                        style={{marginLeft:"0.36rem"}}
                    >代还金额</span>
                    <InputItem
                    value={this.state.money}
                    onChange={this.change}
                    // maxLength="4"
                    style={{height:"0.42rem",fontSize:"0.28rem"}} 
                    placeholder="请输入代还金额"
                    />
                </div>
                <div className="server">
                    <span>手续费：{this.state.serviceFee}元</span>
                </div>
                <div className="tip">
                <img src="images/images/icon_05.png" />
                    <span>借款天数</span>
                </div>
                <div className="title">
                    <i
                    style={{background:"url(images/images/367267659602419724.png) 0% 0% /100%"}}
                    ></i>
                    <span>借款天数</span>
                    <span>7天</span>
                </div>
                <div className="withcon">
                        <label><input type="checkbox" defaultChecked={this.state.check} onChange={()=>{this.setState({check:!this.state.check})}} />同意</label><a>《代还协议》</a>
                    </div>
                <div className="submit">
                    
                    <button onClick={this.submit}>提交申请</button>
                    
                </div>
            </div>
        )
    }
})