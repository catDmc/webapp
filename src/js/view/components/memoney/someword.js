
import {hashHistory} from "react-router";

export default React.createClass({
  btn(){
    // console.log(1)
    hashHistory.push("makemoney");
  },
    render(){
        return (
            <div className="boxfa">
              <div className="wyzqbanner">
                <img src="images/images/wyzq (2).png"/>
              </div>
              <div className="wyzqbox">
              <div className="word">
                <p>您可将您的客户融资需求反馈给我们，</p>
                <p>我们将根据您客户的实际情况，</p>
                <p>推荐不同的金融产品。</p>
                <p className="worda">一旦放款成功，</p>
                <p className="worda">您将获得一定比例的佣金收入。</p>
              </div> 
              <div className="button" onClick={this.btn}>
                立即赚钱
              </div> 
              </div>
            </div>
        )
    }
})