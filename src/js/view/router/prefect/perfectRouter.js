import Top from "../../components/public/title";
import Footer from "../../components/public/footer_3.2";
import List from "../../components/prefect/list";
import "./style.less";
import url from "../../config/config";
import {hashHistory} from "react-router";
import {Toast} from "antd-mobile";
export default React.createClass({
    getInitialState(){
        return {
            userInfo:"未完善",
            showwrite:false
        }
    },
    componentWillMount(){
        var that=this;
			var data=new FormData();
			data.append("userId",localStorage.userId);
	  
			fetch(url.url+"/api/act/mine/userInfo/getMyMessage.htm",{//获取用户的登录信息是否完善
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
                    case 500:    Toast.info('系统错误', 1);
                                    break;
                    case 110001:    Toast.info('服务器响应超时', 1);
                                    break;
                    default:        break;
                }    
                  that.setState(data.data);
                  if(data.data.userInfo=="未完善"||data.data.userInfo=="未认证"||data.data.userInfo=="认证失败"){
                      that.setState({
                          showwrite:true
                      })
                  }
			  })
    },
    render:function(){
        return (
            <div className="perfect">
                <Top title="个人信息" back={true} write={
                    this.state.showwrite
                    }/>
                <List info={(this.state.userInfo=="已认证"||this.state.userInfo=="认证过期")?false:true}/>
                <Footer />
            </div>
        )
    }
})