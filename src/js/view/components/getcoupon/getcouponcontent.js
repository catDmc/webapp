import url from "../../config/config";
import {hashHistory} from "react-router";
export default React.createClass({
    getInitialState(){
        return {
          validStartTime:"",
          validEndTime:""
        }
    },
    componentWillMount(){
      // console.log(this.props.couponid)
      var couponid=this.props.couponid;
      var that=this;
      var data=new FormData();
      data.append("id",couponid);

      fetch(url.url+"/api/act/coupon/queryCouponDetail.htm",{
        headers:{
            token:localStorage.Token
        },
        method:"POST",body:data})
        .then(r=>r.json())
        .then((data)=>{
          console.log(data)    
            that.setState(data.data.couponDetail)
        }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
        });
    },
    render(){
        return (
            <div className="boxf">
            <div className="box">
              <div className="box2">
                <img src="images/images/yhq_03.gif" />
              </div>
            <p className="boxw1">优惠券额度：{this.state.amount}元</p>
            <p className="boxw2">获取时间：{this.state.validStartTime.split(" ")[0]}</p>
            <p className="boxw2">过期时间：{this.state.validEndTime.split(" ")[0]}</p>
              <div className="boxbt"
                onClick={()=>{
                  hashHistory.push("withdraw")
                }}
              >立即使用</div>
            </div>
            </div>
        )
    }
})