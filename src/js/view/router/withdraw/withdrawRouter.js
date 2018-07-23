import "./style.less";
import Top from "../../components/public/title";
import Footer from "../../components/public/footer_3.2";
import Con from "../../components/withdraw/withdrawcontent";
export default React.createClass({
    render(){
        return (
            <div className="withdraw">
                <Top title="立即提现" back="true"/>
                <Con />
                <Footer />
            </div>
        )
    }
})