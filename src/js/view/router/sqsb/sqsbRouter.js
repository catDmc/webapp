import "./sqsb.less";
import Top from "../../components/public/title";
import Add from "../../components/sqsb/sqsbcontent";
import Footer from "../../components/public/footer_3";
export default React.createClass({
    render:function(){
        return (
            <div>
             <Top back="true" title="授信申请失败"/>
            <Add />
             <Footer />
            </div>
        )
    }
})