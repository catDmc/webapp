import "./style.less";
import Top from "../../components/public/title";
import Footer from "../../components/public/footer_3";
import Con from "../../components/makemoneylist/content";
export default React.createClass({
    render(){
        return (
            <div className="makemoneylist">
                <Top title="我要赚钱" back="true" phone="true" />
                <Con />
                <Footer withdraw="true" />
            </div>
        )
    }
})