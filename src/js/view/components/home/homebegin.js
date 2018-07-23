import {hashHistory,browserHistory} from "react-router";
import { Modal, Button, WhiteSpace, WingBlank, Toast} from 'antd-mobile';
import store from "../../../store/store";
import url from "../../config/config";
const alert = Modal.alert;
export default React.createClass({
	componentWillMount(){
		// console.log(url)
	},
	componentWillReceiveProps(newtprops){
		
		this.setState(newtprops)
	},
	btn(){
		
		if(localStorage.Login){//判断是否登录
			if(this.state.info=="未完善"){//根据父组件传过来的信息是否完善
				hashHistory.push("information");
			}else if(this.state.info=="未认证"||this.state.info=="已认证"||this.state.info=="认证过期"||this.state.info=="认证失败"){
				
				hashHistory.push("withdraw");
				sessionStorage.withdraw="";
			}
		}else{
			hashHistory.push("login")
		}
	},
	render(){
		return (
		<div>
		<div 
		style={{background:"url(images/homeimages/bg.gif)",backgroundSize:"100%"}}
		className="begin_box" >
		  
		  <p className="begin_a">保费卡</p>
		  <p className="begin_b">最高<span className="begin_c">50万</span>额度垫付</p>
		  <a className="begin_d" onClick={this.btn}>立即开始</a>
		</div>
		<div 
			style={{display:"none"}}
		className="anser" onClick={() => {
			if(localStorage.Login){
				if(this.state.info=="未完善"){
					hashHistory.push("information");

				}else if(this.state.info=="未认证"||this.state.info=="已认证"||this.state.info=="认证过期"||this.state.info=="认证失败"){
					
					hashHistory.push("pmh");
					sessionStorage.card="";
				}
				
			}else{
				hashHistory.push("login");
			}
			
		}}>
		  <div className="anser_a" >
			  <img src="images/homeimages/qb.gif" />
			</div>
			<div className="anser_b">信用卡代还</div>
			<div className="anser_c">
			<img src="images/homeimages/jt.gif" />
			</div>
		</div>
		<div className="fa"><div className="fa_a"></div><div>发现其他</div></div>
		
		</div>
		)
	}
})