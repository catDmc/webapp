import {hashHistory} from "react-router";

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
                            <p>申请提交成功</p>
                            <p>您的申请将在<span className="lgs_ww">30分钟</span>内受理审核</p>
                            <p>请耐心等待</p>
                        </div>
                        <div className="lgs_btn"
                            onClick={()=>{
                                // sessionStorage.info="";//清楚订单裂变session,显示第一页
                                sessionStorage.pagenum=1;
                                sessionStorage.loanlist1="";
                                sessionStorage.loanlist2="";
                                sessionStorage.loanlist3="";
                                hashHistory.push("loan");
                                // window.location.reload();
                            }}
                        >查&nbsp;&nbsp;&nbsp;&nbsp;看</div>
                    </div>
                </div>
            </div> 
        )
    }
})