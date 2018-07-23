import Top from "../../components/public/title";
import Search from "../../components/home/search";
import Banner from "../../components/home/homebanner";
import Begin from "../../components/home/homebegin";
import Develop from "../../components/home/homedevelop";
import Footer from "../../components/public/footer_3";
import Kk from "../../components/home/popup";
import List from "../../components/home/homelist";
import {hashHistory,browserHistory} from "react-router";
import {Toast} from "antd-mobile";
import "./style.less";
import {add,reduce} from "../../../actions/actions";
import store from "../../../store/store";
import url from "../../config/config";
export default React.createClass({
    getInitialState(){
      return {
        userInfo:"1",
      }
    },
    getDefaultProps(){
        return {
            title:"保赚-保险代理人自己的平台",
            
        } 
    },
    componentWillMount(){
        // var code=this.props.location.query.
        // var code
        if(this.props.location.query){
            localStorage.code=this.props.location.query.invicode
        }
		if(localStorage.Login){
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
			  })

      

		}

    },
    render:function(){
        return (
            <div className="home">
                <Top title={this.props.title} ref="nu" back={false} history={this.props.history}/>
                <Banner />
                <Kk />
                <Begin info={this.state.userInfo}/>
                
                <Develop info={this.state.userInfo} />
               
                <Footer home="true"/>
            </div>
        )
    }
})