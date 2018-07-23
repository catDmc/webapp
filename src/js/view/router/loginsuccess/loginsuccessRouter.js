import Top from "../../components/public/title";
import Footer from "../../components/public/footer_3";
import Con from "../../components/loginsuccess/loginsuccesscontent";
import "./style.less";
export default React.createClass({
    render(){
        return (
            <div>
                <Top title="登录成功" back="true" />
                <Con />
                <Footer />
            </div>
        )
    }
})