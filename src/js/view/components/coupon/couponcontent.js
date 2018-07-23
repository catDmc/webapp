import { Button } from 'antd-mobile';
import url from "../../config/config";
import {hashHistory} from "react-router";
export default React.createClass({
    getInitialState(){
      return {
        page:1,
        coupon:[],
        usedcoupon:[]
      }
    },
    componentWillMount(){
      var that=this;
      var data=new FormData();
      data.append("couponType",1);
      data.append("page",1);
      data.append("pageSize",5);
      data.append("userId",localStorage.userId);
      fetch(url.url+"/api/act/coupon/query.htm",{
        headers:{
            token:localStorage.Token
        },
        method:"POST",body:data})
        .then(r=>r.json())
        .then((data)=>{ 
            that.setState({
              coupon:data.data.list
            })
        }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
        });
        var newdata=new FormData();
        newdata.append("couponType",2);
        newdata.append("page",1);
        newdata.append("pageSize",5);
        newdata.append("userId",localStorage.userId);
        fetch(url.url+"/api/act/coupon/query.htm",{
          headers:{
              token:localStorage.Token
          },
          method:"POST",body:newdata})
          .then(r=>r.json())
          .then((data)=>{
              if(data.code=="200"){
                that.setState({
                  usedcoupon:data.data.list
                })
              }else if(data.code=="411"){
                Toast.info("登录已失效,请重新登录", 2);
                setTimeout(function(){
                    localStorage.clear();
                    sessionStorage.clear();
                    hashHistory.push("login")
                },2000) 
              }else if(data.code=="400"){
                Toast.info("用户已在其他设备登录，请重新登录", 2);
                setTimeout(function(){
                    localStorage.clear();
                    sessionStorage.clear();
                    hashHistory.push("login")
                },2000) 
              }
              else if(data.code=="408"){
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
    render(){
        const showuse=this.state.page==1?"":"none";
        const showused=this.state.page==2?"":"none";
        return (
            <div className="content">
              <div className="title">
                <div className={this.state.page==1?"active":""} onClick={()=>{this.setState({page:1})}}>
                  <img src={this.state.page==1?"images/images/money_1.png":"images/images/money_2.png"} 
                    style={{width:"0.52rem",height:"0.35rem"}}
                  />
                  <span>可使用</span>
                </div>
                <div className={this.state.page==2?"active":""} onClick={()=>{this.setState({page:2})}}>
                  <img src={this.state.page==2?"images/images/money_4.png":"images/images/money_3.png"} />
                  <span>已使用/已过期</span>
                </div>
              </div>
               {
                this.state.coupon.map((ind)=>{
                  return <div className="use"
                  key={ind}
                  style={{display:showuse}}
                  onClick={
                    ()=>{hashHistory.push({pathname:"getcoupon",query:{couponid:ind.id}
                  })
                  }
                  }
                >
                  <div className="use_con"
                  style={{background:"url(images/images/coupon_1.png)",backgroundSize:"100%"}}
                  >
                    <div className="left">
                      <span>¥</span><span>{ind.amount}</span>
                    </div>
                    <div className="right">
                      <p>{ind.couponName}</p>
                      <p>有效期至：{ind.validEndTime.split(" ")[0]}</p>
                    </div>
                  </div>
                </div>
                })
              }
              {/* <div 
                onClick={()=>{hashHistory.push({pathname:"getcoupon",query:{couponid:11}})}}
              >1111</div> */}
              {
                this.state.usedcoupon.map((ind)=>{
                  return <div className="used"
                  key={ind}
                  style={{display:showused}}
                >
                {/* "images/images/used.png" */}
                  <img src={ind.state==20||ind.state==30?"images/images/646095611030435475.png":"images/images/used.png"} />
                  <div className="use_con"
                  style={{background:"url(images/images/coupon_2.png)",backgroundSize:"100%"}}
                  >
                    <div className="left">
                      <span>¥</span><span>{ind.amount}</span>
                    </div>
                    <div className="right">
                      <p>{ind.couponName}</p>
                      <p>有效期至：{ind.validEndTime.split(" ")[0]}</p>
                    </div>
                  </div>
                </div>  
                })
              }
                           
            </div>
        )
    }
})
