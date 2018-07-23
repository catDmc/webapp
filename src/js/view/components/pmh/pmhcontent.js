import {hashHistory,browserHistory} from "react-router";

export default React.createClass({
    render (){
        return (
            <div className="pmh_box">
                <div className="pmh_fa">
                  <img src="images/images/pmh.gif" />
                </div>
                <div className="pmh_con">
                  <p className="pmh_w1">超低利率代还信用卡</p>
                  <p className="pmh_w2">守护您的信用记录</p>
                  <div className="pmh_w3"
                    onClick={()=>{hashHistory.push("card")}}
                  >立即赚钱</div>
                </div>
            </div>
        )
    }
})