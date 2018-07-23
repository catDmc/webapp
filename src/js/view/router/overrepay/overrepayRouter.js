import Top from "../../components/public/title";
import Add from "../../components/overrepay/overrepaycontent"
import Footer from "../../components/public/footer_3";
import "./overrepay.less";
export default React.createClass({
    render:function(){
        return (
            <div>
                <Top title="已还款" back={true} show={true}/>
                <Add />
                <Footer />
            </div>
        )
    }
})