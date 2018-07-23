import { Toast } from 'antd-mobile';
import $ from "jquery";
import url from "../../config/config";
import {hashHistory,browserHistory,Link} from "react-router";
import { setInterval, clearInterval } from 'timers';
import fetch1 from "fetch-polyfill2";
var timer=null;
export default React.createClass({
    getInitialState(){
        return {
            phone:"",
            check:true,
            pwd:"",
            code:"",
            time:"发送验证码",
            // timer:null,//设定全局定时器
            showcode:"none",
            dbclick:true//防止多次点击
        }
    },
    componentWillUnmount(){
        clearInterval(this.state.timer);
        sessionStorage.login=JSON.stringify(this.state);
    },
    componentWillMount(){
        var that=this;
        if(sessionStorage.login){//查询login的session
            
            this.setState(JSON.parse(sessionStorage.login));
            if(JSON.parse(sessionStorage.login).time!="发送验证码"){
                // console
                var i=JSON.parse(sessionStorage.login).time.split("秒")[0];
                that.setState({
                    timer:setInterval(function(){
                        i--;
                        that.setState({
                            time:i+"秒后再次发送"
                        })
                        if(i==0){
                            clearInterval(that.state.timer);//60秒计时完成清除定时器
                            that.setState({
                                time:"发送验证码"
                            })
                        }
                    },1000)
                })

            }
        }
        if(/^[0-9a-z]{3,6}$/ig.test(localStorage.code)){
            this.setState({
                code:localStorage.code
            })
        }
        if(this.state.time=="发送验证码"){
            this.setState({
                dbclick:true
            })
        }
    },
    send(){
        // console.log(1)
        if(this.state.dbclick){
        if(!this.state.phone){
            Toast.info('请填入手机号', 1); 
        }
        else if(!/^[1]{1}(3|5|7|8|9){1}[0-9]{9}$/g.test(this.state.phone)){
            Toast.info('手机号格式错误', 1); 
        }else{

        
        if(this.state.time=="发送验证码"){
            this.setState({
                dbclick:false
            })
        var that=this;
        var data=new FormData();//发送验证码
        data.append("phone",this.state.phone);
        fetch1(url.url+"/api/user/sendVcode.htm",{
        method:"POST",body:data})
        .then(r=>r.json())
        .then((data)=>{
            console.log(data.data);
            that.setState({
                dbclick:true
            })
        
            switch(data.data.code){
                case 100001:    Toast.info('手机号格式错误', 1);
                                break;
                case 100002:    Toast.info('验证码发送成功，请注意查收', 1);
                                if(data.data.state=="1"){
                                    that.setState({
                                        showcode:"block"
                                    })
                                }else{
                                    // localStorage.code="";
                                    that.setState({
                                        showcode:"none",
                                        code:""
                                    })
                                }
                                that.sendAgain();
                                break;
                case 100003:    Toast.info('验证码发送失败，请稍后再次发送', 1);
                                that.sendAgain();
                                break;
                case 100004:    Toast.info('请填入手机号', 1);
                                break;
                case 100005:    Toast.info('请填入验证码', 1);
                                break;
                case 100006:    Toast.info('请填入正确的验证码', 1);
                                break;
                case 100007:    Toast.info('服务器响应超时', 1);
                                break;
                case 100008:    Toast.info('请勾选注册协议', 1);
                                break;
                default:        break;
            }
            if(data.data.msg=="您今日的短信验证已达上限"){
                Toast.info('您今日的短信验证已达上限', 1);
            }
        }).catch(function(e) {
                console.log("Oops, error");
                // Toast.info("服务器响应超时", 2);
        });
        }else{
            
        }}}
    },
    sendAgain(){
         var that = this;
         var i=60;
         var timer=setInterval(function(){
            i--;
            that.setState({
                time:i+"秒后再次发送"
            })
            if(i==0){
                clearInterval(timer);//60秒计时完成清除定时器
                that.setState({
                    time:"发送验证码",
                    dbclick:true
                })
            }
        },1000);
    },
    submit(e){
        console.log(1)
        // console.log(Boolean(undefined))
        e.preventDefault();
        var that=this;
        if(!this.state.phone){
            Toast.info('请填入手机号', 1); 
        }else if(!this.state.pwd){
            Toast.info('请填入验证码', 1);
        }else{
        if(this.state.check){
        var data=new FormData();//登录
        data.append("loginName",this.state.phone);
        data.append("invitationCode",this.state.code);
        data.append("loginPwd",this.state.pwd)
        fetch(url.url+"/api/user/login.do",{
        method:"POST",body:data})
        .then(r=>r.json())
        .then((data)=>{
            console.log(data.data)
            if(data.code==100001){
                Toast.info('手机号格式错误', 1);
            }else{
                if(data.state==1||data.state==2){
                    clearInterval(that.state.timer);//登录成功,清除定时器
                    localStorage.Login=true;
                    localStorage.userId=data.data.userId;
                    localStorage.Token=data.data.token;
                    localStorage.Phone=this.state.phone;
                    Toast.info('登录成功', 1);
                    // window.lreload();
                    
                    // clearInterval(this.state.)
                    if(data.state==2){
                        hashHistory.push("home");
                        
                    }if(data.state==1){
                        
                        hashHistory.push("loginsuccess");
                    }
                    window.location.reload();
                }else{
                    Toast.info(data.msg, 1);
                }
            }
        }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("",2);
        });     
    }else{
        Toast.info('请勾选注册协议', 1);
    }}
    },
    pwd(e){
        this.setState({
            pwd:e.target.value
        })
    },
    phoneChange(e){
        this.setState({
            phone:e.target.value
        })
    },
    editChecked(){
        this.setState({
            check:!this.state.check
        });
    },
    render(){
        return (
            <form onSubmit={this.submit}>
                <div className="form_phone">
                    
                    {/* <i
                        style={{background:"url(images/images/icon_01.png) center center no-repeat",width:"0.37rem",height:"0.5rem",backgroundSize:"100%"}} 
                    ></i> */}
                    <img src="images/images/icon_01.png"
                        style={{width:"0.37rem",height:"0.5rem"}}
                    />
                    <input placeholder="请输入手机号码" type="number" onChange={this.phoneChange} value={this.state.phone}/>
                </div>
                <div className="form_pwd">
                    {/* <i
                        style={{background:"url(images/images/icon_02.png) center center no-repeat",width:"0.37rem",height:"0.38rem",backgroundSize:"100%"}}
                    ></i> */}
                    <img src="images/images/icon_02.png" 
                        style={{width:"0.37rem",height:"0.38rem"}}
                    />
                    <input placeholder="请输入验证码" type="number" onChange={this.pwd} />
                    <div onClick={this.send} className={this.state.time=="发送验证码"?"":"active"}>{this.state.time}</div>
                </div>
                <div className="form_qr"
                    style={{display:this.state.showcode}}//是否显示code输入框
                >
                    {/* <i 
                    style={{background:"url(images/images/icon_03.png)",width:"0.37rem",height:"0.37rem",backgroundSize:"100%"}}
                    ></i> */}
                    <img src="images/images/icon_03.png" 
                        style={{width:"0.37rem",height:"0.37rem"}}
                    />
                    <input placeholder="请输入推广码" type="text" value={this.state.code}  
                    onChange={(e)=>{
                        this.setState({
                            code:e.target.value
                        })
                    }}
                    />
                </div>
                <div className="protocol">
                    <input type="checkbox" defaultChecked={this.state.check} onChange={this.editChecked} />
                    <p>第一次登录会为你自动注册账号，为正常使用服务需同意<Link to="reg">《注册协议》</Link></p>
                    
                </div>
                
                    <input className="sub" type="submit" value="登录"
                        // style={{textAlign:"center"}}
                    />
                
            </form>
        )
    }
})