import "./style.less";
// import Top from "../../components/login/logintop";
import Form from "../../components/login/loginform";
import Top from "../../components/public/title";
export default React.createClass({
    render:function(){
        return (
            <div className="login">
                <Top title="登录" back="true" />
                <div className="login_box">
                    <div className="banner"><img src="images/images/login_02.jpg" /></div>
                    <Form />
                </div>
            </div>
        )
    }
})