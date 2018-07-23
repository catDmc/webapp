import url from "../../config/config";
import QRCode from "qrcode.react";


export default React.createClass({

  getInitialState(){
        return {
            invicode:""
        }
    },
    componentWillMount(){
      var that=this;
      var data=new FormData();
      data.append("userId",localStorage.userId);

      fetch(url.url+"/api/act/mine/qrcode/create.htm",{
        headers:{
            token:localStorage.Token
        },
        method:"POST",body:data})
        .then(r=>r.json())
        .then((data)=>{
          // console.log(data);
          if(data.code=="200"){
            var data = data.data;
            var invicode = data.substr(data.indexOf("&")+1);   
            // console.log(invicode);
            that.setState({invicode:invicode});
          }else if(data.code=="410"){
            Toast.info("您的账号已在其他设备登录", 2);
            setTimeout(function(){
                hashHistory.push("login")
            },2000)
        }else if(data.code=="411"){
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
            Toast.info(data.msg, 2);
        }  
                                
        }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
        });
    },
    render() {
      var invicode = this.state.invicode;
      var weburl = url.url + "/web/dist/index.html#/home?invicode="+invicode;
      // console.log(weburl);
      return (
        <div className="qr_box">
          <div className="qr_f">
            <div className="content" style={{background:"url(images/images/qrbg3_02.gif)",backgroundSize:"100%"}}>
              <div className="qr_er">
                <div className="qr_erimg">
                  <QRCode value={weburl}/>
                </div>
              </div>
              <p><span>推广二维码</span></p>
              <p><span>请向您的推广用户展示此二维码，</span></p>
              <p><span>用户扫描后将使用您的推广码进行注册</span></p>
            </div>
          </div>
        </div>
          
      );
    }
}) 
