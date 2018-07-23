import Top from "../../components/public/title";
import Footer from "../../components/public/footer_3";
import "./style.less";
import Con from "../../components/creditcard/content";
export default React.createClass({
    render(){
        return (
            <div className="card">
                <Top title="信用卡代还" back="true" />
                <Con />
                <Footer home="true" />
            </div>
        ) 
    }
})