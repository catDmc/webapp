import {hashHistory,browserHistory} from "react-router";

export default React.createClass({
    render(){
        return (
            <div>
                <div className="lgs_box">
                    <div className="lgs_son">
                        <div className="lgs_bg">
                            <img src="images/images/dlbg.png" />
                        </div>
                        <div className="lgs_w">
                            <p>登录成功</p>
                            <p>您是第一次登录，请完成授信</p>
                            <p>完成授信后将获得<span className="lgs_ws">20万-50万</span>额度</p>
                        </div>
                        <div className="lgs_btn"
                            onClick={()=>{
                                hashHistory.push("information")
                            }}
                        >立即授信</div>
                    </div>
                </div>
            </div> 
        )
    }
})