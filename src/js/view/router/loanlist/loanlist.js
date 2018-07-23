import "./style.less";
import Top from "../../components/public/title";
import Footer from "../../components/public/footer_3";
import Con from "../../components/loanlist/content";
export default React.createClass({
    render(){
        return (
            <div className="loanlist">
                <Top title="我要贷款" back="true" phone="true"/>
                <Con />
                <Footer withdraw="true" />
            </div>
        )
    }
})