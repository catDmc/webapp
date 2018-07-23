import {hashHistory,browserHistory} from "react-router";
export default React.createClass({
  getInitialState(){
    return {

    }
  },
  componentWillReceiveProps(newtprops){
		this.setState(newtprops)
	},
  btn1(){
    if(localStorage.Login){
      // if(this.state.info=="已完善"){
        hashHistory.push("meloan")
      // }else{
      //   hashHistory.push("information")
      // }
    }else{
      hashHistory.push("login");
    }
  },
  btn2(){
    if(localStorage.Login){
      // if(this.state.info=="已完善"){
        hashHistory.push("memoney")
      // }else{
      //   hashHistory.push("information")
      // }
    }else{
      hashHistory.push("login");
    }
  },
    render(){
        return (
          <div className="other_box">
          <div className="other">
            <div className="other_a" onClick={this.btn1}>
              
              <div className="other_b">
               <img src="images/homeimages/wydk.gif"/> 
              </div>
              <p>我要贷款</p>
            </div>
            <div className="other_a" onClick={this.btn2}>
              <div className="other_b">
              <img src="images/homeimages/wyzq.gif"/>
              </div>
              <p>我要赚钱</p>
            </div>
            <div className="other_a" onClick={()=>{
                if(localStorage.Login){
                  // if(this.state.info=="已完善"){
                    hashHistory.push("qr")
                  // }else{
                  //   hashHistory.push("information")
                  // }
                }else{
                  hashHistory.push("login")
                }
            }}>
              <div className="other_b">
              <img src="images/homeimages/fxqt.gif"/>
              </div>
              <p>推广发现</p>
            </div>
           
          </div>
          </div>
          
        )
    }
})