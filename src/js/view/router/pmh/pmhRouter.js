import Top from "../../components/public/title";
import Footer from "../../components/public/footer_3";
import Add from "../../components/pmh/pmhcontent"
import "./style.less";
export default React.createClass({
    render:function(){
        return (
            <div>
                <Top title="信用卡还款" back="true" />
                <Add />
                <Footer />
            </div>
        )
    }
})